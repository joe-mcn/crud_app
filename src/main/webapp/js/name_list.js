// Main Javascript File

function htmlSafe(data) {
    return data.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;");
}

function formatPhoneNumber(phoneNumberString){
    let cleaned = phoneNumberString.replace(/\D/g, '');
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phoneNumberString;
}

function getJSDateFromSQLDate(sqlDate) {
    let cleaned = sqlDate.replace(/\D/g, '');
    let match = cleaned.match(/^(\d{4})(\d{2})(\d{2})$/);
    let resultDate = new Date(match[1], match[2], match[3]);
    return resultDate;
}

function updateTable() {
    // Here's where your code is going to go.
    console.log("updateTable called");
    // Define a URL
    let url = "api/name_list_get";
    // Start a web call. Specify:
    // URL
    // Data to pass (nothing in this case)
    // Function to call when we are done
    $.getJSON(url, null, function(json_result) {
        //Remove "no data"
        $('#datatable tbody tr').remove()
        for (let i = 0; i < json_result.length; i++) {
            //Adding the data to table

            let birthdayDate = getJSDateFromSQLDate(json_result[i].birthday);
            let birthdayString = birthdayDate.toLocaleDateString();

            $('#datatable tbody:last').append('<tr><td>'
                +json_result[i].id
                +'</td><td>'
                +htmlSafe(json_result[i].firstName)
                +'</td><td>'
                +htmlSafe(json_result[i].lastName)
                +'</td><td>'
                +formatPhoneNumber(htmlSafe(json_result[i].phone))
                +'</td><td>'
                +htmlSafe(json_result[i].email)
                +'</td><td>'
                +htmlSafe(birthdayString)
                +'</td>' +
                '<td>'+
                '  <button type=\'button\' name=\'edit\' class=\'editButton btn btn-primary\' value= \'' +json_result[i].id + '\'>\n' +
                '    Edit\n' +
                '  <button type=\'button\' name=\'delete\' class=\'deleteButton btn btn-danger\' value= \'' +json_result[i].id + '\'>\n' +
                '    Delete\n' +
                '</td></tr>'
                );
            }
        $(".deleteButton").on("click", deleteItem);
        $(".editButton").on("click", editItem);
        }
    );
}
// Call your code.
updateTable();

function deleteItem(e) {
    console.log("Delete");
    console.log(e.target.value);

    let url = "api/name_list_delete";
    let dataToServer = {id: e.target.value};
    console.log(dataToServer);
    $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(dataToServer),
        success: function(dataFromServer) {
            console.log(dataFromServer);
            updateTable();
        },
        contentType: "application/json",
        dataType: 'text' // Could be JSON or whatever too
    })
}

function editItem(e) {
    console.log("Edit");
    console.log("Edit: " + e.target.value);

    // Grab the id from the event
    let id = e.target.value;

// This next line is fun.
// "e" is the event of the mouse click
// "e.target" is what the user clicked on. The button in this case.
// "e.target.parentNode" is the node that holds the button. In this case, the table cell.
// "e.target.parentNode.parentNode" is the parent of the table cell. In this case, the table row.
// "e.target.parentNode.parentNode.querySelectorAll("td")" gets an array of all matching table cells in the row
// "e.target.parentNode.parentNode.querySelectorAll("td")[0]" is the first cell. (You can grab cells 0, 1, 2, etc.)
// "e.target.parentNode.parentNode.querySelectorAll("td")[0].innerHTML" is content of that cell. Like "Sam" for example.
// How did I find this long chain? Just by setting a breakpoint and using the interactive shell in my browser.
    let first = e.target.parentNode.parentNode.querySelectorAll("td")[1].innerHTML;
    let last = e.target.parentNode.parentNode.querySelectorAll("td")[2].innerHTML;
    let email = e.target.parentNode.parentNode.querySelectorAll("td")[4].innerHTML;
    let phone = e.target.parentNode.parentNode.querySelectorAll("td")[3].innerHTML;
    let birthday = e.target.parentNode.parentNode.querySelectorAll("td")[5].innerHTML;
// repeat line above for all the fields we need
    // Regular expression to match phone number pattern:
// (515) 555-1212
    let regexp = /\((\d{3})\) (\d{3})-(\d{4})/;
    let match = phone.match(regexp);
// Log what we matched
    console.log("Matches:");
    console.log(match);
// We how have a list, 1-3, where each one is part of the phone number.
// Reformat into 515-555-1212
    let phoneString = match[1] + "-"+ match[2] + "-" + match[3]

    // Parse date to current time in milliseconds
    let timestamp = Date.parse(birthday);
// Made date object out of that time
    let dateObject = new Date(timestamp);
// Convert to a full ISO formatted string
    let fullDateString = dateObject.toISOString();
// Trim off the time part
    let shortDateString = fullDateString.split('T')[0];
    console.log("Test for bday" + shortDateString);

    $('#id').val(id); // Yes, now we set and use the hidden ID field
    $('#firstName').val(first);
    $('#lastname').val(last);
    $('#email').val(email);
    $('#phone').val(phoneString);
    $('#birthday').val(shortDateString);
    console.log("testing bday again " +shortDateString);

// Etc

// Show the window
    $('#myModal').modal('show');
}

