package entity;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

@Entity
public class Ingredient implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    private String name;
    private String imagePath;
    private String addedDate;
    private String expiryDate;
    private String amount;
    @ManyToMany(mappedBy = "recipeIngredients", cascade = {CascadeType.PERSIST}, fetch = FetchType.EAGER)
    private List<Recipe> recipesWithIngredient;
    @ManyToMany(mappedBy = "userIngredients", fetch = FetchType.EAGER)
    private List<User> usersWithIngredient;

    public Ingredient() {
    }

    //Denne konstruktør bruges, når der skal oprettes en ny opskrift, som kræver en ingrediens der ikke allerede findes
    public Ingredient(String name, String amount) {
        this.name = name;
        this.amount = amount;
        recipesWithIngredient = new ArrayList();
        usersWithIngredient = new ArrayList();
    }

    public Ingredient(String name, String expiryDate, String amount) {
        this.name = name;
        this.addedDate = new SimpleDateFormat("dd/MM/yyyy").format(new Date());
        this.expiryDate = expiryDate;
        this.amount = amount;
        recipesWithIngredient = new ArrayList();
        usersWithIngredient = new ArrayList();
    }

    public Ingredient(String name, String imagePath, String expiryDate, String amount) {
        this.name = name;
        this.imagePath = imagePath;
        this.addedDate = new SimpleDateFormat("dd/MM/yyyy").format(new Date());
        this.expiryDate = expiryDate;
        this.amount = amount;
        recipesWithIngredient = new ArrayList();
        usersWithIngredient = new ArrayList();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public String getAddedDate() {
        return addedDate;
    }

    public void setAddedDate(String addedDate) {
        this.addedDate = addedDate;
    }

    public String getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(String expiryDate) {
        this.expiryDate = expiryDate;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public List<Recipe> getRecipesWithIngredient() {
        return recipesWithIngredient;
    }

    public void setRecipesWithIngredient(List<Recipe> recipesWithIngredient) {
        this.recipesWithIngredient = recipesWithIngredient;
    }

    public List<User> getUsersWithIngredient() {
        return usersWithIngredient;
    }

    public void setUsersWithIngredient(List<User> usersWithIngredient) {
        this.usersWithIngredient = usersWithIngredient;
    }

    public void addUserWithIngredient(User user) {
    }

    @Override
    public String toString() {
        return "Ingredient{" + "name=" + name + ", imagePath=" + imagePath + ", addedDate=" + addedDate + ", expiryDate=" + expiryDate + ", amount=" + amount + ", recipesWithIngredient=" + recipesWithIngredient + ", users=" + usersWithIngredient + '}';
    }

}
