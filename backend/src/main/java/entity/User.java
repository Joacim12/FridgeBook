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
    @ManyToMany
    private List<Ingredient> ingredients;
    @ManyToMany(mappedBy = "hasRatedUsers")
    private List<Recipe> favouriteRecipes;

    public User() {
    }

    public User(String userName, String pin) {
        this.userName = userName;
        this.pin = pin;
        ingredients = new ArrayList();
        recipes = new ArrayList();
        favouriteRecipes = new ArrayList();
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

    public List<Recipe> getRecipes() {
        return recipes;
    }

    public void setRecipes(List<Recipe> recipes) {
        this.recipes = recipes;
    }

    public List<Ingredient> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }

    public void addIngredient(Ingredient ingredient) {
        ingredients.add(ingredient);
    }

    public List<Recipe> getFavouriteRecipes() {
        return favouriteRecipes;
    }

    public void setFavouriteRecipes(List<Recipe> favouriteRecipes) {
        this.favouriteRecipes = favouriteRecipes;
    }

    @Override
    public String toString() {
        return "User{" + "userName=" + userName + ", pin=" + pin + ", recipes=" + recipes + ", ingredients=" + ingredients + ", favouriteRecipes=" + favouriteRecipes + '}';
    }

}
