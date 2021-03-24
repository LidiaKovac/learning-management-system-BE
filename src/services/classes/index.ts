
//GENERAL
const class_router = require("express").Router()

import { Request, Response, NextFunction } from "express"
import { admin, authorize, teacher, student } from "../../middlewares/auth"
import { RequestWithUser } from "../../utils/interfaces"
import Class from "../../utils/models/class"
import Students_Class from "../../utils/models/student_class"
import User from "../../utils/models/user"

class_router.get(
	"/admin/all",
    admin,
	authorize,
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const events = await Class.findAll()
			if (events.length > 0) {
				res.status(200).send(events)
			} else res.status(204)
		} catch (e) {
			next(e)
		}
	}
)

class_router.post("/", authorize, teacher, async(req: Request, res: Response, next: NextFunction):Promise<void> => {
    try {
        await Class.create(req.body)
        res.status(201).send({message: "Created"})
    } catch (e) {
        next(e)
    }
} )

class_router.post("/enroll/:class_id", authorize, async(req: RequestWithUser, res: Response, next: NextFunction):Promise<void> => {
    try {
        const class_to_enroll = await Class.findOne({where: {
            class_id: req.params.class_id
        }})
        const user = await User.findByPk(req.user.user_id?.toString())
        console.log(class_to_enroll, user)
        if (class_to_enroll && user) {

            const enroll = await Students_Class.create({ClassClassId: req.params.class_id, UserUserId: req.user.user_id})
            if (enroll) res.send({message: "Enrolled"}) 
            else res.send({message: "Something went wrong"})
        } else res.status(404).send({message: "User or Class not found"})
        //await Students_Class.create({ClassClassId: req.params.class_id, UserUserId: req.user.user_id})
        
    } catch (e) {
        next(e)
    }
} )

class_router.get("/me", authorize, async(req: RequestWithUser, res: Response, next: NextFunction):Promise<void> => {
    try {
        const events = await Class.findAll({where: {
            UserUserId: req.user.user_id
        }})
        if (events.length>0) {
            res.status(200).send(events)
        } else res.status(204)
    } catch (e) {
        next(e)
    }
} )

class_router.get("/:class_id", authorize, async(req: RequestWithUser, res: Response, next: NextFunction):Promise<void> => {
    try {
        const event = await Class.findByPk(req.params.class_id)
        if (event) {
            res.status(200).send(event)
        } else res.status(204)
    } catch (e) {
        next(e)
    }
} )

class_router.put("/:class_id", authorize, teacher, async(req: RequestWithUser, res: Response, next: NextFunction):Promise<void> => {
    try {
        const event = await Class.update(req.body, {where: {class_id: req.params.class_id}})
        if (event) {
            res.status(304)
        } else res.status(204)
    } catch (e) {
        next(e)
    }
} )

class_router.delete("/:class_id", authorize, teacher, async(req: RequestWithUser, res: Response, next: NextFunction):Promise<void> => {
    try {
        await Class.destroy({where: {class_id: req.params.class_id}})
            res.status(204)
    } catch (e) {
        next(e)
    }
} )






module.exports = class_router
