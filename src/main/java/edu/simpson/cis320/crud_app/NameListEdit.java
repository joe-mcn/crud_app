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

@WebServlet(name = "NameListEdit", value = "/api/name_list_edit")

public class NameListEdit extends HttpServlet {
    private final static Logger log = Logger.getLogger(FormTestJSONServlet.class.getName());

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

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
        PersonDAO.addPerson(person);

    }
}

