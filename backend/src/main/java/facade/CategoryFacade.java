package facade;

import entity.Category;
import entity.Ingredient;
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
//        Category c = new Category();
//        c.setIngredients(new ArrayList());
////Økologisk hvedemel
//        c.setName("Hvedemel");
//        createCategory(c);
//        c.setCategoryAmounts(new ArrayList());
//        Ingredient i = new Ingredient();
//        i.setBarcode("1234");
////        i.setComestible(c);
//        i.setImagePath("1234");
//        i.setName("Øko mel");
//        i.setNewIngredient(true);
//        new IngredientFacade("PU").createIngredient(i);

        Category c = getCategory(1l);
        System.out.println(c.getCategoryAmounts());
//        c.getIngredients().add(new IngredientFacade("PU").getIngredientByName("Økologisk hvedemel"));
//        updateCategory(c);
//        updateUser(c);
//        System.out.println(getCategories());
    }

    public Category getCategory(Long id) {
        return getEntityManager().find(Category.class, id);
    }

    public List<Category> getCategories() {
        return getEntityManager().createQuery("SELECT c FROM Category c", Category.class).getResultList();
    }

    public Category createCategory(Category category) {
        EntityManager em = getEntityManager();
        try {
            em.getTransaction().begin();
            em.persist(category);
            em.getTransaction().commit();
        } finally {
            em.close();
        }
        return category;
    }

    public Category updateCategory(Category category) {
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
