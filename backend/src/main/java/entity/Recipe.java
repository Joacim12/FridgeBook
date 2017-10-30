package entity;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.OneToMany;

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
    @JoinColumn
    @OneToMany
    private List<Ingredient> recipeIngredients;

    public Recipe() {
    }

    public Recipe(String name, String text, User user, List<Ingredient> ingredients) {
        this.name = name;
        this.text = text;
        this.recipeIngredients = ingredients;
        rateCounter = 0;
    }

    public Recipe(String name, List<String> imagePaths, String text, User user, List<Ingredient> ingredients) {
        this.name = name;
        this.imagePaths = imagePaths;
        this.text = text;
        this.recipeIngredients = ingredients;
        rateCounter = 0;
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

    public List<Ingredient> getRecipeIngredients() {
        return recipeIngredients;
    }

    public void setRecipeIngredients(List<Ingredient> recipeIngredients) {
        this.recipeIngredients = recipeIngredients;
    }

    @Override
    public String toString() {
        return "Recipe{" + "id=" + id + ", name=" + name + ", rateCounter=" + rateCounter + ", imagePaths=" + imagePaths + ", text=" + text + ", recipeIngredients=" + recipeIngredients + '}';
    }
}
