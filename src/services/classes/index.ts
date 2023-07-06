//GENERAL

import { Model } from "sequelize-typescript"
import { Op } from "sequelize";
import { Request, Response, NextFunction, Router } from "express";
import { admin, authorize, teacher, student } from "../../middlewares/auth";
import q2s from "query-to-sequelize"
import Class from "../../utils/models/class";
import User from "../../utils/models/user";
import Section from "../../utils/models/section";
import Material from "../../utils/models/files";
import Students_Class from "../../utils/models/student_class";
import multer from "multer";
import { getMulterFields } from "../../utils/tools";
const classRouter = Router();


/* ROUTES: 
 * all need response consistency
GET:
   admin: 
          all => gives back ALL students FIXED
                 
   teacher:
           me => takes token and if valid gives back owned classes
                * needs to be moved to user route
                *needs redirection to login page 
   all
           me/enrolled => shows all classes you are enrolled in
                          *needs to be moved to user route
           classId => gets class data  FIXED
POST:
   admin:
   teacher:
           / => create new class FIXED
           classId/section => creates new section

   all:
           search => search for a class
                  * needs pagination
           enroll/classId => enrolls user in a class
PUT:
  admin:
  teacher:
          classId => edits class
                  *needs to become PATCH
  all:

DELETE:
  admin:
  teacher:
          classId => deletes class
  all:
        */


/*
MOCK BODY: 

{
  "name": "admin",
  "description": "admin"
}

 
*/


//! GETS
//ADMIN search for classes
classRouter.get(
  "/",
  authorize,
  admin,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // query structure: 
      // {
      //   page: 1,
      //   limit: 15,
      //   users: true,
      //   q: "math"
      // }

      const sqlQuery = q2s(req.query)
      const classes = await Class.findAll(sqlQuery)
      if (classes.length > 0) {
        res.status(200).send(classes);
      } else res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
);
//TEACHER get created classes
classRouter.get(
  //gives back created classes
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
          author: req.user.id,
        }
      });
      if (classes.length > 0) {
        res.status(200).send(classes);
      } else res.send({ status: 204, message: "Nothing here" });
    } catch (e) {
      next(e);
    }
  }
);
//STUDENT get enrolled
classRouter.get(
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
          UserUserId: req.user.id,
        },
      });
      let classes: Array<Class> = [];
      for (let i: number = 0; i < classes_stud.length; i++) {
        let s_class = await Class.findAll({
          where: {
            classId: classes_stud[i].ClassClassId,
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
//ALL get specific class
classRouter.get(
  "/:classId",
  authorize,
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const found = await Class.findAll({include: {model: Section, as: "sections"}})
      res.send(found)
    } catch (e) {
      next(e);
    }
  }
);


//ALL search class
classRouter.post( //why a post
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



//! POST

classRouter.post("/", 
authorize, teacher, admin, 
multer().fields([{ name: "name" }, { name: "description" }]), 
async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const newClass = await Class.create({ ...req.body, author: req.user.id })
    
    res.status(201).send(newClass)
  } catch (error) {
    next(error)
  }
})

classRouter.post(
  "/:classId/section",
  authorize,
  teacher,
  multer().fields(getMulterFields(Section.getAttributes(), ["ClassId"])),
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
        ...req.body,
        ClassId: req.params.classId,
      });
      res.send(section)
      // if (req.body.files) await Material.create({...req.body.files, section_ref: section.getDataValue("id")});

      // res.status(201).send({ message: "Created", id: section.id });
    } catch (e) {
      next(e);
    }
  }
);


classRouter.patch(
  "/:classId",
  // authorize,
  // teacher,
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const classes_stud = await Students_Class.findAll({
        where: {
          UserUserId: req.user.id,
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

classRouter.patch(
  "/section/:sectionId",
  // authorize,
  // teacher,
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const class_found = await Class.findByPk(req.params.class_id);
      if (class_found) {
        const sections = await Section.findAll({
          where: { ClassClassId: class_found.id },
        });

        let section_files = await Material.findAll({
          where: {
            section_ref: {
              [Op.or]: [sections.map((s) => s.id)],
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


classRouter.delete(
  "/:classId",
  // authorize,
  // teacher,
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await Class.destroy({ where: { id: req.params.classId } });
      res.status(204);
    } catch (e) {
      next(e);
    }
  }
);


classRouter.delete(
  "/:sectionId",
  // authorize,
  // teacher,
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await Class.destroy({ where: { id: req.params.sectionId } });
      res.status(204);
    } catch (e) {
      next(e);
    }
  }
);

export default classRouter
