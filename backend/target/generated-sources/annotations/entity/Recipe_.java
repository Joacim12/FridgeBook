package entity;

import entity.Ingredient;
import entity.Rating;
import entity.User;
import java.util.List;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2017-10-25T04:33:09")
@StaticMetamodel(Recipe.class)
public class Recipe_ { 

    public static volatile SingularAttribute<Recipe, List> imagePaths;
    public static volatile SingularAttribute<Recipe, String> name;
    public static volatile SingularAttribute<Recipe, Rating> rating;
    public static volatile ListAttribute<Recipe, Ingredient> ingredients;
    public static volatile SingularAttribute<Recipe, Integer> thumbsDown;
    public static volatile SingularAttribute<Recipe, Integer> id;
    public static volatile SingularAttribute<Recipe, String> text;
    public static volatile SingularAttribute<Recipe, Integer> thumbsUp;
    public static volatile SingularAttribute<Recipe, User> user;

}