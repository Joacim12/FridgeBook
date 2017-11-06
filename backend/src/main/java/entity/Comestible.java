package entity;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
public class Comestible implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String addedDate;
    private String expiryDate;
    private String amount;
    @OneToOne
    private Ingredient ingredient;

    public Comestible() {
        addedDate = new SimpleDateFormat("dd/MM/yyyy").format(new Date());
    }

    public Comestible(String expiryDate, String amount, Ingredient ingredient) {
        addedDate = new SimpleDateFormat("dd/MM/yyyy").format(new Date());
        this.expiryDate = expiryDate;
        this.amount = amount;
        this.ingredient = ingredient;
    }

    public int getId() {
        return id;
    }

    public String getAddedDate() {
        return addedDate;
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

    public Ingredient getIngredient() {
        return ingredient;
    }

    public void setIngredient(Ingredient ingredient) {
        this.ingredient = ingredient;
    }

    @Override
    public String toString() {
        return "Comestible{" + "id=" + id + ", addedDate=" + addedDate + ", expiryDate=" + expiryDate + ", amount=" + amount + ", ingredient=" + ingredient + '}';
    }

}
