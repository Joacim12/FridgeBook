package entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Ingredient implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    private String name;
    private String imagePath;
    @OneToMany(cascade = {CascadeType.ALL})
    private List<IngredientInfo> info;

    public Ingredient() {
    }

    public Ingredient(String name, String imagePath, IngredientInfo info) {
        this.name = name;
        this.imagePath = imagePath;
        this.info = new ArrayList();
        if (info != null) {
            this.info.add(info);
        }
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

    public List<IngredientInfo> getInfo() {
        return info;
    }

    public void addInfo(IngredientInfo info) {
        this.info.add(info);
    }

    @Override
    public String toString() {
        return "Ingredient{" + "name=" + name + ", imagePath=" + imagePath + ", info=" + info + '}';
    }

}
