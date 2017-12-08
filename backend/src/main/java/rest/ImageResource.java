package rest;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;

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
        saveFile(uploadedInputStream, fileDetail.getFileName());
        return "{\"path\":\"" + fileDetail.getFileName() + "\"}";
    }

    private void saveFile(InputStream file, String name) {
        try {
            java.nio.file.Path path = FileSystems.getDefault().getPath("/home/joacim/images/fridgebook/" + name);
            Files.copy(file, path);
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }
}
