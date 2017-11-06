package entity;

import java.io.Serializable;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

/**
 *
 * @author joaci
 */
@Entity
public class MyUser implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private int pin;
    @OneToMany(cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
    private List<IngredientInfo> ingredientInfo;

    public List<IngredientInfo> getIngredientInfo() {
        return ingredientInfo;
    }

    public void setIngredientInfo(List<IngredientInfo> ingredientInfo) {
        this.ingredientInfo = ingredientInfo;
    }
    
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPin() {
        return pin;
    }

    public void setPin(int pin) {
        this.pin = pin;
    }
    
    public Long getId() {
        return id;
    }

    @Override
    public String toString() {
        return "MyUser{" + "id=" + id + ", name=" + name + ", pin=" + pin + ", ingredientInfo=" + ingredientInfo + '}';
    }

    
    
}
