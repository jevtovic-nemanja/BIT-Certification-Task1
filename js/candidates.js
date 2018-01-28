(function () {

    var candidates = [];

    function onPageLoad() {
        var searchInput = document.querySelector(".search");
        searchInput.addEventListener("input", filterList);
        fetchData();
    }

    function fetchData() {
        var request = new XMLHttpRequest();
        var url = BASE_URL + "/candidates";
        
        request.open("GET", url);

        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                candidates = JSON.parse(request.responseText);
                displayCandidates(candidates);
            } else {
                displayErrorMessage("Looks like there was some kind of error. Don't worry, we're looking into it!");
            }
        };

        request.onerror = function () {
            displayErrorMessage("Looks like the server is not responding. Don't worry, we're looking into it!");
        };

        request.send();
    }

    function displayCandidates(candidates) {
        var listContainer = document.querySelector(".list-container");
        listContainer.innerHTML = "";

        if (candidates.length) {

            candidates.forEach(function (candidate) {
                var link = document.createElement("a");
                var div = document.createElement("div");
                var card = document.createElement("div");
                var image = document.createElement("img");
                var name = document.createElement("h4");
                var email = document.createElement("small");
                var defaultAvatar = "assets/images/avatar.png";

                div.classList.add("offset-1", "col-10", "offset-md-0", "col-md-6", "offset-lg-0", "col-lg-4", "offset-xl-0", "col-xl-3");
                card.classList.add("card", "w-100", "p-3", "mx-auto", "my-2");

                image.src = candidate.avatar
                    ? candidate.avatar
                    : defaultAvatar;
                image.alt = "Candidate picture";
                image.classList.add("card-img-top", "rounded-circle", "w-75", "mx-auto");

                name.textContent = candidate.name;
                name.classList.add("card-title", "text-center", "my-2");

                email.textContent = candidate.email;
                email.classList.add("card-text", "text-center");

                card.appendChild(image);
                card.appendChild(name);
                card.appendChild(email);

                link.appendChild(card);
                link.setAttribute("href", "reports.html");
                link.setAttribute("data-id", candidate.id);
                setUpLink(link);

                div.appendChild(link);
                listContainer.appendChild(div);
            })
        } else {
            displayErrorMessage("No candidates match the search criteria.");
        }
    }

    function setUpLink(element) {
        element.addEventListener("click", function (event) {
            var id = element.getAttribute("data-id");
            sessionStorage.setItem("id", id);
        });
    }

    function displayErrorMessage(cause) {
        var listContainer = document.querySelector(".list-container");
        var errorElement = document.createElement("h5");

        errorElement.textContent = cause;
        errorElement.classList.add("mx-auto", "text-justify", "mt-4", "p-3");
        listContainer.appendChild(errorElement);
    }

    function filterList() {
        var searchInput = document.querySelector(".search");
        var searchItem = searchInput.value.toLowerCase();
        var filteredList = candidates.filter(function (candidate) {
            return candidate.name.toLowerCase().includes(searchItem);
        })
        displayCandidates(filteredList);
    }

    onPageLoad();
})();