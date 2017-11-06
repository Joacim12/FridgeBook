package entity;

import entity.IngredientInfo;
import entity.MyUser;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2017-11-06T17:01:40")
@StaticMetamodel(Ingredient.class)
public class Ingredient_ { 

    public static volatile SingularAttribute<Ingredient, MyUser> myUser;
    public static volatile SingularAttribute<Ingredient, String> name;
    public static volatile SingularAttribute<Ingredient, IngredientInfo> ingredientInfo;
    public static volatile SingularAttribute<Ingredient, Long> id;

}