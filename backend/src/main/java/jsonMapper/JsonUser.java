package jsonMapper;

import entity.User;
import java.util.ArrayList;
import java.util.List;

public class JsonUser {

    private String userName;
    private String pin;
    private List<JsonRecipe> recipesCreatedByUser;
    private List<JsonIngredient> userIngredients;
    private List<JsonRecipe> favouriteRecipes;

    public JsonUser(User user) {
        userName = user.getUserName();
        pin = user.getPin();
        recipesCreatedByUser = new ArrayList();
        userIngredients = new ArrayList();
        favouriteRecipes = new ArrayList();

        user.getRecipesCreatedByUser().forEach(recipe -> {
            recipesCreatedByUser.add(new JsonRecipe(recipe));
        });

        user.getUserIngredients().forEach(ingredient -> {
            userIngredients.add(new JsonIngredient(ingredient));
        });

        user.getFavouriteRecipes().forEach(recipe -> {
            favouriteRecipes.add(new JsonRecipe(recipe));
        });
    }

}
