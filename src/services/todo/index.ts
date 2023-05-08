// //GENERAL
const todo_router = require("express").Router();
// import Todo from "../../utils/models/todo";


import { Request, Response, NextFunction } from "express";
import { admin, authorize, teacher } from "../../middlewares/auth";
import Todo from "../../utils/models/todo";

// todo_router.get(
//   "/admin/all",
//   authorize,
//   admin,
//   async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//       const todos = await Todo.findAll();
//       if (todos.length > 0) {
//         res.status(200).send(todos);
//       } else res.status(204);
//     } catch (e) {
//       next(e);
//     }
//   }
// );

todo_router.post(
  "/",
  authorize,
  teacher,
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const todos = await Todo.create({
        ...req.body,
        UserUserId: req.user.id,
      });
      res.status(201).send(todos);
    } catch (e) {
      next(e);
    }
  }
);

todo_router.get(
  "/me",
  authorize,
  teacher,
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const todos = await Todo.findAll({
        where: {
          UserUserId: req.user.id,
        },
      });
      if (todos.length > 0) {
        res.status(200).send(todos);
      } else res.status(204);
    } catch (e) {
      next(e);
    }
  }
);

todo_router.put(
  "/:todo_id",
  authorize,
  teacher,
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const todo = await Todo.update(req.body, {
        where: { todo_id: req.params.todo_id },
      });
      if (todo) {
        res.status(204);
      } else res.status(204);
    } catch (e) {
      next(e);
    }
  }
);

todo_router.delete(
  "/:todo_id",
  authorize,
  teacher,
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await Todo.destroy({ where: { todo_id: req.params.todo_id } });
      res.status(204);
    } catch (e) {
      next(e);
    }
  }
);

export default todo_router;
