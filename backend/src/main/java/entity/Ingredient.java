package entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

@Entity
public class Ingredient implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    private String name;
    private String imagePath;
    @OneToMany(mappedBy = "ingredient", fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    private List<IngredientInfo> ingredientInfos;
    @ManyToMany(mappedBy = "ingredients", fetch = FetchType.EAGER)
    private List<User> users;

    public Ingredient() {
    }

    public Ingredient(String name, String imagePath) {
        this.name = name;
        this.imagePath = imagePath;
        ingredientInfos = new ArrayList();
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

    public List<IngredientInfo> getIngredientInfos() {
        return ingredientInfos;
    }

    public void setIngredientInfos(List<IngredientInfo> ingredientInfos) {
        this.ingredientInfos = ingredientInfos;
    }

    public void addIngredientInfo(IngredientInfo ingredientInfo) {
        ingredientInfos.add(ingredientInfo);
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public void addUser(User user) {
        users.add(user);
    }

    @Override
    public String toString() {
        return "Ingredient{" + "name=" + name + ", imagePath=" + imagePath + ", ingredientInfos=" + ingredientInfos + ", users=" + users + '}';
    }
}