function showDialogAdd() {
    console.log("ADD ITEM")

    // Show the hidden dialog
    $('#myModal').modal('show');

    // Empty fields
    $('#id').val("");
    let firstNameField = $('#firstName');
    let lastNameField = $('#lastname');
    let birthdayField = $('#birthday');
    let phoneField = $('#phone');
    let emailField = $('#email');

    firstNameField.val("");
    firstNameField.removeClass("is-invalid");
    firstNameField.removeClass("is-valid");
    lastNameField.val("");
    lastNameField.removeClass("is-invalid");
    lastNameField.removeClass("is-valid");
    birthdayField.val("");
    birthdayField.removeClass("is-invalid");
    birthdayField.removeClass("is-valid");
    phoneField.val("");
    phoneField.removeClass("is-invalid");
    phoneField.removeClass("is-valid");
    emailField.val("");
    emailField.removeClass("is-invalid");
    emailField.removeClass("is-valid");

    $('#myModal').on('shown.bs.modal', function () {
        firstNameField.focus();
    });
}

// There's a button in the form with the ID "addItem"
// Associate the function showDialogAdd with it.
let addItemButton = $('#addItem');
addItemButton.on("click", showDialogAdd);

function saveChanges(){
    let IsValid = true;
    console.log("Saved Changes")
    //First Name
    let firstName = $('#firstName');
    console.log("First name: " + firstName);
    // Create the regular expression
    let reg = /^[A-Za-z]{1,10}$/;
    // Set style for outline of form field
// This is a VALID field
    if (reg.test(firstName.val())) {
        firstName.removeClass("is-invalid");
        firstName.addClass("is-valid");
    }
    /* etc. */
// This is an INVALID field
    else {
        firstName.removeClass("is-valid");
        firstName.addClass("is-invalid");
        IsValid = false;
    }
    //Last Name
    let lastName = $('#lastname');
    console.log("Last name: " + lastName);
    // Create the regular expression
    // Set style for outline of form field
// This is a VALID field
    if (reg.test(lastName.val())) {
        lastName.removeClass("is-invalid");
        lastName.addClass("is-valid");
    }
        /* etc. */
// This is an INVALID field
    else {
        lastName.removeClass("is-valid");
        lastName.addClass("is-invalid");
        IsValid = false;
    }

    //Email
    let email = $('#email');
    console.log("Email: " + email);
    // Create the regular expression
    let emailCheck = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z]{3})+$/;
    // Set style for outline of form field
// This is a VALID field
    if (emailCheck.test(email.val())) {
        email.removeClass("is-invalid");
        email.addClass("is-valid");
    }
        /* etc. */
// This is an INVALID field
    else {
        email.removeClass("is-valid");
        email.addClass("is-invalid");
        IsValid = false;
    }
    //Phone
    let phone = $('#phone');
    console.log("Phone: " + phone);
    // Create the regular expression
    let phoneCheck = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    // Set style for outline of form field
// This is a VALID field
    if (phoneCheck.test(phone.val())) {
        phone.removeClass("is-invalid");
        phone.addClass("is-valid");
    }
        /* etc. */
// This is an INVALID field
    else {
        phone.removeClass("is-valid");
        phone.addClass("is-invalid");
        IsValid = false;
    }
    //Phone
    let birthday = $('#birthday');
    console.log("Birthday: " + birthday);
    // Create the regular expression
    let birthdayCheck = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
    // Set style for outline of form field
// This is a VALID field
    if (birthdayCheck.test(birthday.val())) {
        birthday.removeClass("is-invalid");
        birthday.addClass("is-valid");
    }
        /* etc. */
// This is an INVALID field
    else {
        birthday.removeClass("is-valid");
        birthday.addClass("is-invalid");
        IsValid = false;
    }

    if (IsValid){
        let url = "api/name_list_edit";
        let dataToServer;
        let id = $('#id').val()
        if (id === "") {
            dataToServer = {
                firstName: firstName.val(),
                lastName: lastName.val(),
                email: email.val(),
                phone: phone.val(),
                birthday: birthday.val()
            };
            console.log(dataToServer);
        }
        else{
            dataToServer = {
                firstName: firstName.val(),
                lastName: lastName.val(),
                email: email.val(),
                phone: phone.val(),
                birthday: birthday.val(),
                id: id
            };
        }
        $.ajax({
            type: 'POST',
            url: url,
            data: JSON.stringify(dataToServer),
            success: function(dataFromServer) {
                console.log(dataFromServer);
                updateTable();
                $('#myToast').toast('show');
            },
            contentType: "application/json",
            dataType: 'text' // Could be JSON or whatever too
        },
            $('#myModal').modal('hide'))
    }
}

// There's a button in the form with the ID "addItem"
// Associate the function showDialogAdd with it.
let saveChangesButton = $('#saveChanges');
saveChangesButton.on("click", saveChanges);

$(document).keydown(function(e) {
    console.log(e.keyCode);
    if (e.keyCode == 65 && !$('#myModal').is(':visible'))
    {
        showDialogAdd();
    }
})