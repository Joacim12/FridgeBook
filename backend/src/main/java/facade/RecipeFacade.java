package facade;

import entity.Category;
import entity.Ingredient;
import entity.Recipe;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.RollbackException;

public class RecipeFacade {

    private final EntityManagerFactory EMF;

    public static void main(String[] args) {
        new RecipeFacade("PU").start();
    }

    public void start() {
        List<String> paths = new ArrayList();
        
        paths.add("https://vetterlain.dk/images/fridgebook/pandekage.jpg");
        paths.add("https://vetterlain.dk/images/fridgebook/029e06c3-4c5a-428b-8cb0-5f439523ea25.jpg");
        Recipe r = new Recipe();
        r.setImagePaths(paths);
        r.setName("Pandekager");
        r.setNote("Pandekager bagt med øl");
        r.setText("bla");
        r.setRateCounter(0);
        List<Category> l = new ArrayList();
        l.add(new CategoryFacade("PU").getCategory(1L));
        l.forEach(la->{System.out.println(la.getName());});
        r.setRecipeIngredients(l);
//        System.out.println(r.getRecipeIngredients());
//        r.setName("Pandekager");
//        r.setRateCounter(0);
//        r.setNote("Den lækreste drømmekage!");
//        r.setText("Lækre pandekager bagt med øl");
//        r.setImagePaths(paths);
        createRecipe(r);
    }

    public RecipeFacade(String persistenceUnit) {
        this.EMF = Persistence.createEntityManagerFactory(persistenceUnit);
    }

    private EntityManager getEntityManager() {
        return EMF.createEntityManager();
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
