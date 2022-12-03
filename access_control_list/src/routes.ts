import { Router } from "express";
import { CreateProductController } from "./controllers/CreateProductController";
import { CreateRoleController } from "./controllers/CreateRoleController";
import { CreateUserController } from "./controllers/CreateUserController";
import { GetAllProductsController } from "./controllers/GetAllProductsController";
import { SessionController } from "./controllers/SessionController";
import { ensuredAuthenticated } from "./middleware/ensuredAuthenticated";

const routes = Router();

routes.post("/users", new CreateUserController().handle);
routes.post("/login", new SessionController().handle);

routes.get("/products", new GetAllProductsController().handle);
routes.post(
  "/products",
  ensuredAuthenticated(),
  new CreateProductController().handle
);

routes.post("/roles", ensuredAuthenticated(), new CreateRoleController().handle);


export { routes };
