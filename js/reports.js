$(function () {

    function onPageLoad() {
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
                displayErrorMessage($(".candidate-error-container"),"Looks like there was some kind of error. Don't worry, we're looking into it!");
            });
    }

    function fetchReports() {
        var id = sessionStorage.getItem("id");
        var url = BASE_URL + "reports?q=" + id;

        $.getJSON(url)
            .done(function (reports) {
                displayReports(reports);
            })
            .fail(function () {
                displayErrorMessage($(".reports-error-container"),"Unfortunately, we are unable to load the reports at this time.");
            });
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

    function displayReports(reports) {
        if (!reports.length) {
            displayErrorMessage($(".reports-error-container"), "There are no reports for this candidate.")
        } else {
            
        }
    }

    function displayErrorMessage(element, cause) {
        var errorMessage = $("<h5>");
        errorMessage.text(cause)
            .attr("class", "mx-auto text-justify mt-4 p-3");
        element.append(errorMessage);
    }

    onPageLoad();
});