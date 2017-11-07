package entity;

import entity.Ingredient;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2017-11-07T15:36:16")
@StaticMetamodel(Comestible.class)
public class Comestible_ { 

    public static volatile SingularAttribute<Comestible, String> expiryDate;
    public static volatile SingularAttribute<Comestible, String> amount;
    public static volatile SingularAttribute<Comestible, String> addedDate;
    public static volatile SingularAttribute<Comestible, Ingredient> ingredient;
    public static volatile SingularAttribute<Comestible, Integer> id;

}