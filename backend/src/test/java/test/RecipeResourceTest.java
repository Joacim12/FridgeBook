//package test;
//
//import com.google.gson.Gson;
//import entity.Ingredient;
//import entity.Recipe;
//import facade.RecipeFacade;
//import io.restassured.RestAssured;
//import static io.restassured.RestAssured.given;
//import io.restassured.parsing.Parser;
//import java.util.ArrayList;
//import java.util.List;
//import static org.hamcrest.CoreMatchers.equalTo;
//import org.junit.Test;
//import org.junit.BeforeClass;
//
//public class RecipeResourceTest {
//
//    private RecipeFacade RECIPE_FACADE = new RecipeFacade("PU");
//
//    @BeforeClass
//    public static void setUpBeforeAll() {
//        RestAssured.baseURI = "http://localhost";
//        RestAssured.port = 8084;
//        RestAssured.basePath = "/FridgeBook/api/recipe";
//        RestAssured.defaultParser = Parser.JSON;
//    }
//
//    @Test
//    public void serverIsRunning() {
//        given().when().get().then().statusCode(200);
//    }
//
//    @Test
//    public void testGetIngredientById() {
//        List<String> imagePaths = new ArrayList();
//        imagePaths.add("/image");
//        imagePaths.add("/image/2");
//        imagePaths.add("/image/3");
//        Ingredient jordbær = new Ingredient("Jordbær", "/image");
//        Ingredient choko = new Ingredient("Æg", "/image");
//        List<Ingredient> ingredients = new ArrayList();
//        ingredients.add(jordbær);
//        ingredients.add(choko);
//        Recipe recipe = new Recipe("Lagkage", imagePaths, "Whatever", ingredients);
//        RECIPE_FACADE.createRecipe(recipe);
//
//        given()
//                .pathParam("id", recipe.getId())
//                .when().get("{id}")
//                .then().statusCode(200)
//                .body("id", equalTo(recipe.getId()));
//
//        RECIPE_FACADE.deleteRecipe(recipe.getId());
//    }
//
//    @Test
//    public void testCreateRecipe() {
//        List<String> imagePaths = new ArrayList();
//        imagePaths.add("/image");
//        imagePaths.add("/image/2");
//        imagePaths.add("/image/3");
//        Ingredient jordbær = new Ingredient("Jordbær", "/image");
//        Ingredient choko = new Ingredient("Æg", "/image");
//        List<Ingredient> ingredients = new ArrayList();
//        ingredients.add(jordbær);
//        ingredients.add(choko);
//        Recipe recipe = new Recipe("Lagkage", imagePaths, "Whatever", ingredients);
//        RECIPE_FACADE.createRecipe(recipe);
//
//        given()
//                .contentType("application/json")
//                .body(new Gson().toJson(recipe))
//                .when().post("/")
//                .then().statusCode(200)
//                .body(equalTo("Created"));
//
//        RECIPE_FACADE.deleteRecipe(recipe.getId());
//    }
//
//    @Test
//    public void testUpdateRecipe() {
//        List<String> imagePaths = new ArrayList();
//        imagePaths.add("/image");
//        imagePaths.add("/image/2");
//        imagePaths.add("/image/3");
//        Ingredient jordbær = new Ingredient("Jordbær", "/image");
//        Ingredient choko = new Ingredient("Æg", "/image");
//        List<Ingredient> ingredients = new ArrayList();
//        ingredients.add(jordbær);
//        ingredients.add(choko);
//        Recipe recipe = new Recipe("Lagkage", imagePaths, "Whatever", ingredients);
//        RECIPE_FACADE.createRecipe(recipe);
//
//        Recipe recipeInDB = RECIPE_FACADE.getRecipeById(recipe.getId());
//        recipeInDB.setName("Iskage");
//        given()
//                .contentType("application/json")
//                .body(new Gson().toJson(recipeInDB))
//                .when().put("/")
//                .then().statusCode(200)
//                .body(equalTo("Updated"));
//
//        RECIPE_FACADE.deleteRecipe(recipe.getId());
//    }
//
//    @Test
//    public void testDeleteRecipe() {
//        List<String> imagePaths = new ArrayList();
//        imagePaths.add("/image");
//        imagePaths.add("/image/2");
//        imagePaths.add("/image/3");
//        Ingredient jordbær = new Ingredient("Jordbær", "/image");
//        Ingredient choko = new Ingredient("Æg", "/image");
//        List<Ingredient> ingredients = new ArrayList();
//        ingredients.add(jordbær);
//        ingredients.add(choko);
//        Recipe recipe = new Recipe("Lagkage", imagePaths, "Whatever", ingredients);
//        RECIPE_FACADE.createRecipe(recipe);
//
//        given()
//                .pathParam("id", recipe.getId())
//                .when().delete("{id}")
//                .then().statusCode(200)
//                .body(equalTo("Deleted"));
//    }
//}
