(function () {

    //Global variables
    var listContainer = document.querySelector(".listContainer");
    var candidates = [];

    //Fetch data
    var request = new XMLHttpRequest();

    var url = BASE_URL + "candidates";
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

    //Display functions
    function displayCandidates(candidates) {
        listContainer.innerHTML = "";

        if (candidates.length) {

            candidates.map(function (candidate) {
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
                link.addEventListener("click", function(event) {
                    var id = link.getAttribute("data-id");
                    sessionStorage.setItem("id", id);
                });

                div.appendChild(link);
                listContainer.appendChild(div);
            })
        } else {
            displayErrorMessage("No candidates match the search criteria.");
        }
    }

    function displayErrorMessage(cause) {
        var errorElement = document.createElement("h5");
        errorElement.textContent = cause;
        errorElement.classList.add("mx-auto", "text-justify", "mt-4", "p-3");
        listContainer.appendChild(errorElement);
    }

    //Add multiple event listeners
    function addMultipleListeners(element, events, callback) {
        events.map(function (event) {
            element.addEventListener(event, callback)
        })
    }

    //Search candidates
    var searchInput = document.querySelector(".search");
    addMultipleListeners(searchInput, ["change", "input"], filterList);

    function filterList() {
        var searchItem = searchInput.value.toLowerCase();
        var filteredList = candidates.filter(function (candidate) {
            return candidate.name.toLowerCase().includes(searchItem);
        })
        displayCandidates(filteredList);
    }
})();