package jsonMapper;

import entity.Ingredient;

public class IngredientJson {

    private String name;
    private String imagePath;

    public IngredientJson(Ingredient ingredient) {
        name = ingredient.getName();
        imagePath = ingredient.getImagePath();
    }
}
