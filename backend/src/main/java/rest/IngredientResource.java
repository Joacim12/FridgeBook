package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import entity.Ingredient;
import facade.IngredientFacade;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;

@Path("ingredient")
public class IngredientResource {

    private final Gson GSON = new GsonBuilder().setPrettyPrinting().create();
    private final IngredientFacade INGREDIENTFACADE = new IngredientFacade("PU");

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getIngredients() {
        return GSON.toJson(INGREDIENTFACADE.getIngredients());
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getIngredientByName(@PathParam("id") String name) {
        return GSON.toJson(INGREDIENTFACADE.getIngredientByName(name));
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public String createIngredient(String content) {
        Ingredient ingredient = GSON.fromJson(content, Ingredient.class);
        INGREDIENTFACADE.createIngredient(ingredient);
        return "Created";
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public String updateIngredient(String content) {
        Ingredient ingredient = GSON.fromJson(content, Ingredient.class);
        INGREDIENTFACADE.updateIngredient(ingredient);
        return "Updated";
    }

    @DELETE
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public String deleteIngredient(@PathParam("id") String name) {
        INGREDIENTFACADE.deleteIngredient(name);
        return "Deleted";
    }
}
