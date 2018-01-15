//package model;
//
//import entity.Category;
//import entity.Ingredient;
//import entity.Recipe;
//import entity.User;
//import facade.CategoryFacade;
//import facade.IngredientFacade;
//import facade.RecipeFacade;
//import facade.UserFacade;
//import java.util.ArrayList;
//import java.util.List;
//
///**
// *
// * @author joacim
// */
//public class RecipeSort {
//
//    RecipeFacade rFacade = new RecipeFacade("PU");
//    CategoryFacade cFacade = new CategoryFacade("PU");
//    IngredientFacade iFacade = new IngredientFacade("PU");
//    UserFacade uFacade = new UserFacade("PU");
//
//    public static void main(String[] args) {
//        new RecipeSort().start();
//    }
//
//    public void start() {
////        List<Recipe> recipes = rFacade.getRecipes();
//        List<Category> categories = cFacade.getCategories();
////        List<Ingredient> ingredients = iFacade.getIngredients();
////
//        User u = uFacade.getUserById("10156074410491118");
//        Ingredient i = iFacade.getIngredientByName("Brunchy bacon");
//
//        List<String> result = new ArrayList();
//
//        for (Category category : categories) {
//            for (Ingredient ingredient : category.getIngredients()) {
//                if (ingredient.getName().equals(i.getName())) {
//                    category.getCategoryAmounts().forEach(amount -> {
//                        System.out.println(
//                                amount.getRecipe().getName()
//                        );
//                    });
////                    System.out.println(category.getCategoryAmounts());
//                }
//            }
//
////        for (Recipe recipe : recipes) {
////            for (Category category : categories) {
////                category.getIngredients().forEach(ingredient -> {
////                    if (ingredient.getName().equals(i.getName())) {
////                        System.out.println("----------------------------");
////                        System.out.println("Recipe with: Økologisk hvedemel");
////                        System.out.println(recipe.getName());
////                    }
////                });
////                category.getCategoryAmounts().forEach(amount->{
////                    if(amount.recipe.getId()==i.get)
////                });
//        }
//    }
//
////        for (Category category : categories) {
////            category.getCategoryAmounts().forEach(amount -> {
////                for (Recipe recipe : recipes) {
////                    if (recipe.getId() == amount.getRecipe().getId()) {
//////                        System.out.println(recipe.getId());
////                    }
////                }
////            });
////            for (Ingredient ingredient : category.getIngredients()) {
////                System.out.println(ingredient.getName());
////                System.out.println(category.getId());
////            }
////            System.out.println(category.getIngredients());
//}
//
//}
//
//}
