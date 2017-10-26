package entity;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

@Entity
public class Rating implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private int counter;
    @ManyToMany
    private List<User> hasRated;

    public Rating() {
        counter = 0;
    }

    public Rating(User hasRatedUser) {
        counter = 0;
        hasRated.add(hasRatedUser);
    }

    public Integer getId() {
        return id;
    }
    
    public int getCounter() {
        return counter;
    }

    public void setCounter(int counter) {
        this.counter = counter;
    }

    public List<User> getHasRated() {
        return hasRated;
    }

    public void setHasRated(List<User> hasRated) {
        this.hasRated = hasRated;
    }

    public void addRater(User user) {
        hasRated.add(user);
    }

    @Override
    public String toString() {
        return "Rating{" + "id=" + id + ", counter=" + counter + ", hasRated=" + hasRated + '}';
    }
    
}
