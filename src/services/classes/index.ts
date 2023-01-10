//GENERAL

import { Op } from "sequelize";
import { Request, Response, NextFunction, Router } from "express";
import { admin, authorize, teacher, student } from "../../middlewares/auth";
import Class from "../../utils/models/class";
import Students_Class from "../../utils/models/student_class";
import User from "../../utils/models/user";
import Section from "../../utils/models/section";
import Material from "../../utils/models/files";
const class_router = Router();

class_router.get(
  "/admin/all",
  admin,
  authorize,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const events = await Class.findAll();
      if (events.length > 0) {
        res.status(200).send(events);
      } else res.status(204);
    } catch (e) {
      next(e);
    }
  }
);

class_router.post(
  "/",
  authorize,
  teacher,
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await Class.create({ ...req.body, author: req.user.user_id });
      res.status(201).send({ message: "Created" });
    } catch (e) {
      next(e);
    }
  }
);
class_router.post(
  "/search",
  authorize,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const classes = await Class.findAll({
        where: {
          name: {
            [Op.iLike]: `%${req.body.query}%`,
          },
        },
      });
      if (classes.length > 0) res.status(200).send(classes);
      else res.send({ message: "Nothing here" });
    } catch (e) {
      next(e);
    }
  }
);
class_router.post(
  "/enroll/:class_id",
  authorize,
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const class_to_enroll = await Class.findOne({
        where: {
          class_id: req.params.class_id,
        },
      });
      const user = await User.findByPk(req.user.user_id?.toString());
      
      if (class_to_enroll && user) {
        const enroll = await Students_Class.create({
          ClassClassId: req.params.class_id,
          UserUserId: req.user.user_id,
        });
        if (enroll) res.send({ message: "Enrolled" });
        else res.send({ message: "Something went wrong" });
      } else res.status(404).send({ message: "User or Class not found" });
      //await Students_Class.create({ClassClassId: req.params.class_id, UserUserId: req.user.user_id})
    } catch (e) {
      next(e);
    }
  }
);

class_router.get(
  "/me",
  authorize,
  teacher,
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const classes = await Class.findAll({
        where: {
          author: req.user.user_id,
        },
      });
      if (classes.length > 0) {
        res.status(200).send(classes);
      } else res.send({ status: 204, message: "Nothing here" });
    } catch (e) {
      next(e);
    }
  }
);
class_router.post(
  "/add-section/:class_id",
  authorize,
  teacher,
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      /*sample body: 
        {
            section: {
                name: string
                description: string
            },
            files: [
	            name: string
	            type: string
	            description: string
                class_ref: number
            ]
        }
        */
      
      const section = await Section.create({
        ...req.body.section,
        ClassClassId: req.params.class_id,
      });
      
      // if (req.body.files) await Material.create({...req.body.files, section_ref: section.getDataValue("section_id")});
     
      res.status(201).send({ message: "Created", id: section.section_id });
    } catch (e) {
      next(e);
    }
  }
);

class_router.get(
  "/me/enrolled",
  authorize,
  student,
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const classes_stud = await Students_Class.findAll({
        where: {
          UserUserId: req.user.user_id,
        },
      });
      let classes: Array<Class> = [];
      for (let i: number = 0; i < classes_stud.length; i++) {
        let s_class = await Class.findAll({
          where: {
            class_id: classes_stud[i].ClassClassId,
          },
        });
        classes = [...classes, ...s_class];
      }
      if (classes.length > 0) {
        res.status(200).send(classes);
      } else res.send({ status: 204, message: "Nothing here" });
    } catch (e) {
      next(e);
    }
  }
);

class_router.get(
  "/:class_id",
  authorize,
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const class_found = await Class.findByPk(req.params.class_id);
      if (class_found) {
        const sections = await Section.findAll({
          where: { ClassClassId: class_found.class_id },
        });
       
        let section_files = await Material.findAll({
          where: {
            section_ref: {
              [Op.or]: [sections.map((s) => s.section_id)],
            },
          },
        });
 
        res
          .status(200)
          .send({
            class: class_found,
            sections: sections,
            files: section_files,
          });
      } else res.status(204);
    } catch (e) {
      next(e);
    }
  }
);

class_router.put(
  "/:class_id",
  authorize,
  teacher,
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const event = await Class.update(req.body, {
        where: { class_id: req.params.class_id },
      });
      if (event) {
        res.status(304);
      } else res.status(204);
    } catch (e) {
      next(e);
    }
  }
);

class_router.delete(
  "/:class_id",
  authorize,
  teacher,
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await Class.destroy({ where: { class_id: req.params.class_id } });
      res.status(204);
    } catch (e) {
      next(e);
    }
  }
);

export default class_router
