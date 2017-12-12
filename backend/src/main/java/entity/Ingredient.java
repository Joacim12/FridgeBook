package entity;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
public class Ingredient implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    private String name;
    private String imagePath;
    private String barcode;
    private Boolean newIngredient = true;
    @OneToOne(mappedBy = "ingredient")
    private Comestible comestible;

    public Ingredient() {
    }

    public Ingredient(String name, String imagePath) {
        this.name = name;
        this.imagePath = imagePath;
    }

    public Boolean getNewIngredient() {
        return newIngredient;
    }

    public void setNewIngredient(Boolean newIngredient) {
        this.newIngredient = newIngredient;
    }

    public String getBarcode() {
        return barcode;
    }

    public void setBarcode(String barcode) {
        this.barcode = barcode;
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

    public Comestible getComestible() {
        return comestible;
    }

    public void setComestible(Comestible comestible) {
        this.comestible = comestible;
    }

    @Override
    public String toString() {
        return "Ingredient{" + "name=" + name + ", imagePath=" + imagePath + ", comestible=" + comestible + '}';
    }

}
