package entity;

import entity.Ingredient;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2017-11-06T17:01:40")
@StaticMetamodel(IngredientInfo.class)
public class IngredientInfo_ { 

    public static volatile SingularAttribute<IngredientInfo, String> expiryDate;
    public static volatile SingularAttribute<IngredientInfo, Ingredient> ingredient;
    public static volatile SingularAttribute<IngredientInfo, Long> id;

}