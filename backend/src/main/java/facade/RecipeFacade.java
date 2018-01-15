package facade;

import entity.Category;
import entity.CategoryAmount;
import entity.Ingredient;
import entity.Recipe;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.RollbackException;

public class RecipeFacade {

    private final EntityManagerFactory EMF;

    public static void main(String[] args) {
        new RecipeFacade("PU").start();
    }

    public void start() {
        createPandekage();
//        createToast();
//createCabonara();
//        CategoryFacade c = new CategoryFacade("PU");
//        List<String> paths = new ArrayList();
//        paths.add("https://vetterlain.dk/images/fridgebook/Classic-spaghetti-carbonara.jpg");
//        Recipe r = new Recipe();
//        r.setImagePaths(paths);
//        r.setName("Spaghetti");
//        List<Category> categories = new ArrayList();
//        categories.add(new CategoryFacade("PU").getCategory(3l));
//        r.setRecipeIngredients(categories);
//        r.setNote("Lækker pasta uden fløde");
//        r.setText("Start med at koge spaghettien.");
//        r.setRateCounter(0);
//        Category b = c.getCategory(3l);
//        CategoryAmount a = new CategoryAmount();
//        a.setAmount("1 pakke skiveskåret bacon");
//        b.getCategoryAmounts().add(a);
//        a.setRecipe(createRecipe(r));
//        c.updateCategory(b);
    }

    public void createToast() {
        CategoryFacade cat = new CategoryFacade("PU");
        Recipe r = getRecipeById(3);
        List<String> paths = new ArrayList();
        paths.add("https://vetterlain.dk/images/fridgebook/con-pariser-e-senape-725x545.jpg");
        paths.add("https://vetterlain.dk/images/fridgebook/parisertoast_original.jpeg");
        r.setName("Parisertoast");
        r.setNote("Parisertoast kommer fra Frankrig, hvor den kendes som en croque-monsieur. Den oprindelige franske udgave består af to skiver toastbrød med ost og skinke mellem brødskiverne og stegt på en pande eller grillet i en ovn");
        r.setRateCounter(0);
        r.setImagePaths(paths);
        r.setText("Skær kanterne af brødet og læg 4 skiver på en bageplade med bagepapir."
                + "\nLæg en skiver ost, en skiver (sammenfoldet) skinke, en skive ost og det sidste stykke brød, som låg."
        );
        updateRecipe(r);
//        createRecipe(r);
//        CategoryAmount c1 = new CategoryAmount();
//        Category ca1 = cat.getCategory(2L);
//        CategoryAmount c2 = new CategoryAmount();
//        Category ca2 = cat.getCategory(4L);
//        CategoryAmount c3 = new CategoryAmount();
//        Category ca3 = cat.getCategory(11L);
//        CategoryAmount c4 = new CategoryAmount();
//        Category ca4 = cat.getCategory(12L);
//        CategoryAmount c5 = new CategoryAmount();
//        Category ca5 = cat.getCategory(5L);
//        CategoryAmount c6 = new CategoryAmount();
//        Category ca6 = cat.getCategory(6L);
        // Bacon
//        c1.setAmount("5g");
//        c1.setRecipe(r);
//        ca1.getCategoryAmounts().add(c1);
//        cat.updateCategory(ca1);
//        // Parmesan
//        c2.setAmount("1 skive");
//        c2.setRecipe(r);
//        ca2.getCategoryAmounts().add(c2);
//        cat.updateCategory(ca2);
//        // Salt
//        c3.setAmount("2 skiver");
//        c3.setRecipe(r);
//        ca3.getCategoryAmounts().add(c3);
//        cat.updateCategory(ca3);
//        // Peber
//        c4.setAmount("1 skive");
//        c4.setRecipe(r);
//        ca4.getCategoryAmounts().add(c4);
//        cat.updateCategory(ca4);
        // Spaghetti
//        c5.setAmount("100g");
//        c5.setRecipe(r);
//        ca5.getCategoryAmounts().add(c5);
//        cat.updateCategory(ca5);
//         Æg
//        c6.setAmount("2");
//        c6.setRecipe(r);
//        ca6.getCategoryAmounts().add(c6);
//        cat.updateCategory(ca6);

    }

