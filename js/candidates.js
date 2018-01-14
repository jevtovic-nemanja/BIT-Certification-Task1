(function () {
    var request = new XMLHttpRequest();
    var url = BASE_URL + "candidates";
    
    function appendChildren () {
        var element = arguments[0];
        for (var i = 1; i < arguments.length; i++) {
            var child = arguments[i];
            element.appendChild(child);
        }
    }
    
    request.open("GET", url);
    
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            var candidates = JSON.parse(request.responseText);
            candidates.map(function (candidate) {
                var listContainer = document.querySelector(".listContainer");
                var div = document.createElement("div");
                var image = document.createElement("img");
                var name = document.createElement("h4");
                var email = document.createElement("p");
                var defaultAvatar = "assets/images/avatar.png";

                div.classList.add("card");
                
                image.src = candidate.avatar
                                ? candidate.avatar
                                : defaultAvatar;

                image.alt = "Candidate picture";
                name.textContent = candidate.name;
                email.textContent = candidate.email;

                appendChildren(div, image, name, email);
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