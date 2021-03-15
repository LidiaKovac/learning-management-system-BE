import User from "../../utils/models/user"
import Files from "../../utils/models/files"
import { Request, Response, NextFunction } from "express"
import { ValidationErrorItem } from "sequelize"
import {
	cloudinaryMulter_img,
	cloudinaryMulter_video,
	cloudinaryMulter_pdf,
	cloudinaryMulter_audio,
} from "../../utils/config/cloudinary"
import { admin, authorize } from "../../middlewares/auth"
import { RequestWithUser } from "../../utils/interfaces"
import multer from "multer"

const cloudinary = require("cloudinary").v2
const ApiError = require("../../utils/interfaces")
const files_router = require("express").Router()

//ADMIN ROUTES
files_router.get(
	"/admin/all",
	authorize,
	admin,
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const files = await Files.findAll()
            if (files.length>0) {
                res.status(200).send(files)
            } else res.status(204)
		} catch (e) {
			next(e)
		}
	}
)
//PUBLIC ROUTES
files_router.post(
	"/upload/image",
	authorize,
	cloudinaryMulter_img.single("material"),
	async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		console.log(req.files)
		try {
			const new_file = await Files.create({
				...req.body,
				description: req.file.path,
				UserUserId: req.user.user_id,
			})
			res.send(new_file)
		} catch (e) {
			next(e)
		}
	}
)
files_router.post(
	"/upload/pdf",
	authorize,
	cloudinaryMulter_pdf.single("material"),
	async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const new_file = await Files.create({
				...req.body,
				description: req.file.path,
				UserUserId: req.user.user_id,
			})
			res.status(201).send(new_file)
		} catch (e) {
			if (e.errors) {
				const errors: Array<ValidationErrorItem> = e.errors
				errors.forEach(async (error) => {
					if (error.type === "notNull Violation") {
						res.status(400).send( `Missing ${error.path}`)
						next(e)
					} else if (error.type === "unique violation") {
						res.status(400).send(`${error.path} already in use!`)
						next(e)
					}
				})
			} else next(e)
		}
	}
)
files_router.post("/upload/video", authorize, cloudinaryMulter_video.single("video"), async(req:RequestWithUser, res:Response, next:NextFunction):Promise<void> => {
	try {

			const new_file = await Files.create({...req.body, description: req.file.path, UserUserId: req.user.user_id })
		  res.send(new_file)

	 } catch (e) {
	   next(e)
   }
  })
  
files_router.put(
	"/:file_id",
	authorize,
	async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	): Promise<void> => {
        try {
            const file = await Files.findAll({where: {
                file_id: req.params.file_id,
                UserUserId: req.cookies.user.user_id
            }})
            if (file.length>0) {
                const edited_file = await Files.update(req.body, {
                    where: {
                        file_id: req.params.file_id,
                    },
                })
                if (edited_file[0] === 1) res.status(201).send("Updated")
                else {
					res.status(304).send("Not modified")
                }
            } else {
				res.status(400).send("This file doesn't exist or you are not allowed to modify it")
            }
        
        } catch (e) {
            next(e)
        }
    }
)
files_router.delete("/:file_id", authorize, async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const file = await Files.findAll({where: {
            file_id: req.params.file_id,
            UserUserId: req.cookies.user.user_id
        }})
        if (file.length>0) {
            const deleted_file = await Files.destroy({
                where: {
                    file_id: req.params.file_id,
                },
            })
            if (deleted_file === 1) res.status(200).send("Deleted")
            else {
				res.status(204)
            }
        } else {
			res.status(400).send("This file doesn't exist or you are not allowed to modify it")
        }
    
    } catch (e) {
        next(e)
    }
})


files_router.post(
	"/upload/audio",
	authorize,
	cloudinaryMulter_audio.single("audio"),
	async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const new_file = await Files.create({
				...req.body,
				description: req.file.path,
				UserUserId: req.user.user_id,
			})
			res.send(new_file)
		} catch (e) {
			next(e)
		}
	}
)

module.exports = files_router
