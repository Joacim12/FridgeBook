package jsonMapper;

import entity.IngredientInfo;

public class IngredientInfoJson {

    private int id;
    private String addedDate;
    private String expiryDate;
    private String amount;

    public IngredientInfoJson(IngredientInfo ingredientInfo) {
        id = ingredientInfo.getId();
        addedDate = ingredientInfo.getAddedDate();
        expiryDate = ingredientInfo.getExpiryDate();
        amount = ingredientInfo.getAmount();
    }

}
