package entity;

import java.text.SimpleDateFormat;
import java.util.Date;
import javax.persistence.Entity;

@Entity
public class Comestible extends Ingredient {

    private String addedDate;
    private String expiryDate;
    private String amount;

    public Comestible() {
        addedDate = new SimpleDateFormat("dd/MM/yyyy").format(new Date());
    }

    public Comestible(String name, String imagePath, String expiryDate, String amount) {
        super(name, imagePath);
        addedDate = new SimpleDateFormat("dd/MM/yyyy").format(new Date());
        this.expiryDate = expiryDate;
        this.amount = amount;
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
        return "Comestible{" + "addedDate=" + addedDate + ", expiryDate=" + expiryDate + ", amount=" + amount + '}';
    }

}
