package entity;

import entity.Ingredient;
import java.util.List;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2017-10-30T16:54:56")
@StaticMetamodel(Recipe.class)
public class Recipe_ { 

    public static volatile ListAttribute<Recipe, Ingredient> recipeIngredients;
    public static volatile SingularAttribute<Recipe, List> imagePaths;
    public static volatile SingularAttribute<Recipe, String> name;
    public static volatile SingularAttribute<Recipe, Integer> rateCounter;
    public static volatile SingularAttribute<Recipe, Integer> id;
    public static volatile SingularAttribute<Recipe, String> text;

}