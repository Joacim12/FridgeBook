package rest;

import com.google.gson.Gson;
import entity.Category;
import facade.CategoryFacade;
import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import jsonMapper.CategoryJson;
import jsonMapper.ComestibleJson;

/**
 *
 * @author joacim
 */
@Path("category")
public class CategoryResource {

    private final Gson GSON = new Gson();
    private final CategoryFacade CATEGORY_FACADE = new CategoryFacade("PU");

    
     @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getCategoryById(@PathParam("id") Long id) {
        return GSON.toJson(new CategoryJson(CATEGORY_FACADE.getCategory(id)));
    }
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getCategories() {
        List<Category> categories = CATEGORY_FACADE.getCategories();
        List<CategoryJson> categoriesJson = new ArrayList();
        categories.forEach(category -> {
            categoriesJson.add(new CategoryJson(category));
        });
        return GSON.toJson(categoriesJson);
    }
}
