package jsonMapper;

import entity.User;
import java.util.ArrayList;
import java.util.List;

public class UserJson {

    private String username;
    private String pin;
    private List<RecipeJson> recipesCreatedByUser;
    private List<RecipeJson> favouriteRecipes;
    private List<ComestibleJson> comestibles;

    public UserJson(User user) {
        username = user.getUsername();
        pin = user.getPin();
        recipesCreatedByUser = new ArrayList();
        favouriteRecipes = new ArrayList();
        comestibles = new ArrayList();

        user.getRecipesCreatedByUser().forEach(recipe -> {
            recipesCreatedByUser.add(new RecipeJson(recipe));
        });

        user.getFavouriteRecipes().forEach(recipe -> {
            favouriteRecipes.add(new RecipeJson(recipe));
        });

        user.getComestibles().forEach(comestible -> {
            comestibles.add(new ComestibleJson(comestible));
        });
    }
}
