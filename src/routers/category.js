import { Router } from "express";
import { create, deleteCategoryById, getAll, getCategoryById, softDeleteCategoryById, updateCategoryById } from "../controllers/category";
import checkAuth from "../middlewares/checkAuth";
import checkIsAdmin from "../middlewares/checkAdmin";
import validBodyRequest from "../middlewares/validRequestBody";
import categoryValidator from "../validations/category";

const router = Router();

router.get("/", getAll);
router.get("/:id", getCategoryById);

router.use(checkAuth, checkIsAdmin);
router.delete("/:id", deleteCategoryById);
router.put("/hide/:id", softDeleteCategoryById);

router.use(validBodyRequest(categoryValidator))
router.put("/:id", updateCategoryById);
router.post("/", create);

export default router;
