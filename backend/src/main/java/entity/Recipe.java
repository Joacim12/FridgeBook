package entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

@Entity
public class Recipe implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private int rateCounter;
    private List<String> imagePaths;
    @Lob
    private String text;
    @ManyToOne
    private User createdByUser;
    @ManyToMany(cascade = {CascadeType.PERSIST})
    private List<Ingredient> ingredients;
    @ManyToMany
    private List<User> hasRatedUsers;

    public Recipe() {
    }

    public Recipe(String name, String text, User user, List<Ingredient> ingredients) {
        this.name = name;
        this.text = text;
        this.createdByUser = user;
        this.ingredients = ingredients;
        rateCounter = 0;
        hasRatedUsers = new ArrayList();
        hasRatedUsers.add(user);
        user.addRecipeCreatedByUser(this);
    }

    public Recipe(String name, List<String> imagePaths, String text, User user, List<Ingredient> ingredients) {
        this.name = name;
        this.imagePaths = imagePaths;
        this.text = text;
        this.createdByUser = user;
        this.ingredients = ingredients;
        rateCounter = 0;
        hasRatedUsers = new ArrayList();
        hasRatedUsers.add(user);
        user.addRecipeCreatedByUser(this);
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getRateCounter() {
        return rateCounter;
    }

    public void incrementRateCounter() {
        rateCounter++;
    }

    public void decrementRateCounter() {
        rateCounter--;
    }

    public List<String> getImagePaths() {
        return imagePaths;
    }

    public void setImagePaths(List<String> imagePaths) {
        this.imagePaths = imagePaths;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public User getCreatedByUser() {
        return createdByUser;
    }

    public void setCreatedByUser(User createdByUser) {
        this.createdByUser = createdByUser;
    }

    public List<Ingredient> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }

    public List<User> getHasRatedUsers() {
        return hasRatedUsers;
    }

    public void setHasRatedUsers(List<User> hasRatedUsers) {
        this.hasRatedUsers = hasRatedUsers;
    }

    @Override
    public String toString() {
        return "Recipe{" + "id=" + id + ", name=" + name + ", rateCounter=" + rateCounter + ", imagePaths=" + imagePaths + ", text=" + text + ", user=" + createdByUser + ", ingredients=" + ingredients + ", hasRatedUsers=" + hasRatedUsers + '}';
    }
}
