package facade;

import entity.Ingredient;
import entity.Recipe;
import entity.User;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.RollbackException;

public class RecipeFacade {

    private final EntityManagerFactory EMF;

    public RecipeFacade(String persistenceUnit) {
        this.EMF = Persistence.createEntityManagerFactory(persistenceUnit);
    }

    private EntityManager getEntityManager() {
        return EMF.createEntityManager();
    }

    public static void main(String[] args) {
        new RecipeFacade("PU").starter();
    }

    private void starter() {
        Ingredient æg = new Ingredient("Æg", "/imagepath", "20/10/2017", "1");
        List<Ingredient> ingredients = new ArrayList();
        ingredients.add(æg);
        User user = new UserFacade("PU").getUserById("Lars");
        //String name, List<String> imagePaths, String text, List<Ingredient> recipeIngredients
        createRecipe(new Recipe("Banankage", null, "Tag to bananer og bland dem med med æg", ingredients));
    }

    public Recipe getRecipeById(int id) {
        return getEntityManager().find(Recipe.class, id);
    }

    public List<Recipe> getRecipes() {
        return getEntityManager().createQuery("SELECT r FROM Recipe r", Recipe.class).getResultList();
    }

    public Recipe createRecipe(Recipe recipe) {
        EntityManager em = getEntityManager();
        Recipe recipeInDB = null;
        try {
            em.getTransaction().begin();
            em.persist(recipe);
            em.getTransaction().commit();
            recipeInDB = em.find(Recipe.class, recipe.getId());
        } catch (RollbackException r) {
            em.getTransaction().rollback();
        } finally {
            em.close();
        }
        return recipeInDB;
    }

    public Recipe updateRecipe(Recipe recipe) {
        EntityManager em = getEntityManager();
        Recipe recipeInDB = em.find(Recipe.class, recipe.getId());
        try {
            em.getTransaction().begin();
            recipeInDB = em.merge(recipe);
            em.getTransaction().commit();
        } catch (RollbackException r) {
            em.getTransaction().rollback();
        } finally {
            em.close();
        }
        return recipeInDB;
    }

    public boolean deleteRecipe(int id) {
        EntityManager em = getEntityManager();
        Recipe recipe = em.find(Recipe.class, id);
        try {
            em.getTransaction().begin();
            em.remove(recipe);
            em.getTransaction().commit();
        } catch (RollbackException r) {
            em.getTransaction().rollback();
            return false;
        } finally {
            em.close();
        }
        return true;
    }
}
