package entity;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.persistence.Entity;
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
    @ManyToMany(mappedBy = "ingredients")
    private List<Recipe> recipes;
    @ManyToMany(mappedBy = "ingredients")
    private List<User> users;

    public Ingredient() {
    }

     public Ingredient(String name, String amount) {
        this.name = name;
        this.amount = amount;
        recipes = new ArrayList();
        users = new ArrayList();
    }
    
    public Ingredient(String name, String expiryDate, String amount) {
        this.name = name;
        this.addedDate = new SimpleDateFormat("dd/MM/yyyy").format(new Date());
        this.expiryDate = expiryDate;
        this.amount = amount;
        recipes = new ArrayList();
        users = new ArrayList();
    }

    public Ingredient(String name, String imagePath, String expiryDate, String amount) {
        this.name = name;
        this.imagePath = imagePath;
        this.addedDate = new SimpleDateFormat("dd/MM/yyyy").format(new Date());
        this.expiryDate = expiryDate;
        this.amount = amount;
        recipes = new ArrayList();
        users = new ArrayList();
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

    @Override
    public String toString() {
        return "Ingredient{" + "name=" + name + ", imagePath=" + imagePath + ", addedDate=" + addedDate + ", expiryDate=" + expiryDate + ", amount=" + amount + '}';
    }
}
