package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import entity.Ingredient;
import facade.IngredientFacade;
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
import jsonMapper.IngredientJson;

@Path("ingredient")
public class IngredientResource {

    private final Gson GSON = new GsonBuilder().setPrettyPrinting().create();
    private final IngredientFacade INGREDIENT_FACADE = new IngredientFacade("PU");

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getIngredients() {
        List<Ingredient> ingredients = INGREDIENT_FACADE.getIngredients();
        List<IngredientJson> ingredientsJson = new ArrayList();
        ingredients.forEach(ingredient -> {
            ingredientsJson.add(new IngredientJson(ingredient));
        });
        return GSON.toJson(ingredientsJson);
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getIngredientByName(@PathParam("id") String name) {
        return GSON.toJson(INGREDIENT_FACADE.getIngredientByName(name));
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public String createIngredient(String content) {
        Ingredient ingredient = GSON.fromJson(content, Ingredient.class);
        INGREDIENT_FACADE.createIngredient(ingredient);
        return "Created";
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public String updateIngredient(String content) {
        Ingredient ingredient = GSON.fromJson(content, Ingredient.class);
        INGREDIENT_FACADE.updateIngredient(ingredient);
        return "Updated";
    }

//    @DELETE
//    @Path("{id}")
//    @Consumes(MediaType.APPLICATION_JSON)
//    public String deleteIngredient(@PathParam("id") String name) {
//        INGREDIENTFACADE.deleteIngredient(name);
//        return "Deleted";
//    }
}
