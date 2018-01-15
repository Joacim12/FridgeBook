package jsonMapper;

import entity.Recipe;
import java.util.ArrayList;
import java.util.List;

public class RecipeJson {

    private Integer id;
    private String name;
    private int rateCounter;
    private List<String> imagePaths;
    private String text;
    private String note;
//    private List<CategoryJson> recipeIngredients;

    public RecipeJson(Recipe recipe) {
        id = recipe.getId();
        name = recipe.getName();
        rateCounter = recipe.getRateCounter();
        imagePaths = recipe.getImagePaths();
        text = recipe.getText();
        note = recipe.getNote();
//        recipeIngredients = new ArrayList();

//        recipe.getRecipeIngredients().forEach(ingredient -> {
//            recipeIngredients.add(new CategoryJson(ingredient));
//        });
    }
}
