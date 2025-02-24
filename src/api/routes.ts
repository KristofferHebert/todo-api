import { Router } from "express";
import todosRoutes from "./todos/todos.routes";

const router = Router();

router.use("/todos", todosRoutes);

export default router;
