import  User  from "../../utils/models/user"
import {Request, Response, NextFunction} from "express"
// import {Object } from "sequelize"
const login_router = require("express").Router()
const bcryptjs = require("bcryptjs")
const bcrypt = require("bcrypt")
const moment = require("moment")
import {cloudinaryMulter_img} from "../../utils/config/cloudinary"
import { authenticate, authorize } from "../../middlewares/auth"

//PUBLIC ROUTES 
login_router.post("/new", cloudinaryMulter_img.single("profile_picture"), async(req:Request, res:Response, next:NextFunction):Promise<void>=> {
    try {
        
        await User.create({...req.body, password: await bcryptjs.hash(req.body.password, 10), birthday: moment(req.body.birthday), profile_picture : req.file ? req.file.path : "https://placehold.it/200x200" })
        res.status(201).send({message: "Created", status: 201})
    } catch (e:any) {
        if (e.errors) {
            const errors:Array<{type: string, path: string}> = e.errors
            //look for sql error type
            errors.forEach(async error => {
                if (error.type === "notNull Violation") {
                    res.status(400).send({message: `Missing ${error.path}`, status: 400})
                    next(e)
                } else if (error.type ==="unique violation") {
                    res.status(400).send({message: `${error.path} already in use!`, status: 400})
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
        res.status(400).send({message: "Email or password not provided"})
       } else {
           const found_user = await User.findAll({where: {
               email: req.body.email
           }}) 
           if (found_user[0]) {
               const is_correct = await bcrypt.compare(req.body.password, found_user[0].password)
               if (is_correct) {
                   const token = await authenticate(found_user[0].user_id, found_user[0].birthday)
                   req.user = {user_id: found_user[0].user_id, birthday: found_user[0].birthday, status: "succ"}
                   res.send({message: "Logged in", token: token})
               }
               else {
                   res.status(400).send({message: "Wrong email or password"})
               }
           } else {
               res.status(401).send({message: "Email doesn't exist in our database"})
           }
       }
    } catch (e) {
        next(e)
    }
})

//Logged in ONLY routes: 

login_router.get("/me", authorize, async(req:Request, res:Response, next:NextFunction):Promise<void> => { //gets logged in user's info
    try {
        if (req?.user?.user_id) {

            const logged_user = await User.findByPk(req.user.user_id!) //user_id can be null not so ! must be there

            if (logged_user) {
                res.status(200).send({message: {
                    name: logged_user.name, 
                    last_name: logged_user.last_name, 
                    email: logged_user.email, 
                    pronouns: logged_user.pronouns, 
                    role: logged_user.role
                }})
            }
            else res.status(404).send({message: "User not found."})
        } else res.status(401).send({message: "Please login first."})
    } catch (e) {
        next(e)
    }
})

login_router.get("/logout", authorize, async(req:Request, res:Response, next:NextFunction):Promise<void> => {
    try {
        await res.clearCookie("user")
        await res.clearCookie("token")
        res.send("Cookies cleared.")
    } catch (e) {
        next(e)
    }
})


export default login_router