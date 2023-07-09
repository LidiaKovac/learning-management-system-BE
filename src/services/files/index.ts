// // //GLOBALS for FIREBASE
// (global as any).XMLHttpRequest = require("xhr2");
// (global as any).WebSocket = require("ws");
require("dotenv").config();
import { config } from "dotenv"
config()

// //GENERAL

import Files from "../../utils/models/files";

import { Router, Request, Response, NextFunction } from "express";
import { admin, authorize } from "../../middlewares/auth";
import multer from "multer";
import Material from "../../utils/models/files";
import { getMulterFields } from "../../utils/tools";
const {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJ_ID,
  FIREBASE_BUCKET,
  FIREBASE_MESSAGING_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
} = process.env;

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJ_ID,
  storageBucket: FIREBASE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

// firebase.initializeApp(firebaseConfig);
// //FIREBASE / FILE UPLOAD


const filesRouter = Router();


// //ADMIN ROUTES
// filesRouter.get(
//   "/admin/all",
//   authorize,
//   admin,
//   async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//       const files = await Files.findAll();
//       if (files.length > 0) {
//         res.status(200).send(files);
//       } else res.status(204);
//     } catch (e) {
//       next(e);
//     }
//   }
// );

//PUBLIC ROUTES
filesRouter.get(
  "/me",
  authorize,
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const files = await Files.findAll({
        where: {
          UserUserId: req.user.id,
        },
        attributes: ["description", "name", "type", "file_id"],
      });
      if (files.length > 0) {
        res.status(200).send({ status: 200, content: files });
      } else res.send({ status: 204, content: [] });
    } catch (e) {
      next(e);
    }
  }
);


filesRouter.post(
  "/upload/",
  authorize,
  multer().any(),
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // const files = req.files as Express.Multer.File[]
      // const fileTypes = ["image", "pdf", "video", "audio"]
      // if (!fileTypes.includes(req.body.type)) {
      //   res.status(400).send("Please enter a valid file type!")
      // }
      // let ref = firebase.storage().ref();
      // let file_ref = ref.child(`/lms_${req.body.type}/${files[0].originalname}`);
      // let bytes = new Uint8Array(files[0].buffer);
      // await file_ref.put(bytes, 
      //   req.body.type === "pdf" ? { contentType: "application/pdf" } 
      //   : req.body.type === "video" ? { contentType: "video/mp4" } 
      //   : req.body.type === "audio" ? {contentType :"audio/mp3"} : undefined );

      // const new_file = await Files.create({
      //   ...req.body,
      //   file: await file_ref.getDownloadURL(),
      //   UserId: req.user.id,
      // });
      // res.status(201).send({ status: 201, path: new_file.file });
    } catch (e) {
      next(e);
    }
  }
);


filesRouter.get(
  "/download/:file_id",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const file = await Material.findByPk(req.params.file_id)
      res.setHeader('Content-disposition', `attachment`)
      res.setHeader("Content-Type", "media-type")
      res.send(file)
    } catch (e) {
      next(e);
    }
  }
);

filesRouter.put(
  "/:file_id",
  authorize,
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const file = await Files.findAll({
        where: {
          file_id: req.params.file_id,
          UserUserId: req.user.id,
        },
      });
      if (file.length > 0) {

        const edited_file = await Files.update(
          { ...req.body },
          {
            where: {
              file_id: req.params.file_id,
            },
          }
        );
        if (edited_file[0] === 1)
          res.status(201).send({ status: 201, message: "Updated", file_id: req.params.file_id });
        else res.status(304).send({ message: "Not modified" });
      } else {
        res
          .status(400)
          .send({
            message:
              "This file doesn't exist or you are not allowed to modify it",
          });
      }
    } catch (e) {
      next(e);
    }
  }
);
filesRouter.delete(
  "/:file_id",
  authorize,
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const file = await Files.findAll({
        where: {
          file_id: req.params.file_id,
          UserUserId: req.user.id,
        },
      });
      if (file.length > 0) {
        const deleted_file = await Files.destroy({
          where: {
            file_id: req.params.file_id,
          },
        });
        if (deleted_file === 1) res.status(200).send("Deleted");
        else {
          res.status(204);
        }
      } else {
        res
          .status(400)
          .send("This file doesn't exist or you are not allowed to modify it");
      }
    } catch (e) {
      next(e);
    }
  }
);

export default filesRouter;
