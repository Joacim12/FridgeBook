package jsonMapper;

import entity.Ingredient;
import java.util.ArrayList;
import java.util.List;

public class IngredientJson {

    private String name;
    private String imagePath;
    private List<IngredientInfoJson> ingredientInfos;

    public IngredientJson(Ingredient ingredient) {
        name = ingredient.getName();
        imagePath = ingredient.getImagePath();
        ingredientInfos = new ArrayList();

        ingredient.getIngredientInfos().forEach(ingredientInfo -> {
            ingredientInfos.add(new IngredientInfoJson(ingredientInfo));
        });
    }
}
