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
    private List<Ingredient> userIngredients;
    @ManyToMany
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

    public void removeIngredient(Ingredient ingredient) {
        userIngredients.remove(ingredient);
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

}
