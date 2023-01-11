// import  User  from "../../utils/models/user"
// import {Request, Response, NextFunction} from "express"
// import { authorize, admin } from "../../middlewares/auth"
// const user_router = require("express").Router()

// //ADMIN ROUTES: 
// user_router.get("/admin", authorize, admin, async(req:Request,res:Response,next:NextFunction):Promise<void>=> {
//     try {
//         //if (req.cookie("token")) {
//        const userdata = await User.findAll()
//        if (userdata.length > 0) {
//            res.status(200).send(userdata)
//        } else {
//            res.send(204)
//         }
//        //} else {
//        // throw 401
//        //}
//     } catch (e) {
//         next(e)
//     }
// })

// user_router.get("/admin/:query/:identifier", authorize, admin, async(req:Request, res:Response, next:NextFunction):Promise<void> => {
//     //query is which column to search with
//     //identifier is what to search 
//     //example: /role/admin => returns all admins
//     try {
//         const userdata = await User.findAll({where: {
//             [req.params.query]: [req.params.identifier]
//         }})
//         if (userdata.length > 0) {
//             res.status(200).send(userdata)
//         } else {
//             res.send(204)
//         }
//     } catch (e) {
//         next(e)
//     }
// })
// user_router.put("/admin/:id", authorize, admin, async(req:Request, res:Response, next:NextFunction):Promise<void> => {
//     try {
//         const edited_user = await User.update(req.body, {
//             where: {
//                 user_id: req.params.id 
//             }
//         })
//         if (edited_user[0] === 1) res.status(201).send("Updated") 
//         else {
//             res.send(304)
//         }
//         res.send(edited_user)
//     } catch (e) {
//         next(e)
//     }
// })
// user_router.delete("/admin/:id", authorize,admin, async(req:Request, res:Response, next:NextFunction):Promise<void> => {
//     try {
//         //needs some user validation: you can only edit your own profile
//         await User.destroy({
//             where: {
//                 user_id: req.params.id 
//             }
//         })
//             res.status(204)

//     } catch (e) {
//         next(e)
//     }
// })

// //PUBLIC ROUTES
// //creation of users moved to login 

// user_router.get("/:user_id", authorize, async(req:Request, res:Response, next:NextFunction):Promise<void> => {
//     try {
//         const userdata = await User.findByPk(req.params.user_id)
//         if (userdata) {
//             res.status(200).send({
//                 name: userdata.name,
//                 last_name: userdata.last_name,
//                 user_id: userdata.user_id
//             })
//         } else {
//             res.send(204)
//         }
//     } catch (e) {
//         next(e)
//     }
// })

// user_router.put("/me", authorize, async(req:Request, res:Response, next:NextFunction):Promise<void> => {
//     try {
//         if (req.user) {
//             const edited_user = await User.update(req.body, {
//                 where: {
//                     user_id: req.user.user_id 
//                 }
//             })
//             if (edited_user[0] === 1) res.status(201).send("Updated") 
//             else {
//                 res.send(304)
//             }
//         } else {
//             res.status(400).send("You are not logged in")
//         }
        
//     } catch (e) {
//         next(e)
//     }
// })

// user_router.delete("/me", authorize, async(req:Request, res:Response, next:NextFunction):Promise<void> => {
//     try {
//         if (req.user) {
//             const deleted_user = await User.destroy({
//                 where: {
//                     user_id: req.user.user_id 
//                 }
//             })
//             if (deleted_user === 1) res.status(200).send("Deleted")
//             else {
//                 res.status(204)
//             }
//         } else {
//             res.status(400).send("You are not logged in")
//         }
//     } catch (e) {
//         next(e)
//     }
// })

// export default user_router