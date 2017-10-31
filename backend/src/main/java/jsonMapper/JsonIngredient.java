package jsonMapper;

import entity.Ingredient;

public class JsonIngredient {

    private String name;
    private String imagePath;

    public JsonIngredient(Ingredient ingredient) {
        name = ingredient.getName();
        imagePath = ingredient.getImagePath();
    }

}
