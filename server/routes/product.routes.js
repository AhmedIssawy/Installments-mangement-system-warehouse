import { Router } from "express";
import {
  createProduct,
  addStock,
  updateProduct,
  getAllProducts,
  getProductById,
  getProductByCategory,
  deleteProduct,
} from "../controllers/product.controller.js";
const router = Router();
router.route("/product").post(createProduct).get(getAllProducts);
router
  .route("/product/:id")
  .patch(updateProduct)
  .get(getProductById)
  .delete(deleteProduct);
router.route("/product/category/:id").get(getProductByCategory);
router.route("/product/:id/stock").patch(addStock);

export default router;
