// This calls our back-end Java program that sets our session info
function login() {

    let url = "api/login_servlet";

    // Grab data from the HTML form
    let sessionKey = "loginId";
    let sessionValue = $("#loginId").val();

    // Create a JSON request based on that data
    let dataToServer = {sessionKey : sessionKey, sessionValue : sessionValue};

    // Post
    $.post(url, dataToServer, function (dataFromServer) {
        // We are done. Write a message to our console
        console.log("Finished calling servlet.");
        console.log(dataFromServer);
        // Clear the form
        $("#loginId").val("");
        getLogin();
    });
}

// This gets session info from our back-end servlet.
function getLogin() {

    let url = "api/get_login_servlet";

        $.post(url, null, function (dataFromServer) {
            console.log("Finished calling servlet.");
            console.log(dataFromServer);
            let trimmedResult = dataFromServer.trim()
            // Update the HTML with our result
            if (trimmedResult === "null")
            {
                console.log("Got here");
                $('#loginSection').hide();
            }
            else{
                console.log("Got here 2");
                $('#loginSection').show();
                $('#getSessionResult').html(dataFromServer);
            }});
}

// This method calls the servlet that invalidates our session
function invalidateLoginButton() {

    var url = "api/invalidate_login_servlet";

    $.post(url, null, function (dataFromServer) {
        console.log("Finished calling servlet.");
        console.log(dataFromServer);
        getLogin();
    });
}

getLogin();

// Hook the functions above to our buttons
button = $('#getLogin');
button.on("click", getLogin);

button = $('#login');
button.on("click", login);

button = $('#invalidateLogin');
button.on("click", invalidateLoginButton);