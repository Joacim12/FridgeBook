//package test;
//
//import com.google.gson.Gson;
//import entity.User;
//import facade.UserFacade;
//import io.restassured.RestAssured;
//import static io.restassured.RestAssured.given;
//import io.restassured.parsing.Parser;
//import static org.hamcrest.CoreMatchers.equalTo;
//import org.junit.Test;
//import org.junit.BeforeClass;
//
//public class UserResourceTest {
//
//    private UserFacade USERFACADE = new UserFacade("PU");
//
//    @BeforeClass
//    public static void setUpBeforeAll() {
//        RestAssured.baseURI = "http://localhost";
//        RestAssured.port = 8084;
//        RestAssured.basePath = "/FridgeBook/api/user";
//        RestAssured.defaultParser = Parser.JSON;
//    }
//
//    @Test
//    public void serverIsRunning() {
//        given().when().get().then().statusCode(200);
//    }
//
//    @Test
//    public void testGetUserById() {
//        USERFACADE.createUser(new User("Ole", "3333"));
//
//        given()
//                .pathParam("id", "Ole")
//                .when().get("{id}")
//                .then().statusCode(200)
//                .body("username", equalTo("Ole"));
//
//        USERFACADE.deleteUser("Ole");
//    }
//
//    @Test
//    public void testCreateUser() {
//        User user = new User("Hans", "1212");
//        given()
//                .contentType("application/json")
//                .body(new Gson().toJson(user))
//                .when().post("/")
//                .then().statusCode(200)
//                .body(equalTo("Created"));
//
//        USERFACADE.deleteUser("Hans");
//    }
//
//    @Test
//    public void testUpdateUser() {
//        USERFACADE.createUser(new User("Bob", "3221"));
//
//        User user = USERFACADE.getUserById("Bob");
//        user.setPin("1234");
//        given()
//                .contentType("application/json")
//                .body(new Gson().toJson(user))
//                .when().put("/")
//                .then().statusCode(200)
//                .body(equalTo("Updated"));
//
//        USERFACADE.deleteUser("Bob");
//    }
//
//    @Test
//    public void testDeleteUser() {
//        USERFACADE.createUser(new User("Kaj", "3221"));
//
//        given()
//                .pathParam("id", "Kaj")
//                .when().delete("{id}")
//                .then().statusCode(200)
//                .body(equalTo("Deleted"));
//    }
//}