    public void createPandekage() {
        CategoryFacade cat = new CategoryFacade("PU");
        Recipe r = getRecipeById(1);
        List<String> paths = new ArrayList();
        paths.add("https://vetterlain.dk/images/fridgebook/pandekage.jpg");
        paths.add("https://vetterlain.dk/images/fridgebook/pan.jpg");
        r.setImagePaths(paths);
//        r.setName("Pandekager");
////        r.setNote("Spaghetti carbonara er en traditional italiensk pastaret. Carbonara er en af de få pastaretter, hvor det ikke er fastlagt præcis hvilken pasta der skal anvendes og ud over spaghetti anvendes f.eks fettuccine, rigatoni, linguine, eller bucatini");
//        CategoryAmount c1 = new CategoryAmount();
//        Category ca1 = cat.getCategory(1L);
//        CategoryAmount c2 = new CategoryAmount();
//        Category ca2 = cat.getCategory(2L);
//        CategoryAmount c3 = new CategoryAmount();
//        Category ca3 = cat.getCategory(6L);
//        CategoryAmount c4 = new CategoryAmount();
//        Category ca4 = cat.getCategory(7L);
//        CategoryAmount c5 = new CategoryAmount();
//        Category ca5 = cat.getCategory(10L);
////        CategoryAmount c6 = new CategoryAmount();
////        Category ca6 = cat.getCategory(6L);
//        c1.setAmount("50g");
//        c1.setRecipe(r);
//        ca1.getCategoryAmounts().add(c1);
//        cat.updateCategory(ca1);
//        c2.setAmount("10g");
//        c2.setRecipe(r);
//        ca2.getCategoryAmounts().add(c2);
//        cat.updateCategory(ca2);
//        c3.setAmount("1 stk");
//        c3.setRecipe(r);
//        ca3.getCategoryAmounts().add(c3);
//        cat.updateCategory(ca3);
//        c4.setAmount("1 knivspids");
//        c4.setRecipe(r);
//        ca4.getCategoryAmounts().add(c4);
//        cat.updateCategory(ca4);
//        // Spaghetti
//        c5.setAmount("3 dl");
//        c5.setRecipe(r);
//        ca5.getCategoryAmounts().add(c5);
//        cat.updateCategory(ca5);
//         Æg
//        c6.setAmount("2");
//        c6.setRecipe(r);
//        ca6.getCategoryAmounts().add(c6);
//        cat.updateCategory(ca6);
//        r.setText(
//                "Først blander du de tørre ingredienser i en skål.\n"
//                + "Så tilsætter du mælk lidt ad gangen. Pisk godt, så du undgår klumper. Det er nemmest og hurtigst med en elpisker.\n"
//                + "Tilsæt æg til sidst, og rør godt rundt, til dejen har den rette konsistens.\n"
//                + "Varm panden, smelt smør, og fordel den første omgang dej. Min pande tager ca. ¾-1 dl. Hvis du vil undgå, at den første bliver en mandagspandekage, skal du sørge for, at panden er ordentlig varm, inden dejen hældes på.\n"
//                + "Vend, når der ikke er mere “våd dej”, og steg færdig på den anden side."
//        );

        updateRecipe(r);
    }

