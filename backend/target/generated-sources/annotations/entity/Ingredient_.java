package entity;

import entity.IngredientInfo;
import entity.User;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2017-11-02T15:28:49")
@StaticMetamodel(Ingredient.class)
public class Ingredient_ { 

    public static volatile SingularAttribute<Ingredient, String> imagePath;
    public static volatile SingularAttribute<Ingredient, String> name;
    public static volatile ListAttribute<Ingredient, IngredientInfo> ingredientInfos;
    public static volatile ListAttribute<Ingredient, User> users;

}