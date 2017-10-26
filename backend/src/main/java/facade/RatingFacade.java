package facade;

import entity.Rating;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.RollbackException;

public class RatingFacade {

    private EntityManagerFactory emf;

    public RatingFacade(String persistenceUnit) {
        this.emf = Persistence.createEntityManagerFactory(persistenceUnit);
    }

    private EntityManager getEntityManager() {
        return emf.createEntityManager();
    }

    public static void main(String[] args) {
        new RatingFacade("PU").starter();
    }

    private void starter() {
        createRating(new Rating());
    }

    public Rating getRatingById(int id) {
        return getEntityManager().find(Rating.class, id);
    }

    public List<Rating> getRatings() {
        return getEntityManager().createQuery("SELECT r FROM User r", Rating.class).getResultList();
    }

    public Rating createRating(Rating rating) {
        EntityManager em = getEntityManager();
        try {
            em.getTransaction().begin();
            em.persist(rating);
            em.getTransaction().commit();
        } catch (RollbackException r) {
            em.getTransaction().rollback();
        } finally {
            em.close();
        }
        return getRatingById(rating.getId());
    }

    public Rating updateRating(Rating rating) {
        EntityManager em = getEntityManager();
        Rating ratingInDB = getRatingById(rating.getId());
        try {
            em.getTransaction().begin();
            ratingInDB = em.merge(rating);
            em.getTransaction().commit();
        } catch (RollbackException r) {
            em.getTransaction().rollback();
        } finally {
            em.close();
        }
        return ratingInDB;
    }

    public boolean deleteRating(int id) {
        EntityManager em = getEntityManager();
        Rating rating = getRatingById(id);
        try {
            em.getTransaction().begin();
            em.remove(rating);
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