    public void createCabonara() {
             Recipe r = getRecipeById(2);
        List<String> paths = new ArrayList();
        paths.add("https://vetterlain.dk/images/fridgebook/Classic-spaghetti-carbonara.jpg");
        paths.add("https://vetterlain.dk/images/fridgebook/carb.jpg");
//        r.setName("Parisertoast");
//        r.setNote("Parisertoast kommer fra Frankrig, hvor den kendes som en croque-monsieur. Den oprindelige franske udgave består af to skiver toastbrød med ost og skinke mellem brødskiverne og stegt på en pande eller grillet i en ovn");
        r.setRateCounter(1);
        r.setImagePaths(paths);
//        r.setText("Skær kanterne af brødet og læg 4 skiver på en bageplade med bagepapir."
//                + "\nLæg en skiver ost, en skiver (sammenfoldet) skinke, en skive ost og det sidste stykke brød, som låg."
//        );
//        updateRecipe(r);
//        CategoryFacade cat = new CategoryFacade("PU");
//        Recipe r = getRecipeById(2);
        r.setName("Spaghetti cabonara");
        r.setNote("Spaghetti carbonara er en traditional italiensk pastaret. Carbonara er en af de få pastaretter, hvor det ikke er fastlagt præcis hvilken pasta der skal anvendes og ud over spaghetti anvendes f.eks fettuccine, rigatoni, linguine, eller bucatini");
//        CategoryAmount c1 = new CategoryAmount();
//        Category ca1 = cat.getCategory(3L);
//        CategoryAmount c2 = new CategoryAmount();
//        Category ca2 = cat.getCategory(9L);
//        CategoryAmount c3 = new CategoryAmount();
//        Category ca3 = cat.getCategory(7L);
//        CategoryAmount c4 = new CategoryAmount();
//        Category ca4 = cat.getCategory(8L);
//        CategoryAmount c5 = new CategoryAmount();
//        Category ca5 = cat.getCategory(5L);
//        CategoryAmount c6 = new CategoryAmount();
//        Category ca6 = cat.getCategory(6L);
////         Bacon
//        c1.setAmount("1 pakke");
//        c1.setRecipe(r);
//        ca1.getCategoryAmounts().add(c1);
//        cat.updateCategory(ca1);
//        // Parmesan
//        c2.setAmount("Friskrevet parmesan");
//        c2.setRecipe(r);
//        ca2.getCategoryAmounts().add(c2);
//        cat.updateCategory(ca2);
//        // Salt
//        c3.setAmount("1 tsk");
//        c3.setRecipe(r);
//        ca3.getCategoryAmounts().add(c3);
//        cat.updateCategory(ca3);
//        // Peber
//        c4.setAmount("Masser af friskkværnet peber");
//        c4.setRecipe(r);
//        ca4.getCategoryAmounts().add(c4);
//        cat.updateCategory(ca4);
//        // Spaghetti
//        c5.setAmount("100g");
//        c5.setRecipe(r);
//        ca5.getCategoryAmounts().add(c5);
//        cat.updateCategory(ca5);
////         Æg
//        c6.setAmount("2");
//        c6.setRecipe(r);
//        ca6.getCategoryAmounts().add(c6);
//        cat.updateCategory(ca6);
        r.setText(
                "Sæt vand over til pasta\n\n"
                + "Steg bacon - når det er halvfærdigt hælder du bacon op på et stykke køkkenrulle\n\n"
                + "Kom salt og pasta i det kogende vand\n\n"
                + "bland æg, ca. 100 g parmesan, salt og peber til carbonara saucen\n\n"
                + "Hæld bacon tilbage i panden med løg og champignon, og hæld evt. en sjat hvidvin ved - lad det koge lidt ind\n\n"
                + "Når hvidvinen næsten er fordampet, slukker du for varmen og tilsætte carbonara saucen\n\n"
                + "Hæld vandet fra pastaen og tilsæt den færdige og afdryppede pasta til retten\n\n"
                + "Vend retten roligt rundt og lad evt. saucen tykne lidt"
        );

        updateRecipe(r);

    }

    public RecipeFacade(String persistenceUnit) {
        this.EMF = Persistence.createEntityManagerFactory(persistenceUnit);
    }

    private EntityManager getEntityManager() {
        return EMF.createEntityManager();
    }

    public Recipe getRecipeById(int id) {
        return getEntityManager().find(Recipe.class, id);
    }

    public List<Recipe> getRecipes() {
        return getEntityManager().createQuery("SELECT r FROM Recipe r", Recipe.class).getResultList();
    }

    public Recipe createRecipe(Recipe recipe) {
        EntityManager em = getEntityManager();
        Recipe recipeInDB = null;
        try {
            em.getTransaction().begin();
            em.persist(recipe);
            em.getTransaction().commit();
            recipeInDB = em.find(Recipe.class, recipe.getId());
        } catch (RollbackException r) {
            em.getTransaction().rollback();
        } finally {
            em.close();
        }
        return recipeInDB;
    }

    public Recipe updateRecipe(Recipe recipe) {
        EntityManager em = getEntityManager();
        Recipe recipeInDB = em.find(Recipe.class, recipe.getId());
        try {
            em.getTransaction().begin();
            recipeInDB = em.merge(recipe);
            em.getTransaction().commit();
        } catch (RollbackException r) {
            em.getTransaction().rollback();
        } finally {
            em.close();
        }
        return recipeInDB;
    }

    public boolean deleteRecipe(int id) {
        EntityManager em = getEntityManager();
        Recipe recipe = em.find(Recipe.class, id);
        try {
            em.getTransaction().begin();
            em.remove(recipe);
            em.getTransaction().commit();
        } catch (RollbackException r) {
            em.getTransaction().rollback();
            return false;
        } finally {
            em.close();
        }
        return true;
    }
}
