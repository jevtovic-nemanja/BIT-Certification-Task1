$(function () {

    function onPageLoad() {
        fetchData();
    }

    function fetchData() {
        fetchCandidateInfo();
        fetchReports();
    }

    function fetchCandidateInfo() {
        var id = sessionStorage.getItem("id");
        var url = BASE_URL + "candidates/" + id;

        $.getJSON(url)
            .done(function (candidate) {
                displayCandidate(candidate);
            })
            .fail(function () {
                displayErrorMessage();
            });
    }

    function fetchReports() {

    }

    function displayCandidate(candidate) {
        var dob = new Date(candidate.birthday);
        var month = dob.getMonth() + 1;
        var birthday = dob.getDate() + "." + month + "." + dob.getFullYear();

        $(".candidate-img").attr("src", candidate.avatar);
        $(".candidate-name").text(candidate.name);
        $(".candidate-email").text(candidate.email);
        $(".candidate-dob").text(birthday);
        $(".candidate-edu").text(candidate.education);
    }

    function displayErrorMessage() {
        var errorMessage = $("<h5>");
        errorMessage.text("Looks like there was some kind of error. Don't worry, we're looking into it!")
            .attr("class", "mx-auto text-justify mt-4 p-3");
        $(".candidate-info").append(errorMessage);
    }


    onPageLoad();
});