package rest;

import java.io.InputStream;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;
import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author joaci
 */
@Path("imageUpload")
public class ImageResource {

    @POST
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public String uploadFile(@FormDataParam("file") InputStream uploadedInputStream,
            @FormDataParam("file") FormDataContentDisposition fileDetail) {
        try {
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            byte[] buffer = new byte[1024];
            int len;
            while ((len = uploadedInputStream.read(buffer)) > -1) {
                baos.write(buffer, 0, len);
            }
            baos.flush();
            InputStream is1 = new ByteArrayInputStream(baos.toByteArray());
            InputStream is2 = new ByteArrayInputStream(baos.toByteArray());

            BufferedImage image = ImageIO.read(is1);
            BufferedImage resized = resize(image, 48, 48);
            System.out.println("resizing");
            File output = new File("/home/joacim/images/fridgebook/thumb" + fileDetail.getFileName());
            ImageIO.write(resized, "jpg", output);
            saveFile(is2, fileDetail.getFileName());
        } catch (IOException ex) {
            Logger.getLogger(ImageResource.class.getName()).log(Level.SEVERE, null, ex);
        }
        return "{\"path\":\"" + fileDetail.getFileName() + "\"}";
    }

    private static BufferedImage resize(BufferedImage img, int height, int width) {
        Image tmp = img.getScaledInstance(width, height, Image.SCALE_SMOOTH);
        BufferedImage resized = new BufferedImage(width, height, BufferedImage.TYPE_3BYTE_BGR);
        Graphics2D g2d = resized.createGraphics();
        g2d.drawImage(tmp, 0, 0, null);
        g2d.dispose();
        return resized;
    }

    private void saveFile(InputStream file, String name) {
        try {
            java.nio.file.Path path = FileSystems.getDefault().getPath("/home/joacim/images/fridgebook/" + name);
//            java.nio.file.Path path = FileSystems.getDefault().getPath("c:/temp/" + name);
            Files.copy(file, path);
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }
}
