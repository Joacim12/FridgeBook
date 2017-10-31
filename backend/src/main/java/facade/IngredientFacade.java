package facade;

import entity.Ingredient;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.RollbackException;

public class IngredientFacade {

    private final EntityManagerFactory EMF;

    public IngredientFacade(String persistenceUnit) {
        this.EMF = Persistence.createEntityManagerFactory(persistenceUnit);
    }

    private EntityManager getEntityManager() {
        return EMF.createEntityManager();
    }

    public Ingredient getIngredientByName(String name) {
        return getEntityManager().find(Ingredient.class, name);
    }

    public List<Ingredient> getIngredients() {
        return getEntityManager().createQuery("SELECT i FROM Ingredient i", Ingredient.class).getResultList();
    }

    public Ingredient createIngredient(Ingredient ingredient) {
        EntityManager em = getEntityManager();
        ingredient.setName(ingredient.getName().substring(0, 1).toUpperCase() + ingredient.getName().substring(1).toLowerCase());
        Ingredient ingredientInDB = null;
        try {
            em.getTransaction().begin();
            em.persist(ingredient);
            em.getTransaction().commit();
            ingredientInDB = em.find(Ingredient.class, ingredient.getName());
        } catch (RollbackException r) {
            em.getTransaction().rollback();
        } finally {
            em.close();
        }
        return ingredientInDB;
    }

    public Ingredient updateIngredient(Ingredient ingredient) {
        EntityManager em = getEntityManager();
        Ingredient ingredientInDB = em.find(Ingredient.class, ingredient.getName());
        try {
            em.getTransaction().begin();
            ingredientInDB = em.merge(ingredient);
            em.getTransaction().commit();
        } catch (RollbackException r) {
            em.getTransaction().rollback();
        } finally {
            em.close();
        }
        return ingredientInDB;
    }

    public boolean deleteIngredient(String name) {
        EntityManager em = getEntityManager();
        Ingredient ingredient = em.find(Ingredient.class, name);
        try {
            em.getTransaction().begin();
            em.remove(ingredient);
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
