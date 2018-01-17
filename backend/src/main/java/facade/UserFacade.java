package facade;

import entity.User;
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
//            updateUser(user);
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
