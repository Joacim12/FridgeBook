package jsonMapper;

import entity.Ingredient;

public class JsonIngredient {

    private String name;
    private String imagePath;
    private String addedDate;
    private String expiryDate;
    private String amount;

    public JsonIngredient(Ingredient ingredient) {
        name = ingredient.getName();
        imagePath = ingredient.getImagePath();
        addedDate = ingredient.getAddedDate();
        expiryDate = ingredient.getExpiryDate();
        amount = ingredient.getAmount();
    }

}
