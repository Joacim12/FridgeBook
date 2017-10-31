package testData;

import entity.Ingredient;
import entity.IngredientInfo;
import entity.Recipe;
import entity.User;
import facade.IngredientFacade;
import facade.RecipeFacade;
import facade.UserFacade;
import java.util.ArrayList;
import java.util.List;

public class TestData {

    private final UserFacade USERFACADE = new UserFacade("PU");
    private final IngredientFacade INGREDIENTFACADE = new IngredientFacade("PU");
    private final RecipeFacade RECIPEFACADE = new RecipeFacade("PU");

    public static void main(String[] args) {
        new TestData().populateDatabase();
    }

    public void populateDatabase() {
        //Ingredient(String name, String imagePath, IngredientInfo info)
        Ingredient tomat = new Ingredient("tomat", "/imagePath", new IngredientInfo("12/12/2017", "5"));
        tomat.addInfo(new IngredientInfo("31/08/2014", "1"));
        INGREDIENTFACADE.createIngredient(tomat);
        Ingredient ost = new Ingredient("ost", "/imagePath", new IngredientInfo("12/12/2017", "5"));
        INGREDIENTFACADE.createIngredient(ost);
        Ingredient yoghurt = new Ingredient("yoghurt", "/imagePath", null);
        INGREDIENTFACADE.createIngredient(yoghurt);
        Ingredient mælk = new Ingredient("mælk", "/imagePath", null);
        INGREDIENTFACADE.createIngredient(mælk);
        Ingredient aguark = new Ingredient("aguark", "/imagePath", new IngredientInfo("12/12/2017", "5"));
        INGREDIENTFACADE.createIngredient(aguark);

        //Recipe(String name, List<String> imagePaths, String text, List<Ingredient> recipeIngredients
        List<String> imagePaths = new ArrayList();
        imagePaths.add("/image");
        imagePaths.add("/image/2");
        List<Ingredient> recipeIngredients = new ArrayList();
        recipeIngredients.add(mælk);
        recipeIngredients.add(aguark);
        Recipe banankage = new Recipe("banankage", imagePaths, "Tag 1 liter yoghurt og bland med...", recipeIngredients);
        Recipe pandekage = new Recipe("pandekage", imagePaths, "Tag 1 liter yoghurt og bland med...", recipeIngredients);
        Recipe drømmekage = new Recipe("drømmekage", imagePaths, "Tag 1 liter yoghurt og bland med...", null);

        RECIPEFACADE.createRecipe(drømmekage);
        RECIPEFACADE.createRecipe(pandekage);
        RECIPEFACADE.createRecipe(banankage);

        //User(String username, String pin)
        User lars = new User("Lars", "1234");
        User ib = new User("Ib", "9999");
        User gustav = new User("Gustav", "1111");

        lars.addIngredient(aguark);
        lars.addIngredient(mælk);
        lars.addIngredient(tomat);
        ib.addIngredient(aguark);
        ib.addIngredient(mælk);
        gustav.addIngredient(yoghurt);
        gustav.addIngredient(ost);
        gustav.addIngredient(aguark);

        lars.addRecipeCreatedByUser(drømmekage);
        lars.addRecipeCreatedByUser(banankage);
        ib.addRecipeCreatedByUser(pandekage);

        lars.addFavouriteRecipe(drømmekage);
        lars.addFavouriteRecipe(pandekage);
        ib.addFavouriteRecipe(drømmekage);
        gustav.addFavouriteRecipe(drømmekage);
        gustav.addFavouriteRecipe(banankage);
        gustav.addFavouriteRecipe(pandekage);

        USERFACADE.createUser(lars);
        USERFACADE.createUser(ib);
        USERFACADE.createUser(gustav);
    }
}
