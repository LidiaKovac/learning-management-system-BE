//GLOBALS for FIREBASE
(global as any).XMLHttpRequest = require("xhr2");
(global as any).WebSocket = require("ws");
require("dotenv").config();

//GENERAL
const files_router = require("express").Router();

import Files from "../../utils/models/files";

import { Request, Response, NextFunction } from "express";
import { admin, authorize } from "../../middlewares/auth";
import { RequestWithUser } from "../../utils/interfaces";

//ENVIRONMENT
const {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJ_ID,
  FIREBASE_BUCKET,
  FIREBASE_MESSAGING_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
} = process.env;

//FIREBASE / FILE UPLOAD
import multer from "multer";
import firebase from "firebase";
import "firebase/storage";
import Material from "../../utils/models/files";

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJ_ID,
  storageBucket: FIREBASE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

//ADMIN ROUTES
files_router.get(
  "/admin/all",
  authorize,
  admin,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const files = await Files.findAll();
      if (files.length > 0) {
        res.status(200).send(files);
      } else res.status(204);
    } catch (e) {
      next(e);
    }
  }
);

//PUBLIC ROUTES
files_router.get(
  "/me",
  authorize,
  async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const files = await Files.findAll({
        where: {
          UserUserId: req.user.user_id,
        },
        attributes: ["description", "name", "type", "file_id"],
      });
      if (files.length > 0) {
        res.status(200).send({ status: 200, content: files });
      } else res.send({status: 204, content: []});
    } catch (e) {
      next(e);
    }
  }
);

files_router.post(
  "/upload/markdown",
  authorize,
  async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const new_file = await Files.create({
        ...req.body,
        UserUserId: req.user.user_id,
        description: req.body.material,
      });
      if (new_file) {
        res
          .status(201)
          .send({
            status: 201,
            content: "Succesfully created.",
            file_id: new_file.file_id,
          });
      }
    } catch (e) {
      res.send(e);
      next(e);
    }
  }
);

files_router.post(
  "/upload/image",
  authorize,
  multer().single("material"),
  async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      let ref = firebase.storage().ref();
      let file_ref = ref.child(`/lms_images/${req?.file?.originalname}`);
      let bytes = await new Uint8Array(req.file.buffer);
      await file_ref.put(bytes); //don't need content type as I already tested it works without specifying
      const new_file = await Files.create({
        ...req.body,
        description: await file_ref.getDownloadURL(),
        UserUserId: req.user.user_id,
      });
      res.status(201).send({ status: 201, path: new_file.description });
    } catch (e) {
      next(e);
    }
  }
);

files_router.post(
  "/upload/pdf",
  authorize,
  multer().single("material"),
  async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      let ref = firebase.storage().ref();
      //file_ref creates a ref for the file and the folder it's going to be uploaded in
      let file_ref = ref.child(`/lms_pdf/${req?.file?.originalname}`);
      let bytes = await new Uint8Array(req.file.buffer); //creates a byte array
      await file_ref.put(bytes, { contentType: "application/pdf" }); //IMPORTANT
      const new_file = await Files.create({
        ...req.body,
        description: await file_ref.getDownloadURL(),
        UserUserId: req.user.user_id,
      });
      res.status(201).send({ status: 201, path: new_file.description });
    } catch (e) {
      next(e);
    }
  }
);
files_router.post(
  "/upload/video",
  authorize,
  multer().single("material"),
  async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      let ref = firebase.storage().ref();
      let file_ref = ref.child(`/lms_videos/${req?.file?.originalname}`);
      let bytes = await new Uint8Array(req.file.buffer);
      await file_ref.put(bytes, { contentType: "video/mp4" }); //IMPORTANT
      const new_file = await Files.create({
        ...req.body,
        description: await file_ref.getDownloadURL(),
        UserUserId: req.user.user_id,
      });
      res.status(201).send({ status: 201, path: new_file.description });
    } catch (e) {
      next(e);
    }
  }
);
files_router.post(
  "/upload/audio",
  authorize,
  multer().single("material"),
  async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      let ref = firebase.storage().ref();
      let file_ref = ref.child(`/lms_audios/${req?.file?.originalname}`);
      let bytes = await new Uint8Array(req.file.buffer);
      await file_ref.put(bytes, { contentType: "audio/mp3" }); //IMPORTANT
      const new_file = await Files.create({
        ...req.body,
        description: await file_ref.getDownloadURL(),
        UserUserId: req.user.user_id,
      });
      res.status(201).send({ status: 201, path: new_file.description });
    } catch (e) {
      next(e);
    }
  }
);

files_router.get(
  "/download/:file_id",
  async (
    req: RequestWithUser,
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

files_router.put(
  "/:file_id",
  authorize,
  async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const file = await Files.findAll({
        where: {
          file_id: req.params.file_id,
          UserUserId: req.user.user_id,
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
files_router.delete(
  "/:file_id",
  authorize,
  async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const file = await Files.findAll({
        where: {
          file_id: req.params.file_id,
          UserUserId: req.user.user_id,
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

module.exports = files_router;
