package entity;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Temporal;

/**
 *
 * @author Joacim
 */
@Entity
public class Ingredient implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    private String name;
    private String imagePath;
    @Temporal(javax.persistence.TemporalType.DATE)
    private Date addedDate;
    @Temporal(javax.persistence.TemporalType.DATE)
    private Date expiryDate;
    private String amount;
    
}
