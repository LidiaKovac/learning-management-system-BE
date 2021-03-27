
//GENERAL
const event_router = require("express").Router()

import EventM from "../../utils/models/event"

import { Request, Response, NextFunction } from "express"
import { admin, authorize, teacher } from "../../middlewares/auth"
import { RequestWithUser } from "../../utils/interfaces"
import Class from "../../utils/models/class"
import Students_Class from "../../utils/models/student_class"

event_router.get(
	"/admin/all",
	authorize,
	admin,
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const events = await EventM.findAll()
			if (events.length > 0) {
				res.status(200).send(events)
			} else res.status(204)
		} catch (e) {
			next(e)
		}
	}
)

event_router.post("/", authorize, teacher, async(req: RequestWithUser, res: Response, next: NextFunction):Promise<void> => {
    try {
        const new_event = await EventM.create({...req.body, UserUserId: req.user.user_id})
        res.status(201).send({message: new_event})
    } catch (e) {
        next(e)
    }
} )

event_router.get("/created/me", authorize, teacher, async(req: RequestWithUser, res: Response, next: NextFunction):Promise<void> => {
    //GET EVENTS CREATED BY LOGGED USER
    try {
        const events = await EventM.findAll({where: {
            UserUserId: req.user.user_id
        }})
        if (events.length>0) {
            res.status(200).send(events)
        } else res.status(204)
    } catch (e) {
        next(e)
    }
} )

event_router.get("/me", authorize, async(req: RequestWithUser, res: Response, next: NextFunction):Promise<void> => {
    //GETS EVENTS WHOSE STUDENT IS INVITED TO 
    try {
        const classes = await Students_Class.findAll({where: {
            UserUserId: req.user.user_id
        }})
        let events:Array<EventM> = []
        for (let i:number = 0; i < classes.length; i++ ) {
            let s_event = await EventM.findAll({where: {
                ClassClassId: classes[i].ClassClassId
            }} )
            events = [...events, ...s_event]
        }
        if (events.length>0) {
            res.status(200).send({status: 200, content: events})
        } else res.json(204).send({status: 204, message: "Nothing was found"})
    } catch (e) {
        next(e)
    }
} )

event_router.get("/search/id/:event_id", authorize, async(req: RequestWithUser, res: Response, next: NextFunction):Promise<void> => {
    try {
        const event = await EventM.findByPk(req.params.event_id)
        if (event) {
            res.status(200).send(event)
        } else res.status(204)
    } catch (e) {
        next(e)
    }
} )
event_router.get("/search/date/:date", authorize, async(req: RequestWithUser, res: Response, next: NextFunction):Promise<void> => {
    try {
        const event = await EventM.findAll({where: {
            startDate: req.params.date 
        }})
        if (event) {
            res.status(200).send(event)
        } else res.status(204)
    } catch (e) {
        next(e)
    }
} )

event_router.put("/:event_id", authorize, teacher, async(req: RequestWithUser, res: Response, next: NextFunction):Promise<void> => {
    try {
        const event = await EventM.update(req.body, {where: {event_id: req.params.event_id}})
        if (event) {
            res.status(304)
        } else res.status(204)
    } catch (e) {
        next(e)
    }
} )

event_router.delete("/:event_id", authorize, teacher, async(req: RequestWithUser, res: Response, next: NextFunction):Promise<void> => {
    try {
        await EventM.destroy({where: {event_id: req.params.event_id}})
            res.status(204)
    } catch (e) {
        next(e)
    }
} )






module.exports = event_router
