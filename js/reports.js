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
                displayErrorMessage($(".candidate-error-container"), "Looks like there was some kind of error. Don't worry, we're looking into it!");
            });
    }

    function fetchReports() {
        var id = sessionStorage.getItem("id");
        var url = BASE_URL + "reports?q=" + id;

        $.getJSON(url)
            .done(function (reports) {
                if (!reports.length) {
                    displayErrorMessage($(".reports-error-container"), "There are no reports for this candidate.")
                } else {
                    displayReports(reports);
                }
            })
            .fail(function () {
                displayErrorMessage($(".reports-error-container"), "Unfortunately, we are unable to load the reports at this time.");
            });
    }

    function displayCandidate(candidate) {
        var defaultAvatar = "assets/images/avatar.png";
        var image = candidate.avatar
            ? candidate.avatar
            : defaultAvatar;

        $(".candidate-img").attr("src", image);
        $(".candidate-name").text(candidate.name);
        $(".candidate-email").text(candidate.email);
        $(".candidate-dob").text(formatDate(candidate.birthday));
        $(".candidate-edu").text(candidate.education);
    }

    function displayReports(reports) {
        var title = $("<h4>").text("Reports").attr("class", "my-3");
        $("table").before(title);

        $.each(reports, function (index, report) {
            var reportData = [report.companyName, formatDate(report.interviewDate), report.status];
            addTableRow(reportData);
        })
    }

    function displayErrorMessage(element, cause) {
        var errorMessage = $("<h5>");
        errorMessage.text(cause)
            .attr("class", "mx-auto text-justify mt-4 p-3");
        element.append(errorMessage);
    }

    function addTableRow(data) {
        var row = $("<tr>");

        $.each(data, function (index, item) {
            var cell = $("<td>").text(item);
            row.append(cell);
        })

        var view = $("<td>").attr("class", "text-center")
                            .html($("<i>").attr("class", "fa fa-eye"));
        row.append(view);

        $("tbody").append(row);
    }

    function formatDate(date) {
        var dob = new Date(date);
        var month = dob.getMonth() + 1;
        var birthday = dob.getDate() + "." + month + "." + dob.getFullYear();
        return birthday;
    }

    onPageLoad();
});