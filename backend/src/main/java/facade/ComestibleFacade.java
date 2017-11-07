package facade;

import entity.Comestible;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.RollbackException;

public class ComestibleFacade {

    private final EntityManagerFactory EMF;

    public ComestibleFacade(String persistenceUnit) {
        this.EMF = Persistence.createEntityManagerFactory(persistenceUnit);
    }

    private EntityManager getEntityManager() {
        return EMF.createEntityManager();
    }

    public Comestible getComestible(int id) {
        return getEntityManager().find(Comestible.class, id);
    }

    public List<Comestible> getComestibles() {
        return getEntityManager().createQuery("SELECT c FROM Comestible c", Comestible.class).getResultList();
    }

    public Comestible createComestible(Comestible comestible) {
        EntityManager em = getEntityManager();
        Comestible comestibleInDB = null;
        try {
            em.getTransaction().begin();
            em.persist(comestible);
            em.getTransaction().commit();
            comestibleInDB = em.find(Comestible.class, comestible.getId());
        } catch (RollbackException r) {
            em.getTransaction().rollback();
        } finally {
            em.close();
        }
        return comestibleInDB;
    }

    public Comestible updateComestible(Comestible comestible) {
        EntityManager em = getEntityManager();
        Comestible comestibleInDB = em.find(Comestible.class, comestible.getId());
        try {
            em.getTransaction().begin();
            comestibleInDB = em.merge(comestible);
            em.getTransaction().commit();
        } catch (RollbackException r) {
            em.getTransaction().rollback();
        } finally {
            em.close();
        }
        return comestibleInDB;
    }

    public boolean deleteComestible(int id) {
        EntityManager em = getEntityManager();
        Comestible comestible = em.find(Comestible.class, id);
        try {
            em.getTransaction().begin();
            em.remove(comestible);
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
