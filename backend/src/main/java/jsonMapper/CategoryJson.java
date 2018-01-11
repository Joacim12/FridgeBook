package jsonMapper;

import entity.Category;
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

    public CategoryJson(Category category) {
        id = category.getId();
        name = category.getName();
        isNew = category.getIsNew();
        ingredients = new ArrayList();

        category.getIngredients().forEach(ingredient -> {
            ingredients.add(new IngredientJson(ingredient));
        });
    }
}
