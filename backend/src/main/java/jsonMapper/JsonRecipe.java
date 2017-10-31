package jsonMapper;

import entity.Recipe;
import java.util.ArrayList;
import java.util.List;

public class JsonRecipe {

    private Integer id;
    private String name;
    private int rateCounter;
    private List<String> imagePaths;
    private String text;
    private List<JsonIngredient> recipeIngredients;

    public JsonRecipe(Recipe recipe) {
        id = recipe.getId();
        name = recipe.getName();
        rateCounter = recipe.getRateCounter();
        imagePaths = recipe.getImagePaths();
        text = recipe.getText();
        recipeIngredients = new ArrayList();

        recipe.getRecipeIngredients().forEach(ingredient -> {
            recipeIngredients.add(new JsonIngredient(ingredient));
        });
    }
}
