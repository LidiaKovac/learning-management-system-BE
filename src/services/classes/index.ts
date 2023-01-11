//GENERAL

import { Op } from "sequelize";
import { Request, Response, NextFunction, Router } from "express";
// import { admin, authorize, teacher, student } from "../../middlewares/auth";
import Class from "../../utils/models/class";
import User from "../../utils/models/user";
import Section from "../../utils/models/section";
import Material from "../../utils/models/files";
import user from "../../utils/models/user";
import { ObjectId } from "mongoose";
const class_router = Router();


/* ROUTES: 
 * all need resposane consistency
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

class_router.get(
  "/all",
  // admin,
  // authorize,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // query structure: 
      // {
      //   page: 1,
      //   limit: 15,
      //   users: true,
      //   q: "math"
      // }
      const { page = 1, limit = 5, users = "false", q = "" } = req.query
      const classes = await Class.find({
        name: {
          $regex: q, $options: "i"
        }
      }).limit(limit as number)
        .skip(limit as number * (page as number - 1))
        .populate(users === "true" ? "author" : "") //=> needs testing
      if (classes.length > 0) {
        res.status(200).send(classes);
      } else res.status(204);
    } catch (e) {
      next(e);
    }
  }
);
// class_router.get(
//   "/me",
//   authorize,
//   teacher,
//   async (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ): Promise<void> => {
//     try {
//       const classes = await Class.findAll({
//         where: {
//           author: req.user.user_id,
//         },
//       });
//       if (classes.length > 0) {
//         res.status(200).send(classes);
//       } else res.send({ status: 204, message: "Nothing here" });
//     } catch (e) {
//       next(e);
//     }
//   }
// );
// class_router.get(
//   "/me/enrolled",
//   authorize,
//   student,
//   async (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ): Promise<void> => {
//     try {
//       const classes_stud = await Students_Class.findAll({
//         where: {
//           UserUserId: req.user.user_id,
//         },
//       });
//       let classes: Array<Class> = [];
//       for (let i: number = 0; i < classes_stud.length; i++) {
//         let s_class = await Class.findAll({
//           where: {
//             classId: classes_stud[i].ClassClassId,
//           },
//         });
//         classes = [...classes, ...s_class];
//       }
//       if (classes.length > 0) {
//         res.status(200).send(classes);
//       } else res.send({ status: 204, message: "Nothing here" });
//     } catch (e) {
//       next(e);
//     }
//   }
// );

class_router.get(
  "/:classId",
  // authorize,
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const foundClass = await Class.findById(req.params.classId).populate("sections");

      if (foundClass) {
        res.status(200).send(foundClass)
      } else res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
);


class_router.post(
  "/",
  // authorize,
  // teacher,
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      let newClass = new Class(req.body);
      await newClass.save()
      res.status(201).send({ message: "Created" });
    } catch (e) {
      next(e);
    }
  }
);

// class_router.post(
//   "/search",
//   authorize,
//   async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//       const classes = await Class.findAll({
//         where: {
//           name: {
//             [Op.iLike]: `%${req.body.query}%`,
//           },
//         },
//       });
//       if (classes.length > 0) res.status(200).send(classes);
//       else res.send({ message: "Nothing here" });
//     } catch (e) {
//       next(e);
//     }
//   }
// );
// class_router.post(
//   "/enroll/:classId",
//   authorize,
//   async (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ): Promise<void> => {
//     try {
//       const class_to_enroll = await Class.findOne({
//         where: {
//           classId: req.params.classId,
//         },
//       });
//       const user = await User.findByPk(req.user.user_id?.toString());

//       if (class_to_enroll && user) {
//         const enroll = await Students_Class.create({
//           ClassClassId: req.params.classId,
//           UserUserId: req.user.user_id,
//         });
//         if (enroll) res.send({ message: "Enrolled" });
//         else res.send({ message: "Something went wrong" });
//       } else res.status(404).send({ message: "User or Class not found" });
//       //await Students_Class.create({ClassClassId: req.params.classId, UserUserId: req.user.user_id})
//     } catch (e) {
//       next(e);
//     }
//   }
// );


class_router.post(
  "/:classId/section",
  // authorize,
  // teacher,
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

      const newSection = new Section({ ...req.body, class: req.params.classId })
      if (newSection) {
        let parentClass = await Class.findByIdAndUpdate(req.params.classId, {

          $push: { sections: newSection._id }

        })
        if (parentClass) {
          await newSection.save()
          res.send(newSection)
        } else res.status(400).send({ data: [], error: "Class not found" })
      } else res.sendStatus(400)
      // if (req.body.files) await Material.create({...req.body.files, section_ref: section.getDataValue("section_id")});

    } catch (e) {
      next(e);
    }
  }
);


class_router.patch(
  "/:classId",
  // authorize,
  // teacher,
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await Class.findByIdAndUpdate(req.params.classId, req.body)
      res.sendStatus(204)
    } catch (e) {
      next(e);
    }
  }
);

class_router.patch(
  "/section/:sectionId",
  // authorize,
  // teacher,
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await Section.findByIdAndUpdate(req.params.sectionId, req.body)
      res.sendStatus(204)
    } catch (e) {
      next(e);
    }
  }
);


class_router.delete(
  "/:classId",
  // authorize,
  // teacher,
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await Class.findByIdAndDelete(req.params.classId);
      res.status(204);
    } catch (e) {
      next(e);
    }
  }
);


class_router.delete(
  "/:sectionId",
  // authorize,
  // teacher,
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await Class.findByIdAndDelete(req.params.sectionId);
      res.status(204);
    } catch (e) {
      next(e);
    }
  }
);

export default class_router
