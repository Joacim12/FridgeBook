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

    private final UserFacade USER_FACADE = new UserFacade("PU");
    private final IngredientFacade INGREDIENT_FACADE = new IngredientFacade("PU");
    private final RecipeFacade RECIPE_FACADE = new RecipeFacade("PU");

    public static void main(String[] args) {
        new TestData().populateDatabase();
    }

    public void populateDatabase() {
        //User(String username, String pin)
        User lars = new User("Lars", "1234");
        User ib = new User("Ib", "9999");
        User gustav = new User("Gustav", "1111");
        USER_FACADE.createUser(lars);
        USER_FACADE.createUser(ib);
        USER_FACADE.createUser(gustav);

        //Ingredient(String name, String imagePath)
        Ingredient tomat = new Ingredient("tomat", "/imagePath");
        Ingredient ost = new Ingredient("ost", "/imagePath");
        Ingredient yoghurt = new Ingredient("yoghurt", "/imagePath");
        Ingredient mælk = new Ingredient("mælk", "/imagePath");
        Ingredient aguark = new Ingredient("aguark", "/imagePath");
        INGREDIENT_FACADE.createIngredient(tomat);
        INGREDIENT_FACADE.createIngredient(ost);
        INGREDIENT_FACADE.createIngredient(yoghurt);
        INGREDIENT_FACADE.createIngredient(mælk);
        INGREDIENT_FACADE.createIngredient(aguark);

        //IngredientInfo(String expiryDate, String amount, Ingredient ingredient)
        IngredientInfo tomatInfo = new IngredientInfo("22/04/2018", "6", tomat);
        IngredientInfo mælkInfo = new IngredientInfo("22/04/2018", "6", mælk);
        IngredientInfo ostInfo = new IngredientInfo("22/04/2018", "6", ost);
        tomat.addIngredientInfo(tomatInfo);
        mælk.addIngredientInfo(mælkInfo);
        ost.addIngredientInfo(ostInfo);
        lars.addIngredient(yoghurt);
        ib.addIngredient(ost);
        gustav.addIngredient(mælk);
        
        INGREDIENT_FACADE.updateIngredient(tomat);
        INGREDIENT_FACADE.updateIngredient(ost);
        INGREDIENT_FACADE.updateIngredient(yoghurt);
        INGREDIENT_FACADE.updateIngredient(mælk);
        INGREDIENT_FACADE.updateIngredient(aguark);

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

        RECIPE_FACADE.createRecipe(drømmekage);
        RECIPE_FACADE.createRecipe(pandekage);
        RECIPE_FACADE.createRecipe(banankage);

        lars.addRecipeCreatedByUser(drømmekage);
        lars.addRecipeCreatedByUser(banankage);
        ib.addRecipeCreatedByUser(pandekage);

        lars.addFavouriteRecipe(drømmekage);
        lars.addFavouriteRecipe(pandekage);
        ib.addFavouriteRecipe(drømmekage);
        gustav.addFavouriteRecipe(drømmekage);
        gustav.addFavouriteRecipe(banankage);
        gustav.addFavouriteRecipe(pandekage);

        USER_FACADE.updateUser(lars);
        USER_FACADE.updateUser(ib);
        USER_FACADE.updateUser(gustav);
    }
}
