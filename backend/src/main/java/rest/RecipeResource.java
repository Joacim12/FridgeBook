package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import entity.Recipe;
import facade.RecipeFacade;
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
import jsonMapper.RecipeJson;

@Path("recipe")
public class RecipeResource {

    private final Gson GSON = new GsonBuilder().setPrettyPrinting().create();
    private final RecipeFacade RECIPE_FACADE = new RecipeFacade("PU");

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getRecipes() {
        List<Recipe> recipes = RECIPE_FACADE.getRecipes();
        List<RecipeJson> recipesJson = new ArrayList();
        recipes.forEach(recipe -> {
            recipesJson.add(new RecipeJson(recipe));
        });
        return GSON.toJson(recipesJson);
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getRecipeById(@PathParam("id") int id) {
        return GSON.toJson(new RecipeJson(RECIPE_FACADE.getRecipeById(id)));
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public String createRecipe(String content) {
        Recipe recipe = GSON.fromJson(content, Recipe.class);
        RECIPE_FACADE.createRecipe(recipe);
        return "Created";
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public String updateRecipe(String content) {
        Recipe recipe = GSON.fromJson(content, Recipe.class);
        RECIPE_FACADE.updateRecipe(recipe);
        return "Updated";
    }

    @DELETE
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public String deleteRecipe(@PathParam("id") int id) {
        RECIPE_FACADE.deleteRecipe(id);
        return "Deleted";
    }
}
