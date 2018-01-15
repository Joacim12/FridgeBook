package entity;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;

@Entity
public class Recipe implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false)
    private String name;
    private int rateCounter;
    private List<String> imagePaths;
    @Lob
    @Column(nullable = false)
    private String text;
    private String note;
    @ManyToMany(fetch = FetchType.EAGER)
    private List<Category> recipeIngredients;
    @OneToOne(mappedBy = "recipe")
    private CategoryAmount categoryAmount;

    public Recipe() {
        rateCounter = 0;
    }

    public Recipe(String name, List<String> imagePaths, String text, List<Category> recipeIngredients) {
        this.name = name;
        this.imagePaths = imagePaths;
        this.text = text;
        this.recipeIngredients = recipeIngredients;
        rateCounter = 0;
    }

    public String getNote() {
        return note;
    }

    public void setRateCounter(int rateCounter) {
        this.rateCounter = rateCounter;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public int getId() {
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

    public void addImagePath(String path) {
        imagePaths.add(path);
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public List<Category> getRecipeIngredients() {
        return recipeIngredients;
    }

    public void setRecipeIngredients(List<Category> recipeIngredients) {
        this.recipeIngredients = recipeIngredients;
    }

    public void addRecipeIngredient(Category category) {
        recipeIngredients.add(category);
    }

}
