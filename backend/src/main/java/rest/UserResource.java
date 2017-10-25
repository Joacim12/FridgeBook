package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonSyntaxException;
import entity.User;
import facade.UserFacade;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;

@Path("user")
public class UserResource {

    Gson gson = new GsonBuilder().setPrettyPrinting().create();
    UserFacade userFacade = new UserFacade("PU");

    public UserResource() {
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getAllUsers() throws Exception {
        try {
            List<User> users = userFacade.getUsers();
            return gson.toJson(users);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getUserById(@PathParam("id") String username) throws Exception {
        try {
            return gson.toJson(userFacade.getUserById(username));
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public String updateUser(String content) throws Exception {
        try {
            User user = gson.fromJson(content, User.class);
            userFacade.updateUser(user);
            return "{\"isSucced\" : \"Updated\"}";
        } catch (JsonSyntaxException e) {
            throw new Exception(e.getMessage());
        }
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public String createUser(String content) throws Exception {
        try {
            User user = gson.fromJson(content, User.class);
            userFacade.createUser(user);
            return "{\"isSucced\" : \"Created\"}";
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @DELETE
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public String deleteBook(@PathParam("id") String username) throws Exception {
        try {
            userFacade.deleteUser(username);
            return "{\"isSucced\" : \"Deleted\"}";
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
}
