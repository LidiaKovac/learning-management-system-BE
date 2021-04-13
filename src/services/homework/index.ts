
//GENERAL
const hw_router = require("express").Router()
import Homework from "../../utils/models/homework"

import { Request, Response, NextFunction } from "express"
import { admin, authorize, student, teacher } from "../../middlewares/auth"
import { RequestWithUser } from "../../utils/interfaces"

hw_router.get(
	"/admin/all",
	authorize,
	admin,
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const hw = await Homework.findAll()
			if (hw.length > 0) {
				res.status(200).send(hw)
			} else res.status(204)
		} catch (e) {
			next(e)
		}
	}
)

hw_router.post("/:event_id", authorize, student, async(req: RequestWithUser, res: Response, next: NextFunction):Promise<void> => {
    try {
        console.log(req.body)
        const new_homework = await Homework.create({content: req.body.content, 
            author: req.user.user_id, 
            EventEventId: req.params.event_id
        })
        res.status(201).send({message: new_homework})
    } catch (e) {
        next(e)
    }
} )

hw_router.get("/created/me", authorize, teacher, async(req: RequestWithUser, res: Response, next: NextFunction):Promise<void> => {
    //GET HW SUBMITTED BY LOGGED USER
    try {
        const events = await Homework.findAll({where: {
            author: req.user.user_id
        }})
        if (events.length>0) {
            res.status(200).send(events)
        } else res.status(204)
    } catch (e) {
        next(e)
    }
} )

hw_router.get("/:event_id", authorize, async(req: RequestWithUser, res: Response, next: NextFunction):Promise<void> => {
    try {
        const hw = await Homework.findAll({where: {
            EventEventId: req.params.event_id
        }})
        if (hw.length>0) {
            res.status(200).send({status: 200, content: hw})
        } else res.json(204).send({status: 204, message: "Nothing was found"})
    } catch (e) {
        next(e)
    }
} )

hw_router.put("/:hw_id", authorize, async(req: RequestWithUser, res: Response, next: NextFunction):Promise<void> => {
    try {
        const event = await Homework.update(req.body, {where: {event_id: req.params.event_id}})
        if (event) {
            res.status(304)
        } else res.status(204)
    } catch (e) {
        next(e)
    }
} )

hw_router.put("/grade/:hw_id", authorize, teacher, async(req: RequestWithUser, res: Response, next: NextFunction):Promise<void> => {
    try {
        const hw = await Homework.update(req.body, {where: {event_id: req.params.event_id}})
        if (hw) {
            res.status(304)
        } else res.status(204)
    } catch (e) {
        next(e)
    }
} )

hw_router.delete("/:hw_id", authorize, teacher, async(req: RequestWithUser, res: Response, next: NextFunction):Promise<void> => {
    try {
        await Homework.destroy({where: {event_id: req.params.event_id}})
            res.status(204)
    } catch (e) {
        next(e)
    }
} )






module.exports = hw_router
