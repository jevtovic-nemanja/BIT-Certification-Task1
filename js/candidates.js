(function () {
    var request = new XMLHttpRequest();
    var url = BASE_URL + "candidates";
    
    var main = document.querySelector("main");
    
    request.open("GET", url);
    
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.responseText);
            console.log(data);
        } else {
            main.innerHTML = "<p>Looks like there was some kind of error. Don't worry, we're looking into it!</p>";
        }
    };
    
    request.onerror = function () {
        main.innerHTML = "<p>Looks like the server is not responding. Don't worry, we're looking into it!</p>";
    };

    request.send();
}) ();