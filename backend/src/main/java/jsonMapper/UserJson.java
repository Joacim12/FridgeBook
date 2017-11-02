package jsonMapper;

import entity.User;
import java.util.ArrayList;
import java.util.List;

public class UserJson {

    private String username;
    private String pin;
    private List< RecipeJson> recipesCreatedByUser;
    private List<RecipeJson> favouriteRecipes;
    private List<IngredientJson> ingredients;

    public UserJson(User user) {
        username = user.getUsername();
        pin = user.getPin();
        recipesCreatedByUser = new ArrayList();
        favouriteRecipes = new ArrayList();
        ingredients = new ArrayList();

        user.getRecipesCreatedByUser().forEach(recipe -> {
            recipesCreatedByUser.add(new RecipeJson(recipe));
        });

        user.getFavouriteRecipes().forEach(recipe -> {
            favouriteRecipes.add(new RecipeJson(recipe));
        });

        user.getIngredients().forEach(ingredient -> {
            ingredients.add(new IngredientJson(ingredient));
        });
    }
}
