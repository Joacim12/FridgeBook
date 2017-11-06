package facade;

import entity.Ingredient;
import entity.IngredientInfo;
import entity.MyUser;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

/**
 *
 * @author joaci
 */
public class UserFacade {

    EntityManagerFactory emf;

    public static void main(String[] args) {
        new UserFacade("PU").starter();
    }

    private void starter() {

//        Ingredient i = new Ingredient();
//        i.setName("MÆLK");
//        createIngredient(i);
//        
//        MyUser user = new MyUser();
//        user.setName("joacim");
//        user.setPin(1234);
//        IngredientInfo ing = new IngredientInfo();
//        ing.setExpiryDate("I MORGEN");
//        Ingredient in = getIngredient(1L);
//        ing.setIngredient(in);
//        user.setIngredientInfo(new ArrayList());
//        user.getIngredientInfo().add(ing);
//        createUser(user);
//        
//        user = new MyUser();
//        user.setName("Zaeem");
//        user.setPin(4321);
//        ing = new IngredientInfo();
//        ing.setExpiryDate("I DAG");
//        in = getIngredient(1L);
//        ing.setIngredient(in);
//        user.setIngredientInfo(new ArrayList());
//        user.getIngredientInfo().add(ing);
//        createUser(user);
//        IngredientInfo i = new IngredientInfo();
//        i.setIngredient(getIngredient(2L));
//        i.setExpiryDate("SNART");
//        MyUser u = getUser(1L);
//        u.getIngredientInfo().add(i);
//        updateUser(u);
        System.out.println(getUser(1L));
        System.out.println(getUser(2L));
    }

    public void updateUser(MyUser u) {
        EntityManager em = getEntityManager();
        em.getTransaction().begin();
        em.merge(u);
        em.getTransaction().commit();
        em.close();
    }

    public Ingredient getIngredient(Long id) {
        EntityManager em = getEntityManager();
        return em.find(Ingredient.class, id);
    }

    public MyUser getUser(Long id) {
        EntityManager em = getEntityManager();
        return em.find(MyUser.class, id);
    }

    public void createIngredientInfo(IngredientInfo ingredientInfo) {
        EntityManager em = getEntityManager();
        em.getTransaction().begin();
        em.persist(ingredientInfo);
        em.getTransaction().commit();
        em.close();
    }

    public void createIngredient(Ingredient ingredient) {
        EntityManager em = getEntityManager();
        em.getTransaction().begin();
        em.persist(ingredient);
        em.getTransaction().commit();
        em.close();
    }

    public void createUser(MyUser user) {
        EntityManager em = getEntityManager();
        em.getTransaction().begin();
        em.persist(user);
        em.getTransaction().commit();
        em.close();
    }

    public UserFacade(String persistence) {
        this.emf = Persistence.createEntityManagerFactory(persistence);
    }

    private EntityManager getEntityManager() {
        return emf.createEntityManager();
    }

}
