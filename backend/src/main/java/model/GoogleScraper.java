package model;

import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

/**
 *
 * @author joaci
 */
public class GoogleScraper {

    public static void main(String[] args) {
        GoogleScraper gs = new GoogleScraper();
        gs.getDoc("8714100370902");
    }

    public Document getDoc(String query) {
        try {
            String userAgent = "ExampleBot 1.0 (+http://example.com/bot)";
            Elements links = Jsoup.connect("https://www.google.dk/search?q=" + query).userAgent(userAgent).get().select(".g>.r>a");
            for (Element link : links) {
                String title = link.text();
                System.out.println("Title: " + title);
            }
        } catch (IOException ex) {
            Logger.getLogger(GoogleScraper.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }
}
