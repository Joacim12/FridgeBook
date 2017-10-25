package entity;

import entity.Recipe;
import entity.User;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2017-10-25T04:33:09")
@StaticMetamodel(Ingredient.class)
public class Ingredient_ { 

    public static volatile SingularAttribute<Ingredient, Date> expiryDate;
    public static volatile ListAttribute<Ingredient, Recipe> recipes;
    public static volatile SingularAttribute<Ingredient, String> amount;
    public static volatile SingularAttribute<Ingredient, Date> addedDate;
    public static volatile SingularAttribute<Ingredient, String> imagePath;
    public static volatile SingularAttribute<Ingredient, String> name;
    public static volatile ListAttribute<Ingredient, User> users;

}