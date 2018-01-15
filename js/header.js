(function () { 
    function onPageLoad() {
        var homeButton = document.querySelector(".home");
        homeButton.addEventListener("click", goToHomePage);
    }

    function goToHomePage() {
        location.assign("index.html");
    }

    onPageLoad();
})();