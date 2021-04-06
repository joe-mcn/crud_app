package edu.simpson.cis320.crud_app;
import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@WebServlet(name = "NameListEdit", value = "/api/name_list_edit")

public class NameListEdit extends HttpServlet {
    private final static Logger log = Logger.getLogger(FormTestJSONServlet.class.getName());

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        Pattern nameValidationPattern = Pattern.compile("^[A-Za-z]{1,10}$");
        Pattern phoneValidationPattern = Pattern.compile("^([0-9]{3})?[-. ]?([0-9]{3})[-. ]?([0-9]{4})");
        Pattern birthdayValidationPattern = Pattern.compile("[0-9]{4}-[0-9]{2}-[0-9]{2}");
        Pattern emailValidationPattern = Pattern.compile("[a-zA-Z0-9_.+-]+@([a-zA-Z0-9-])+.+([a-zA-Z]{3})");

        log.log(Level.INFO, "doPost for NameListEdit");

        // Type of output (HTML, JSON, image, whatever
        response.setContentType("text/plain");

        // Get setup up to output JSON text
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        // Open the request for reading. Read in each line, put it into a string.
        // Yes, I think there should be an easier way.
        java.io.BufferedReader in = request.getReader();
        String requestString = new String();
        for (String line; (line = in.readLine()) != null; requestString += line);

        // Log the string we got as a request, just as a check
        log.log(Level.INFO, requestString);

        // Great! Now we want to parse the object, and pop it into our business object. Field
        // names have to match. That's the magic.
        Jsonb jsonb = JsonbBuilder.create();
        Person person = jsonb.fromJson(requestString, Person.class);

        // Log info as a check
        log.log(Level.INFO, "Object test: "+ person.getFirstName() + " " + person.getLastName() + " " + person.getPhone() + " " +
                person.getBirthday() + " " + person.getEmail());

        // Send something back to the client. Really, we should send a JSON, but
        // we'll keep things simple.
        out.println("Object test: "+ person.getFirstName() + " " + person.getLastName() + " " + person.getPhone() + " " +
                person.getBirthday() + " " + person.getEmail());

        String firstName = person.getFirstName();
        log.log(Level.INFO,"firstName='"+ firstName +"'");

        String lastName = person.getLastName();
        log.log(Level.INFO,"last name = '" + lastName + "'");

        String phone = person.getPhone();
        log.log(Level.INFO,"phone = '" + phone + "'");

        String birthday = person.getBirthday();
        log.log(Level.INFO,"birthday = '" + birthday + "'");

        String email = person.getEmail();
        log.log(Level.INFO, "email= '"+ email + "'");


        Matcher first= nameValidationPattern.matcher(firstName);
        Matcher last = nameValidationPattern.matcher(lastName);
        Matcher phonematcher = phoneValidationPattern.matcher(phone);
        Matcher emailmatcher = emailValidationPattern.matcher(email);
        Matcher birthdaymatcher = birthdayValidationPattern.matcher(birthday);

        if (first.find( ) && last.find() && phonematcher.find() && emailmatcher.find() && birthdaymatcher.find()) {
            out.println("success");
            if (person.getId() == 0) {
                PersonDAO.addPerson(person);
            }
            else {
                PersonDAO.editPerson(person);
            }
        } else {
            out.println("error");
        }
    }
}

