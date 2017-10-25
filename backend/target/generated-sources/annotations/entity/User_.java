package entity;

import entity.Ingredient;
import entity.Rating;
import entity.Recipe;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2017-10-25T04:33:09")
@StaticMetamodel(User.class)
public class User_ { 

    public static volatile ListAttribute<User, Recipe> recipes;
    public static volatile SingularAttribute<User, String> pin;
    public static volatile ListAttribute<User, Rating> ratings;
    public static volatile ListAttribute<User, Ingredient> ingredients;
    public static volatile SingularAttribute<User, String> userName;

}