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

    private EntityManagerFactory emf;

    public RecipeFacade(String persistenceUnit) {
        this.emf = Persistence.createEntityManagerFactory(persistenceUnit);
    }

    private EntityManager getEntityManager() {
        return emf.createEntityManager();
    }

    public static void main(String[] args) {
        new RecipeFacade("PU").starter();
    }

    private void starter() {
        Ingredient banan = new Ingredient("banan", "2");
        List<Ingredient> ingredients = new ArrayList();
        ingredients.add(banan);
        User user = new User("Hans", "1234");
        createRecipe(new Recipe("Banankage", "Tag to bananer og bland dem med med mælk...", user, ingredients));
    }

    public Recipe getRecipeById(int id) {
        return getEntityManager().find(Recipe.class, id);
    }

    public List<Recipe> getRecipes() {
        return getEntityManager().createQuery("SELECT r FROM User r", Recipe.class).getResultList();
    }

    public Recipe createRecipe(Recipe recipe) {
        EntityManager em = getEntityManager();
        try {
            em.getTransaction().begin();
            em.persist(recipe);
            em.getTransaction().commit();
        } catch (RollbackException r) {
            em.getTransaction().rollback();
        } finally {
            em.close();
        }
        return getRecipeById(recipe.getId());
    }

    public Recipe updateRecipe(Recipe recipe) {
        EntityManager em = getEntityManager();
        Recipe recipeInDB = getRecipeById(recipe.getId());
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
        Recipe recipe = getRecipeById(id);
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
