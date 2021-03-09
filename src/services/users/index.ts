import  User  from "../../utils/models/user"
import {Request, Response, NextFunction} from "express"
import { Error } from "sequelize"
import { ValidationErrorItem } from "sequelize"
const user_router = require("express").Router()
const ApiError = require("../../utils/interfaces")
const bcryptjs = require("bcryptjs")
const moment = require("moment")

//ADMIN ROUTES: 
user_router.get("/admin", async(req:Request,res:Response,next:NextFunction):Promise<void>=> {
    try {
        //if (req.user) {
       const userdata = await User.findAll()
       if (userdata.length > 0) {
           res.status(200).send(userdata)
       } else {
           const error = await new ApiError({status: 204, message: "No content"})
           throw error.response.status + " " + error.response.message
        }
       //} else {
       // throw 401
       //}
    } catch (e) {
        next(e)
    }
})

user_router.get("/admin/:query/:identifier", async(req:Request, res:Response, next:NextFunction):Promise<void> => {
    //query is which column to search with
    //identifier is what to search 
    //example: /role/admin => returns all admins
    try {
        const userdata = await User.findAll({where: {
            [req.params.query]: [req.params.identifier]
        }})
        if (userdata.length > 0) {
            res.status(200).send(userdata)
        } else {
            const error = await new ApiError({status: 204, message: "No content"})
            throw error.response.status + " " + error.response.message
        }
    } catch (e) {
        next(e)
    }
})

//PUBLIC ROUTES
user_router.post("/", async(req:Request, res:Response, next:NextFunction):Promise<void>=> {
    try {
        const user = await User.create({...req.body, password: await bcryptjs.hash(req.body.password, 10), birthday: moment(req.body.birthday) })
        res.status(201).send(user)
    } catch (e) {
        if (e.errors) {
            const errors:Array<ValidationErrorItem> = e.errors
            errors.forEach(async error => {
                if (error.type === "notNull Violation") {
                    const notNull_error = await new ApiError({status: 400, message: `Missing ${error.path}`})
                    next(notNull_error.response.status + " " + notNull_error.response.message)
                } else if (error.type ==="unique violation") {
                    const unique_error = await new ApiError({status: 400, message: `${error.path} already in use!` })
                    next(unique_error.response.status + " " + unique_error.response.message)
                }
            });
        }
        else next(e)
    }
})

user_router.put("/:id", async(req:Request, res:Response, next:NextFunction):Promise<void> => {
    try {
        //needs some user validation: you can only edit your own profile
        const edited_user = await User.update(req.body, {
            where: {
                user_id: req.params.id 
            }
        })
        if (edited_user[0] === 1) res.status(201).send("Updated") 
        else {
            const error = await new ApiError({status: 304, message: `Not modified` })
            throw error.response.status + " " + error.response.message
        }
        res.send(edited_user)
    } catch (e) {
        next(e)
    }
})

user_router.delete("/:id", async(req:Request, res:Response, next:NextFunction):Promise<void> => {
    try {
        //needs some user validation: you can only edit your own profile
        const deleted = await User.destroy({
            where: {
                user_id: req.params.id 
            }
        })
        if (deleted === 1) {
            res.status(204)
        } else {
            const error = await new ApiError({status: 400, message: `User not found` })
            throw error.response.status + " " + error.response.message
        }
    } catch (e) {
        next(e)
    }
})

module.exports = user_router