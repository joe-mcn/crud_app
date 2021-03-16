<!-- AJAX Get -->
function jqueryGetButtonAction() {

    var url = "api/form_test_servlet";
    var myFieldValue = $("#jqueryGetField").val();
    var dataToServer = { fieldname : myFieldValue };

    $.get(url, dataToServer, function (dataFromServer) {
        console.log("Finished calling servlet.");
        console.log(dataFromServer);
    });
}
var jqueryGetButton = $('#jqueryGetButton');
jqueryGetButton.on("click", jqueryGetButtonAction);

<!-- AJAX Post -->
function jqueryPostButtonAction() {

    var url = "api/form_test_servlet";
    var myFieldValue = $("#jqueryPostField").val();
    var dataToServer = { fieldname : myFieldValue };

    $.post(url, dataToServer, function (dataFromServer) {
        console.log("Finished calling servlet.");
        console.log(dataFromServer);
    });
}
var jqueryPostButton = $('#jqueryPostButton');
jqueryPostButton.on("click", jqueryPostButtonAction);

<!-- AJAX Post using JSON data -->
function jqueryPostJSONButtonAction() {

    var url = "api/form_test_json_servlet";
    var myFieldValue = $("#jqueryPostJSONField").val();
    var dataToServer = { fieldname : myFieldValue };

    $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(dataToServer),
        success: function(dataFromServer) {
            console.log(dataFromServer);
        },
        contentType: "application/json",
        dataType: 'text' // Could be JSON or whatever too
    });
}
var jqueryPostJSONButton = $('#jqueryPostJSONButton');
jqueryPostJSONButton.on("click", jqueryPostJSONButtonAction);

Dropzone.options.myDropzone = {
    init: function() {
        this.on("success", function(file, response) {
            console.log(response);
        });
    }
};