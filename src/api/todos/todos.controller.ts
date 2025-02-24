import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTodos = async (req: Request, res: Response) => {
  try {
    const limit = Number(req.query.limit) || 10;
    const offset = Number(req.query.offset) || 0;

    const todos = await prisma.todo.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      todos,
      pagination: {
        total: todos.length,
        offset,
        limit,
        hasMore: offset + todos.length < todos.length,
      },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Failed to fetch todos",
    });
  }
};

export const getTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const todo = await prisma.todo.findUnique({
      where: { id: Number(id) },
    });

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(todo);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error fetching todos" });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  try {
    const { title, completed, color, status } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Title cannot be empty" });
    }
    const newTodo = await prisma.todo.create({
      data: { title, completed, color, status },
    });

    res.status(201).json(newTodo);
  } catch (e) {
    console.error(e);
    res.json({ message: "Something went wrong" });
  }
};

export const editTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, completed, color, status } = req.body;
    const todo = await prisma.todo.findUnique({
      where: { id: Number(id) },
    });

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    const updatedTodo = await prisma.todo.update({
      where: { id: Number(id) },
      data: {
        title: title ?? todo.title,
        completed: completed ?? todo.completed,
        color: color ?? todo.color,
        status: status ?? todo.status,
      },
    });

    res.json(updatedTodo);
  } catch (e) {
    console.error(e);
    res.json({ message: "Something went wrong" });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const todo = await prisma.todo.findUnique({
      where: { id: Number(id) },
    });

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    await prisma.todo.delete({
      where: { id: Number(id) },
    });

    res.json({ message: `${id} was deleted successfully.` });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error deleting todo" });
  }
};

export default {
  getTodos,
  getTodo,
  createTodo,
  editTodo,
  deleteTodo,
};
