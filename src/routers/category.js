import { Router } from "express";
import { create, deleteCategoryById, getAll, getCategoryById, updateCategoryById } from "../controllers/category";

const categoryRouter = Router();

categoryRouter.get("/categories", getAll);

categoryRouter.get("/categories/:id", getCategoryById);

categoryRouter.delete("/categories/:id", deleteCategoryById);

categoryRouter.put("/categories/:id", updateCategoryById);

categoryRouter.post("/categories", create);

export default categoryRouter;
