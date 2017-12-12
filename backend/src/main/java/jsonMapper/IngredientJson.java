package jsonMapper;

import entity.Ingredient;

public class IngredientJson {

    private String name;
    private String imagePath;
    private String barcode;

    public IngredientJson(Ingredient ingredient) {
        name = ingredient.getName();
        imagePath = ingredient.getImagePath();
        barcode = ingredient.getBarcode();
    }
}
