import { Router } from "express";
import { CreateCategoryController } from "./controllers/CreateCategoryController";
import { CreateVideoController } from "./controllers/CreateVideoController";
import { DeleteCategoryController } from "./controllers/DeleteCategoryController";
import { GetAllCategoryController } from "./controllers/GetAllCategoriesController";
import { GetAllVideoController } from "./controllers/GetAllVideoController";
import { UdateCategoryController } from "./controllers/UpdateCategoryController copy";



const routes = Router();

routes.post("/categories", new CreateCategoryController().handle);
routes.get("/categories", new GetAllCategoryController().handle);
routes.delete("/categories/:id", new DeleteCategoryController().handle);
routes.put("/categories/:id", new UdateCategoryController().handle);


routes.post("/videos", new CreateVideoController().handle);
routes.get("/videos", new GetAllVideoController().handle);


export { routes }