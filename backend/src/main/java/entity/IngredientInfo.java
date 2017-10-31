package entity;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class IngredientInfo implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String addedDate;
    private String expiryDate;
    private String amount;

    public IngredientInfo() {
    }

    public IngredientInfo(String expiryDate, String amount) {
        this.addedDate = new SimpleDateFormat("dd/MM/yyyy").format(new Date());
        this.expiryDate = expiryDate;
        this.amount = amount;
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

    @Override
    public String toString() {
        return "IngredientInfo{" + "id=" + id + ", addedDate=" + addedDate + ", expiryDate=" + expiryDate + ", amount=" + amount + '}';
    }
}
