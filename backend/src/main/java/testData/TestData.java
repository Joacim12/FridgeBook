package testData;

import entity.Ingredient;
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
        //Ingredient(String name, String imagePath, String expiryDate, String amount)
        Ingredient tomat = new Ingredient("tomat", "/imagePath", "12/12/2017", "5");
        Ingredient ost = new Ingredient("ost", "/imagePath", "22/01/2017", "1");
        Ingredient yoghurt = new Ingredient("yoghurt", "/imagePath", "01/12/2017", "3");
        Ingredient mælk = new Ingredient("mælk", "/imagePath", "01/12/2017", "4");
        Ingredient aguark = new Ingredient("aguark", "/imagePath", "31/11/2017", "2");
        Ingredient juice = new Ingredient("juice", "/imagePath", "21/12/2017", "3");

        //Recipe(String name, List<String> imagePaths, String text, List<Ingredient> recipeIngredients)
        List<String> imagePaths = new ArrayList();
        imagePaths.add("/image");
        imagePaths.add("/image/2");
        imagePaths.add("/image/3");
        List<Ingredient> recipeIngredients = new ArrayList();
        recipeIngredients.add(tomat);
        recipeIngredients.add(ost);
        Recipe banankage = new Recipe("banankage", imagePaths, "Tag 1 liter yoghurt og bland med...", recipeIngredients);
        Recipe pandekage = new Recipe("pandekage", imagePaths, "Tag 1 liter yoghurt og bland med...", null);
        Recipe drømmekage = new Recipe("drømmekage", imagePaths, "Tag 1 liter yoghurt og bland med...", null);
        Recipe æblekage = new Recipe("æblekage", imagePaths, "Tag 1 liter yoghurt og bland med...", null);
        Recipe chokoladekage = new Recipe("chokoladekage", imagePaths, "Tag 1 liter yoghurt og bland med...", null);

        //User(String username, String pin)
        User lars = new User("Lars", "1234");
        User ib = new User("Ib", "9999");
        User gustav = new User("Gustav", "1111");

        lars.addIngredient(aguark);
        lars.addIngredient(juice);
        ib.addIngredient(mælk);

        lars.addRecipeCreatedByUser(drømmekage);
        lars.addRecipeCreatedByUser(banankage);
        ib.addRecipeCreatedByUser(pandekage);

        lars.addFavouriteRecipe(drømmekage);
        lars.addFavouriteRecipe(pandekage);
        ib.addFavouriteRecipe(drømmekage);
        gustav.addFavouriteRecipe(drømmekage);
        gustav.addFavouriteRecipe(banankage);
        gustav.addFavouriteRecipe(pandekage);
        gustav.addFavouriteRecipe(æblekage);
        gustav.addFavouriteRecipe(chokoladekage);
        
        USERFACADE.createUser(lars);
        USERFACADE.createUser(ib);
        USERFACADE.createUser(gustav);
        
//        INGREDIENTFACADE.createIngredient(mælk);
//        INGREDIENTFACADE.createIngredient(aguark);
//        INGREDIENTFACADE.createIngredient(juice);
    }
}
