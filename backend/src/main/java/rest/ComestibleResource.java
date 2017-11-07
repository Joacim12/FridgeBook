package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import entity.Comestible;
import facade.ComestibleFacade;
import java.util.ArrayList;
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
import jsonMapper.ComestibleJson;

@Path("comestible")
public class ComestibleResource {

    private final Gson GSON = new GsonBuilder().setPrettyPrinting().create();
    private final ComestibleFacade COMESTIBLE_FACADE = new ComestibleFacade("PU");

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getComestibles() {
        List<Comestible> comestibles = COMESTIBLE_FACADE.getComestibles();
        List<ComestibleJson> comestiblesJson = new ArrayList();
        comestibles.forEach(comestible -> {
            comestiblesJson.add(new ComestibleJson(comestible));
        });
        return GSON.toJson(comestiblesJson);
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getComestibleById(@PathParam("id") int id) {
        return GSON.toJson(new ComestibleJson(COMESTIBLE_FACADE.getComestible(id)));
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public String createComestible(String content) {
        Comestible comestible = GSON.fromJson(content, Comestible.class);
        COMESTIBLE_FACADE.createComestible(comestible);
        return "Created";
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public String updateComestible(String content) {
        Comestible comestible = GSON.fromJson(content, Comestible.class);
        COMESTIBLE_FACADE.updateComestible(comestible);
        return "Updated";
    }

    @DELETE
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public String deleteComestible(@PathParam("id") int id) {
        COMESTIBLE_FACADE.deleteComestible(id);
        return "Deleted";
    }
}
