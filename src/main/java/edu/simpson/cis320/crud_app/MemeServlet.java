package edu.simpson.cis320.crud_app;

import javax.imageio.ImageIO;
import javax.servlet.ServletContext;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.rmi.server.ServerCloneException;
import java.util.logging.Level;
import java.util.logging.Logger;

@WebServlet(name = "memeServlet", value = "/meme")
public class MemeServlet extends HttpServlet {
    private final static Logger log = Logger.getLogger(MemeServlet.class.getName());

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

        log.log(Level.INFO, "Meme Servlet");

        ServletContext context = getServletContext();
        InputStream imageStream = context.getResourceAsStream("WEB-INF/classes/meme.jpg");
        BufferedImage image = ImageIO.read(imageStream);

        // Get graphics context
        Graphics g = image.getGraphics();

        // Set Font
        String fontName = "Century Schoolbook";
        int fontSize = 25;
        int fontStyle = Font.PLAIN;
        Font font = new Font(fontName, fontStyle, fontSize);
        g.setFont(font);

        String message = request.getParameter("message");
        if (message == null)
        {
            message = "Trying the Shrimp Gumbo at Pfief";
        };
        // Set color
        Color myPrimaryColor = new Color(0, 0, 0);
        g.setColor(myPrimaryColor);

        message = "Trying the Shrimp Gumbo at Pfief";

        g.drawString(message, 25,100);

        g.dispose();
        // Write out the image
        response.setContentType("image/jpg");
        OutputStream out = response.getOutputStream();
        ImageIO.write(image, "JPG", out);
    }
}