package entity;

import entity.Ingredient;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2017-12-15T05:27:32")
@StaticMetamodel(Category.class)
public class Category_ { 

    public static volatile SingularAttribute<Category, String> imageName;
    public static volatile SingularAttribute<Category, String> name;
    public static volatile ListAttribute<Category, Ingredient> ingredients;
    public static volatile SingularAttribute<Category, Long> id;
    public static volatile SingularAttribute<Category, Boolean> isNew;

}