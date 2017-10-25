package entity;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Temporal;

@Entity
public class Ingredient implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    private String name;
    private String imagePath;
    @Temporal(javax.persistence.TemporalType.DATE)
    private Date addedDate;
    @Temporal(javax.persistence.TemporalType.DATE)
    private Date expiryDate;
    private String amount;
    @ManyToMany(mappedBy = "ingredients")
    private List<Recipe> recipes;
    @ManyToMany(mappedBy = "ingredients")
    private List<User> users;

    public Ingredient() {
    }

    public Ingredient(String name, String imagePath, Date expiryDate, String amount) {
        this.name = name;
        this.imagePath = imagePath;
        //this.addedDate = new SimpleDateFormat("dd/MM/yyyy").format(new Date());
        this.addedDate = new Date();
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

    public Date getAddedDate() {
        return addedDate;
    }

    public void setAddedDate(Date addedDate) {
        this.addedDate = addedDate;
    }

    public Date getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(Date expiryDate) {
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
