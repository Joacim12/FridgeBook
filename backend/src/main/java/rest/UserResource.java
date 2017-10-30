package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import entity.User;
import facade.UserFacade;
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

    private final Gson GSON = new GsonBuilder().setPrettyPrinting().create();
    private final UserFacade USERFACADE = new UserFacade("PU");

    public UserResource() {
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getAllUsers() {
        return GSON.toJson(USERFACADE.getUsers());
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getUserById(@PathParam("id") String username) {
        return GSON.toJson(USERFACADE.getUserById(username));
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public String updateUser(String content) {
        User user = GSON.fromJson(content, User.class);
        USERFACADE.updateUser(user);
        return "{\"isSucced\" : \"Updated\"}";
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public String createUser(String content) {
        User user = GSON.fromJson(content, User.class);
        USERFACADE.createUser(user);
        return "{\"isSucced\" : \"Created\"}";
    }

    @DELETE
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public String deleteBook(@PathParam("id") String username) {
        USERFACADE.deleteUser(username);
        return "{\"isSucced\" : \"Deleted\"}";
    }
}
