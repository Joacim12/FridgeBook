package entity;

import entity.Ingredient;
import entity.Recipe;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2017-10-31T05:14:07")
@StaticMetamodel(User.class)
public class User_ { 

    public static volatile SingularAttribute<User, String> pin;
    public static volatile ListAttribute<User, Recipe> favouriteRecipes;
    public static volatile ListAttribute<User, Recipe> recipesCreatedByUser;
    public static volatile ListAttribute<User, Ingredient> userIngredients;
    public static volatile SingularAttribute<User, String> username;

}