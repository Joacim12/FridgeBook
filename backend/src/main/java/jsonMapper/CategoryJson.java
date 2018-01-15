package jsonMapper;

import entity.Category;
import entity.CategoryAmount;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author joacim
 */
public class CategoryJson {

    private Long id;
    private String name;
    private Boolean isNew = true;
    private List<IngredientJson> ingredients;
    private List<CategoryAmountJson> amounts;

    public CategoryJson(Category category) {
        id = category.getId();
        name = category.getName();
        isNew = category.getIsNew();
        ingredients = new ArrayList();
        amounts = new ArrayList();

        category.getIngredients().forEach(ingredient -> {
            ingredients.add(new IngredientJson(ingredient));
        });

        category.getCategoryAmounts().forEach(amount -> {
            amounts.add(new CategoryAmountJson(amount));
        });

    }
}
