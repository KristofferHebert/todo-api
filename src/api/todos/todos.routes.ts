import { Router } from "express";
import todosController from "./todos.controller";

const router = Router();

router.get("/", todosController.getTodos);
router.get("/:id", todosController.getTodo);
router.post("/", todosController.createTodo);
router.put("/:id", todosController.editTodo);
router.delete("/:id", todosController.deleteTodo);

export default router;
