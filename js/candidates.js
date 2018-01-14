(function () {
    var request = new XMLHttpRequest();
    var url = BASE_URL + "candidates";
    
    request.open("GET", url);
    
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            var candidates = JSON.parse(request.responseText);
            candidates.map(function (candidate) {
                var listContainer = document.querySelector(".listContainer");
                var div = document.createElement("div");
                var card = document.createElement("div");
                var image = document.createElement("img");
                var name = document.createElement("h4");
                var email = document.createElement("small");
                var defaultAvatar = "assets/images/avatar.png";

                div.classList.add("offset-1", "col-10", "offset-md-0", "col-md-6", "offset-lg-0", "col-lg-4", "offset-xl-0", "col-xl-3");
                card.classList.add("card", "w-100", "p-3", "mx-auto", "my-2");

                image.classList.add("card-img-top", "rounded-circle", "w-75", "mx-auto");
                image.src = candidate.avatar ? candidate.avatar : defaultAvatar;
                image.alt = "Candidate picture";

                name.textContent = candidate.name;
                name.classList.add("card-title", "text-center", "my-2");

                email.textContent = candidate.email;
                email.classList.add("card-text", "text-center");

                card.appendChild(image);
                card.appendChild(name);
                card.appendChild(email);
                div.appendChild(card);
                listContainer.appendChild(div);
            })
        } else {
            listContainer.innerHTML = "<p>Looks like there was some kind of error. Don't worry, we're looking into it!</p>";
        }
    };
    
    request.onerror = function () {
        listContainer.innerHTML = "<p>Looks like the server is not responding. Don't worry, we're looking into it!</p>";
    };

    request.send();
}) ();