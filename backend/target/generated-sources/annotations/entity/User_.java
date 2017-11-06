package entity;

import entity.Comestible;
import entity.Recipe;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2017-11-07T00:41:13")
@StaticMetamodel(User.class)
public class User_ { 

    public static volatile SingularAttribute<User, String> pin;
    public static volatile ListAttribute<User, Recipe> favouriteRecipes;
    public static volatile ListAttribute<User, Recipe> recipesCreatedByUser;
    public static volatile ListAttribute<User, Comestible> comestibles;
    public static volatile SingularAttribute<User, String> username;

}