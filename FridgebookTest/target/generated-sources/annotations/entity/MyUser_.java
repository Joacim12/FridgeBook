package entity;

import entity.Ingredient;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2017-11-06T17:01:40")
@StaticMetamodel(MyUser.class)
public class MyUser_ { 

    public static volatile SingularAttribute<MyUser, Integer> pin;
    public static volatile SingularAttribute<MyUser, String> name;
    public static volatile ListAttribute<MyUser, Ingredient> ingredients;
    public static volatile SingularAttribute<MyUser, Long> id;

}