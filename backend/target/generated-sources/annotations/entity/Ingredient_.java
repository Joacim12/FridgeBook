package entity;

import entity.Recipe;
import entity.User;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2017-10-27T04:04:28")
@StaticMetamodel(Ingredient.class)
public class Ingredient_ { 

    public static volatile SingularAttribute<Ingredient, String> expiryDate;
    public static volatile SingularAttribute<Ingredient, String> amount;
    public static volatile SingularAttribute<Ingredient, String> addedDate;
    public static volatile ListAttribute<Ingredient, User> usersWithIngredient;
    public static volatile SingularAttribute<Ingredient, String> imagePath;
    public static volatile SingularAttribute<Ingredient, String> name;
    public static volatile ListAttribute<Ingredient, Recipe> recipesWithIngredient;

}