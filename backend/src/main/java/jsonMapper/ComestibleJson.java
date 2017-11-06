package jsonMapper;

import entity.Comestible;

public class ComestibleJson {

    private int id;
    private String addedDate;
    private String expiryDate;
    private String amount;
    private IngredientJson ingredient;

    public ComestibleJson(Comestible comestible) {
        id = comestible.getId();
        addedDate = comestible.getAddedDate();
        expiryDate = comestible.getExpiryDate();
        amount = comestible.getAmount();
        ingredient = new IngredientJson(comestible.getIngredient());
    }
}
