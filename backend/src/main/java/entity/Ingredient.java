package entity;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Ingredient implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    private String name;
    private String imagePath;

    public Ingredient() {
    }

    public Ingredient(String name, String imagePath) {
        this.name = name;
        this.imagePath = imagePath;
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

    @Override
    public String toString() {
        return "Ingredient{" + "name=" + name + ", imagePath=" + imagePath + '}';
    }
}
