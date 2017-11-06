package entity;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

/**
 *
 * @author joacim
 */
@Entity
public class Ingredient implements Serializable {

    @OneToOne(mappedBy = "ingredient")
    private IngredientInfo ingredientInfo;
    private String name;
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
     public IngredientInfo getIngredientInfo() {
        return ingredientInfo;
    }

    public void setIngredientInfo(IngredientInfo ingredientInfo) {
        this.ingredientInfo = ingredientInfo;
    }

    
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public Long getId() {
        return id;
    }

    @Override
    public String toString() {
        return "Ingredient{" + "name=" + name + ", id=" + id + '}';
    }

    
    
}
