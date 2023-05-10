import User from "../../utils/models/user"
import { Request, Response, NextFunction } from "express"
import { ValidationErrorItem } from "sequelize"
const login_router = require("express").Router()
const bcryptjs = require("bcryptjs")
import multer from "multer"
const bcrypt = require("bcrypt")
const moment = require("moment")
import { cloudinaryMulter_img } from "../../utils/config/cloudinary"
import { authenticate, authorize } from "../../middlewares/auth"
import { checkPassword } from "../../utils/tools"

//PUBLIC ROUTES
login_router.post(
  "/new",
  cloudinaryMulter_img.single("propic"),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        let pass = await bcryptjs.hash(req.body.password, 10)
      const user = await User.create({
        ...req.body,
        password: pass,
        role: req.body.role === "on" ? "student" : "admin",
        propic: req.file?.path || "https://placehold.it/200x200",
      })

      res.status(201).send({ message: "Created", status: 201 })
    } catch (e: any) {
      next(e)
    }
  }
)

login_router.post(
  "/", multer().fields([{name: "email"}, {name: "password"}]),
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (
        !req.body.email ||
        !req.body.password ||
        (!req.body.email && !req.body.password)
      ) {
        res.status(400).send({ message: "Email or password not provided" })
      } else {
        const found_user = await User.findAll({
          where: {
            email: req.body.email,
          },
        })
        if (found_user[0]) {
          
          if (await checkPassword(req.body.password, found_user[0].password )) {
            const token = await authenticate(
              found_user[0].id,
              found_user[0].birthday
            )
            req.user = {
              id: found_user[0].id,
              birthday: found_user[0].birthday,
              status: "succ",
            }
            res.send({ message: "Logged in", token: token })
          } else {
            res.status(400).send({ message: "Wrong email or password" })
          }
        } else {
          res
            .status(401)
            .send({ message: "Email doesn't exist in our database" })
        }
      }
    } catch (e) {
      next(e)
    }
  }
)

//Logged in ONLY routes:

login_router.get(
  "/me",
  authorize,
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    //gets logged in user's info
    try {
      if (req?.user?.id) {
        const logged_user = await User.findByPk(req.user.id!) //user_id can be null not so ! must be there

        if (logged_user) {
          res.status(200).send({
            message: {
              name: logged_user.name,
              last_name: logged_user.lastName,
              email: logged_user.email,
              pronouns: logged_user.pronouns,
              role: logged_user.role,
            },
          })
        } else res.status(404).send({ message: "User not found." })
      } else res.status(401).send({ message: "Please login first." })
    } catch (e) {
      next(e)
    }
  }
)

login_router.get(
  "/logout",
  authorize,
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await res.clearCookie("user")
      await res.clearCookie("token")
      res.send("Cookies cleared.")
    } catch (e) {
      next(e)
    }
  }
)

export default login_router
