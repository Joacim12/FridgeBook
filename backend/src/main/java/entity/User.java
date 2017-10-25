package entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

@Entity
public class User implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    private String userName;
    private String pin;
    @JoinColumn
    @OneToMany(mappedBy = "user")
    private List<Recipe> recipes;
    @ManyToMany(mappedBy = "hasRated")
    private List<Rating> ratings;
    @ManyToMany
    private List<Ingredient> ingredients;

    public User() {

    }

    public User(String userName, String pin) {
        this.userName = userName;
        this.pin = pin;
        ingredients = new ArrayList();
        recipes = new ArrayList();
        ratings = new ArrayList();
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPin() {
        return pin;
    }

    public void setPin(String pin) {
        this.pin = pin;
    }

    public List<Ingredient> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }

    public List<Recipe> getRecipes() {
        return recipes;
    }

    public void setRecipes(List<Recipe> recipes) {
        this.recipes = recipes;
    }

    public List<Rating> getRatings() {
        return ratings;
    }

    public void setRatings(List<Rating> ratings) {
        this.ratings = ratings;
    }

    @Override
    public String toString() {
        return "User{" + "userName=" + userName + ", pin=" + pin + ", ingredients=" + ingredients + ", recipes=" + recipes + ", ratings=" + ratings + '}';
    }

}
