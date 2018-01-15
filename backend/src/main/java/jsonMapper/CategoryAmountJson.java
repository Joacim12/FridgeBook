package jsonMapper;

import entity.CategoryAmount;
import entity.Recipe;

/**
 *
 * @author joaci
 */
public class CategoryAmountJson {

    private Long id;
    private RecipeJson recipe;
    private String amount;

    public CategoryAmountJson(CategoryAmount categoryAmount) {
//        System.out.println("fetching");
        this.id = categoryAmount.getId();
        this.amount = categoryAmount.getAmount();
    
        this.recipe = new RecipeJson(categoryAmount.getRecipe());
    
    }

}
