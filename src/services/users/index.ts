import  User  from "../../utils/models/user"
import {Request, Response, NextFunction} from "express"
import { authorize, admin, student, teacher } from "../../middlewares/auth"
import { RequestWithUser } from "../../utils/interfaces"
const user_router = require("express").Router()
const ApiError = require("../../utils/interfaces")

//ADMIN ROUTES: 
user_router.get("/admin", authorize, admin, async(req:Request,res:Response,next:NextFunction):Promise<void>=> {
    try {
        //if (req.cookie("token")) {
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

user_router.get("/admin/:query/:identifier", authorize, admin, async(req:Request, res:Response, next:NextFunction):Promise<void> => {
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
user_router.put("/admin/:id", authorize, admin, async(req:Request, res:Response, next:NextFunction):Promise<void> => {
    try {
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
user_router.delete("/admin/:id", authorize,admin, async(req:Request, res:Response, next:NextFunction):Promise<void> => {
    try {
        //needs some user validation: you can only edit your own profile
        await User.destroy({
            where: {
                user_id: req.params.id 
            }
        })
            res.status(204)

    } catch (e) {
        next(e)
    }
})

//PUBLIC ROUTES
//creation of users moved to login 

user_router.put("/me", authorize, async(req:RequestWithUser, res:Response, next:NextFunction):Promise<void> => {
    try {
        if (req.user) {
            const edited_user = await User.update(req.body, {
                where: {
                    user_id: req.user.user_id 
                }
            })
            if (edited_user[0] === 1) res.status(201).send("Updated") 
            else {
                const error = await new ApiError({status: 304, message: `Not modified` })
                throw error.response.status + " " + error.response.message
            }
        } else {
            const error = await new ApiError({status: 204, message: `User not found` })
            throw error.response.status + " " + error.response.message 
        }
        
    } catch (e) {
        next(e)
    }
})

user_router.delete("/me", authorize, async(req:RequestWithUser, res:Response, next:NextFunction):Promise<void> => {
    try {
        if (req.user) {
            const deleted_user = await User.destroy({
                where: {
                    user_id: req.user.user_id 
                }
            })
            if (deleted_user === 1) res.status(200).send("Deleted")
            else {
                const error = await new ApiError({status: 204, message: `User not found` })
                throw error.response.status + " " + error.response.message
            }
        } else {
            const error = await new ApiError({status: 204, message: `User not found` })
            throw error.response.status + " " + error.response.message 
        }
    } catch (e) {
        next(e)
    }
})

module.exports = user_router