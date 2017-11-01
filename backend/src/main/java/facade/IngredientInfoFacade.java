package facade;

import entity.Ingredient;
import entity.IngredientInfo;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.RollbackException;

public class IngredientInfoFacade {

    private final EntityManagerFactory EMF;

    public IngredientInfoFacade(String persistenceUnit) {
        this.EMF = Persistence.createEntityManagerFactory(persistenceUnit);
    }

    private EntityManager getEntityManager() {
        return EMF.createEntityManager();
    }

//    public Ingredient getIngredientByName(String name) {
//        return getEntityManager().find(Ingredient.class, name);
//    }
    
    public IngredientInfo createIngredientInfo(IngredientInfo ingredientInfo) {
        EntityManager em = getEntityManager();
        IngredientInfo ingredientInfoInDB = null;
        try {
            em.getTransaction().begin();
            em.persist(ingredientInfo);
            em.getTransaction().commit();
            ingredientInfoInDB = em.find(IngredientInfo.class, ingredientInfo.getId());
        } catch (RollbackException r) {
            em.getTransaction().rollback();
        } finally {
            em.close();
        }
        return ingredientInfoInDB;
    }

//    public Ingredient updateIngredient(Ingredient ingredient) {
//        EntityManager em = getEntityManager();
//        Ingredient ingredientInDB = em.find(Ingredient.class, ingredient.getName());
//        try {
//            em.getTransaction().begin();
//            ingredientInDB = em.merge(ingredient);
//            em.getTransaction().commit();
//        } catch (RollbackException r) {
//            em.getTransaction().rollback();
//        } finally {
//            em.close();
//        }
//        return ingredientInDB;
//    }
//
//    public boolean deleteIngredient(String name) {
//        EntityManager em = getEntityManager();
//        Ingredient ingredient = em.find(Ingredient.class, name);
//        try {
//            em.getTransaction().begin();
//            em.remove(ingredient);
//            em.getTransaction().commit();
//        } catch (RollbackException r) {
//            em.getTransaction().rollback();
//            return false;
//        } finally {
//            em.close();
//        }
//        return true;
//    }
}
