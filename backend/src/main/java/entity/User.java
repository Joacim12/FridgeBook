package entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

@Entity
public class User implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    private String username;
    private String pin;
    @JoinColumn
    @OneToMany(cascade = {CascadeType.ALL}, fetch = FetchType.EAGER)
    private List<Recipe> recipesCreatedByUser;
    @JoinColumn
    @OneToMany(cascade = {CascadeType.ALL}, fetch = FetchType.EAGER)
    private List<Ingredient> userIngredients;
    @JoinColumn
    @OneToMany(cascade = {CascadeType.ALL}, fetch = FetchType.EAGER)
    private List<Recipe> favouriteRecipes;

    public User() {
    }

    public User(String username, String pin) {
        this.username = username;
        this.pin = pin;
        userIngredients = new ArrayList();
        recipesCreatedByUser = new ArrayList();
        favouriteRecipes = new ArrayList();
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPin() {
        return pin;
    }

    public void setPin(String pin) {
        this.pin = pin;
    }

    public List<Recipe> getRecipesCreatedByUser() {
        return recipesCreatedByUser;
    }

    public void setRecipesCreatedByUser(List<Recipe> recipesCreatedByUser) {
        this.recipesCreatedByUser = recipesCreatedByUser;
    }

    public void addRecipeCreatedByUser(Recipe recipe) {
        recipesCreatedByUser.add(recipe);
    }

    public List<Ingredient> getUserIngredients() {
        return userIngredients;
    }

    public void setUserIngredients(List<Ingredient> userIngredients) {
        this.userIngredients = userIngredients;
    }

    public void addIngredient(Ingredient ingredient) {
        userIngredients.add(ingredient);
    }

    public List<Recipe> getFavouriteRecipes() {
        return favouriteRecipes;
    }

    public void setFavouriteRecipes(List<Recipe> favouriteRecipes) {
        this.favouriteRecipes = favouriteRecipes;
    }

    @Override
    public String toString() {
        return "User{" + "username=" + username + ", pin=" + pin + ", recipesCreatedByUser=" + recipesCreatedByUser + ", userIngredients=" + userIngredients + ", favouriteRecipes=" + favouriteRecipes + '}';
    }

}
