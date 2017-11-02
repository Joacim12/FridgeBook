//package test;
//
//import com.google.gson.Gson;
//import entity.Ingredient;
//import facade.IngredientFacade;
//import io.restassured.RestAssured;
//import static io.restassured.RestAssured.given;
//import io.restassured.parsing.Parser;
//import static org.hamcrest.CoreMatchers.equalTo;
//import org.junit.Test;
//import org.junit.BeforeClass;
//
//public class IngredientResourceTest {
//
//    private IngredientFacade INGREDIENTFACADE = new IngredientFacade("PU");
//
//    @BeforeClass
//    public static void setUpBeforeAll() {
//        RestAssured.baseURI = "http://localhost";
//        RestAssured.port = 8084;
//        RestAssured.basePath = "/FridgeBook/api/ingredient";
//        RestAssured.defaultParser = Parser.JSON;
//    }
//
//    @Test
//    public void serverIsRunning() {
//        given().when().get().then().statusCode(200);
//    }
//
//    @Test
//    public void testGetIngredientByName() {
//        INGREDIENTFACADE.createIngredient(new Ingredient("Smør", "/image"));
//
//        given()
//                .pathParam("id", "Smør")
//                .when().get("{id}")
//                .then().statusCode(200)
//                .body("name", equalTo("Smør"));
//
//        INGREDIENTFACADE.deleteIngredient("Smør");
//    }
//
//    @Test
//    public void testCreateIngredient() {
//        Ingredient ingredient = new Ingredient("Salat", "/image");
//        given()
//                .contentType("application/json")
//                .body(new Gson().toJson(ingredient))
//                .when().post("/")
//                .then().statusCode(200)
//                .body(equalTo("Created"));
//
//        INGREDIENTFACADE.deleteIngredient("Salat");
//    }
//
//    @Test
//    public void testUpdateIngredient() {
//        INGREDIENTFACADE.createIngredient(new Ingredient("Pizza", "/image"));
//
//        Ingredient ingredient = INGREDIENTFACADE.getIngredientByName("Pizza");
//        ingredient.setImagePath("/image/Pizza.jpg");
//        given()
//                .contentType("application/json")
//                .body(new Gson().toJson(ingredient))
//                .when().put("/")
//                .then().statusCode(200)
//                .body(equalTo("Updated"));
//
//        INGREDIENTFACADE.deleteIngredient("Pizza");
//    }
//}
