package entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

@Entity
public class User implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    private String username;
    @Column(nullable = false)
    private String pin;
    @JoinColumn
    @OneToMany
    private List<Recipe> recipesCreatedByUser;
    @ManyToMany
    private List<Recipe> favouriteRecipes;
    @ManyToMany
    private List<Ingredient> comestibles;

    public User() {
    }

    public User(String username, String pin) {
        this.username = username;
        this.pin = pin;
        recipesCreatedByUser = new ArrayList();
        favouriteRecipes = new ArrayList();
        comestibles = new ArrayList();
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

    public List<Ingredient> getComestibles() {
        return comestibles;
    }

    public void setComestibles(List<Ingredient> comestibles) {
        this.comestibles = comestibles;
    }

    public void addComestible(Ingredient comestible) {
        comestibles.add(comestible);
    }

    public void removeComestible(Ingredient comestible) {
        comestibles.remove(comestible);
    }

    public List<Recipe> getFavouriteRecipes() {
        return favouriteRecipes;
    }

    public void setFavouriteRecipes(List<Recipe> favouriteRecipes) {
        this.favouriteRecipes = favouriteRecipes;
    }

    public void addFavouriteRecipe(Recipe recipe) {
        favouriteRecipes.add(recipe);
    }

    @Override
    public String toString() {
        return "User{" + "username=" + username + ", pin=" + pin + ", recipesCreatedByUser=" + recipesCreatedByUser + ", favouriteRecipes=" + favouriteRecipes + ", comestibles=" + comestibles + '}';
    }
}
