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

public class UserFacade {

    private final EntityManagerFactory EMF;

    public UserFacade(String persistenceUnit) {
        this.EMF = Persistence.createEntityManagerFactory(persistenceUnit);
    }

    private EntityManager getEntityManager() {
        return EMF.createEntityManager();
    }

    public static void main(String[] args) {
        new UserFacade("PU").starter();
    }

    private void starter() {
//        User user = new User("Lars", "1234");
//        List<Ingredient> iList = new ArrayList();
//        iList.add(new Ingredient("Mælk", "26/10/2017", "1"));
//        user.setUserIngredients(iList);
//        user.setFavouriteRecipes(new ArrayList<>());
//        user.setRecipesCreatedByUser(new ArrayList<>());
//        createUser(user);
//        Recipe recipe = new Recipe();
//        recipe.setName("Banankage");
//        recipe.setRecipeIngredients(new IngredientFacade("PU").getIngredients());
//        recipe.setText("Tag to mælk og bland med dit dat");
//        User lars = getUserById("Lars");
//        lars.getFavouriteRecipes().add(recipe);
//        updateUser(lars);
        System.out.println(getUserById("Lars"));
        System.out.println(getUsers());
    }

    public User getUserById(String username) {
        return getEntityManager().find(User.class, username);
    }

    public List<User> getUsers() {
        return getEntityManager().createQuery("SELECT u FROM User u", User.class).getResultList();
    }

    public User createUser(User user) {
        EntityManager em = getEntityManager();
        User userInDB = null;
        try {
            em.getTransaction().begin();
            em.persist(user);
            em.getTransaction().commit();
            userInDB = em.find(User.class, user.getUsername());
        } catch (RollbackException r) {
            em.getTransaction().rollback();
        } finally {
            em.close();
        }
        return userInDB;
    }

    public User updateUser(User user) {
        EntityManager em = getEntityManager();
        User userInDB = em.find(User.class, user.getUsername());
        try {
            em.getTransaction().begin();
            userInDB = em.merge(user);
            em.getTransaction().commit();
        } catch (RollbackException r) {
            em.getTransaction().rollback();
        } finally {
            em.close();
        }
        return userInDB;
    }

    public boolean deleteUser(String username) {
        EntityManager em = getEntityManager();
        User user = em.find(User.class, username);
        try {
            em.getTransaction().begin();
            em.remove(user);
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
