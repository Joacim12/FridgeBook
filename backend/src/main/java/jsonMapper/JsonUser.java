package jsonMapper;

import entity.User;
import java.util.ArrayList;
import java.util.List;

public class JsonUser {

    private String username;
    private String pin;
    private List<JsonRecipe> recipesCreatedByUser;
    private List<JsonRecipe> favouriteRecipes;

    public JsonUser(User user) {
        username = user.getUsername();
        pin = user.getPin();
        recipesCreatedByUser = new ArrayList();
        favouriteRecipes = new ArrayList();

        user.getRecipesCreatedByUser().forEach(recipe -> {
            recipesCreatedByUser.add(new JsonRecipe(recipe));
        });

        user.getFavouriteRecipes().forEach(recipe -> {
            favouriteRecipes.add(new JsonRecipe(recipe));
        });
    }
}
