package facade;

import entity.Category;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.RollbackException;

/**
 *
 * @author joaci
 */
public class CategoryFacade {

    private final EntityManagerFactory EMF;

    public CategoryFacade(String persistenceUnit) {
        this.EMF = Persistence.createEntityManagerFactory(persistenceUnit);
    }

    private EntityManager getEntityManager() {
        return EMF.createEntityManager();
    }

    public static void main(String[] args) {
        new CategoryFacade("PU").tester();
    }

    public void tester() {
        Category c = new Category();
        c.setIngredients(new ArrayList());
        c.setName("Hvedemel");
        createCategory(c);
//        Category c = getCategory(2l);
//        c.getIngredients().add(new IngredientFacade("PU").getIngredientByName("Økologisk hvedemel"));
//        updateUser(c);
    }

    public Category getCategory(Long id) {
        return getEntityManager().find(Category.class, id);
    }

    public List<Category> getCategories() {
        return getEntityManager().createQuery("SELECT c FROM Comestible c", Category.class).getResultList();
    }

    public void createCategory(Category category) {
        EntityManager em = getEntityManager();
        try {
            em.getTransaction().begin();
            em.persist(category);
            em.getTransaction().commit();
        } finally {
            em.close();
        }
    }

    public Category updateUser(Category category) {
        EntityManager em = getEntityManager();
        Category categoryInDB = em.find(Category.class, category.getId().longValue());
        try {
            em.getTransaction().begin();
            categoryInDB = em.merge(category);
            em.getTransaction().commit();
        } catch (RollbackException r) {
            em.getTransaction().rollback();
        } finally {
            em.close();
        }
        return categoryInDB;
    }

}
