package rest;

import java.util.Set;
import javax.ws.rs.core.Application;

/**
 *
 * @author Zaeem
 */
@javax.ws.rs.ApplicationPath("api")
public class ApplicationConfig extends Application {

    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> resources = new java.util.HashSet<>();
        addRestResourceClasses(resources);
        return resources;
    }

    /**
     * Do not modify addRestResourceClasses() method.
     * It is automatically populated with
     * all resources defined in the project.
     * If required, comment out calling this method in getClasses().
     */
    private void addRestResourceClasses(Set<Class<?>> resources) {
        resources.add(rest.ComestibleResource.class);
        resources.add(rest.IngredientResource.class);
        resources.add(rest.RecipeResource.class);
        resources.add(rest.UserResource.class);
    }
    
}
