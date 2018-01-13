package utils;

import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import javax.imageio.ImageIO;

/**
 *
 * @author joaci
 */
public class ImageResizer {

    public static void main(String[] args) throws IOException {
        File dir = new File("c:/temp/fr/");
        File[] files = dir.listFiles();
        for (File file : files) {
            BufferedImage image = ImageIO.read(file);
            BufferedImage resized = resize(image, image.getHeight() / 8, image.getWidth() / 8);
            File output = new File("c:/temp/new/" + file.getName());
            ImageIO.write(resized, "jpg", output);
        }
    }

    private static BufferedImage resize(BufferedImage img, int height, int width) {
        Image tmp = img.getScaledInstance(width, height, Image.SCALE_SMOOTH);
        BufferedImage resized = new BufferedImage(width, height, BufferedImage.TYPE_3BYTE_BGR);
        Graphics2D g2d = resized.createGraphics();
        g2d.drawImage(tmp, 0, 0, null);
        g2d.dispose();
        return resized;
    }
}
