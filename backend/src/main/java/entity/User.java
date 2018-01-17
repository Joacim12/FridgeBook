package entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
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
    private String fbName;
    @JoinColumn
    @OneToMany(fetch = FetchType.EAGER)
    private List<Recipe> recipesCreatedByUser;
    @ManyToMany(fetch = FetchType.EAGER)
    private List<Recipe> favouriteRecipes;
    @JoinColumn
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    private List<Comestible> comestibles;

    public User() {
    }

    public User(String username, String pin) {
        this.username = username;
        this.pin = pin;
        recipesCreatedByUser = new ArrayList();
        favouriteRecipes = new ArrayList();
        comestibles = new ArrayList();
    }

    public String getFbName() {
        return fbName;
    }

    public void setFbName(String fbName) {
        this.fbName = fbName;
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

    public void addRecipeCreatedByUser(Recipe recipe) {
        recipesCreatedByUser.add(recipe);
    }

    public List<Recipe> getFavouriteRecipes() {
        return favouriteRecipes;
    }

    public void addFavouriteRecipe(Recipe recipe) {
        favouriteRecipes.add(recipe);
    }

    public List<Comestible> getComestibles() {
        return comestibles;
    }

    public void addComestible(Comestible comestible) {
        comestibles.add(comestible);
    }

    @Override
    public String toString() {
        return "User{" + "username=" + username + ", pin=" + pin + ", recipesCreatedByUser=" + recipesCreatedByUser + ", favouriteRecipes=" + favouriteRecipes + ", comestibles=" + comestibles + '}';
    }

}
