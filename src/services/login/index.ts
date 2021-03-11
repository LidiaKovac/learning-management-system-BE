import  User  from "../../utils/models/user"
import {Request, Response, NextFunction} from "express"
import { ValidationErrorItem } from "sequelize"
const ApiError = require("../../utils/interfaces")
const login_router = require("express").Router()
const bcryptjs = require("bcryptjs")
const bcrypt = require("bcrypt")
const moment = require("moment")
import {cloudinaryMulter_img} from "../../utils/config/cloudinary"
import { authenticate, authorize } from "../../middlewares/auth"
import { RequestWithUser } from "../../utils/interfaces"

//PUBLIC ROUTES 
login_router.post("/new", cloudinaryMulter_img.single("profile_picture"), async(req:Request, res:Response, next:NextFunction):Promise<void>=> {
    try {
        console.log(req.files)
        const user = await User.create({...req.body, password: await bcryptjs.hash(req.body.password, 10), birthday: moment(req.body.birthday), profile_picture : req.file.path })
        res.status(201).send(user)
    } catch (e) {
        if (e.errors) {
            const errors:Array<ValidationErrorItem> = e.errors
            errors.forEach(async error => {
                if (error.type === "notNull Violation") {
                    res.status(400).send(`Missing ${error.path}`)
                    next(e)
                } else if (error.type ==="unique violation") {
                    res.status(400).send(`${error.path} already in use!`)
                    next(e)
                }
            });
        }
        else next(e)
    }
})

login_router.post("/", async(req:Request, res:Response, next:NextFunction):Promise<void> => { 
    try {
       if (!req.body.email || !req.body.password || (!req.body.email && !req.body.password)) {
        const error = await new ApiError({status: 400, message: `Email or password not provided` })
        next(error.response.status + " " + error.response.message)
       } else {
           const found_user = await User.findAll({where: {
               email: req.body.email
           }}) 
           if (found_user[0]) {
               const is_correct = await bcrypt.compare(req.body.password, found_user[0].password)
               if (is_correct) {
                   const token = await authenticate(found_user[0].user_id, found_user[0].birthday)
                   res.cookie("token", token)
                   res.cookie("user", found_user[0].email)
                   res.send("Logged in")
               }
               else {
                   res.status(400).send("Wrong email or password")
               }
           } else {
               res.status(401).send("Email doesn't exist in our database")
           }
       }
    } catch (e) {
        next(e)
    }
})

//Logged in ONLY routes: 

login_router.get("/me", authorize, async(req:RequestWithUser, res:Response, next:NextFunction):Promise<void> => { //gets logged in user's info
    try {
        const logged_user = await User.findByPk(req.user.user_id)
        res.send(logged_user)
    } catch (e) {
        next(e)
    }
})

login_router.get("/logout", authorize, async(req:RequestWithUser, res:Response, next:NextFunction):Promise<void> => {
    try {
        await res.clearCookie("user")
        await res.clearCookie("token")
        res.send("Cookies cleared.")
    } catch (e) {
        next(e)
    }
})


module.exports = login_router