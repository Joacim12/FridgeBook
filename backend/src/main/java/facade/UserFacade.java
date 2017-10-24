package facade;

import entity.User;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

/**
 *
 * @author Joacim
 */
public class UserFacade {

    private EntityManagerFactory emf;

    public UserFacade(String persistenceUnit) {
        this.emf = Persistence.createEntityManagerFactory(persistenceUnit);
    }

    public static void main(String[] args) {
        new UserFacade("PU").starter();
    }

    private void starter() {
        User u = new User();
        u.setPin("1234");
        u.setUserName("Joacim");
        addUser(u);
    }

    public User addUser(User u) {
        EntityManager em = emf.createEntityManager();
        try {
            em.getTransaction().begin();
            em.persist(u);
            em.getTransaction().commit();
            return u;
        } finally {
            em.close();
        }
    }
}
