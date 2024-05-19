import express, {Router, Request, Response} from "express";
import { isValidObjectId } from "mongoose";

import userDB from "../controller/database/userDB";
import verifyJWT from "./middleware/jwt_middle";
import verifyAdminJWT from "./middleware/admin_middle";

const usersRouter: Router = express.Router();

usersRouter.post("/", async(req: Request, res: Response) => {
    if(!req.body.full_name || !req.body.password || !req.body.email){
        res.status(400).json({"Error" : "400 Body Missing Required Data"});
    }else{
        try{
            const result = await userDB.user.add(req.body.full_name, req.body.password, req.body.email);
            if(result.error === 409){
                res.status(409).json({"Error" : "409 User Already Exists"})
            }else if (result.error === null){
                res.status(201).json({"Created" : result.user});
            }else{
                res.status(500).json({"Error" : "500 Internal Server Error"});
            }
        }catch(err){
            res.status(500).json({"Error" : "500 Internal Server Error"});
        }
    }
})

/*
    Endpoint to get user data from id
    Protected using JWT
*/
usersRouter.get("/:id", verifyJWT, async (req: Request, res: Response) => {
    const id: string = req.params.id;
    try{
        const result = await userDB.user.getUserData(id);
        if(result.error === null){
            res.status(200).json(result);
        }else if(result.error === 404){
            res.status(404).json({"Error" : "404 User Not Found"});
        }else{
            res.status(500).json({"Error" : "500 Internal Server Error"});
        }
    }catch(e){
        res.status(500).json({"Error" : "500 Internal Server Error"});
    }
})

usersRouter.get("/", verifyAdminJWT, async (req: Request, res: Response) => {
    try{
        const result = await userDB.user.getAllUsers();
        if(result.error === null){
            res.status(200).json(result.users);
        }else{
            res.status(500).json({"Error" : "500 Internal Server Error"});
        }
    }catch(e){
        res.status(500).json({"Error" : "500 Internal Server Error"});
    }
})

usersRouter.get("/:userId/favorites", verifyJWT, async (req: Request, res: Response) =>{
    const { userId } = req.params;

    if (!isValidObjectId(userId)) {
        return res.status(400).json({ Error: "Invalid user id parameter" })
    }
    const { error, favorites } = await userDB.getFavorites(userId);

    if (error){
        return res.status(error === 404 ? 404 : 500)
        .json({ Error: error === 404 ? "User not found" : "Internal server error" });
    }
    return res.json(favorites);
})

usersRouter.patch("/:userId/favorites", verifyJWT, async (req: Request, res: Response) =>{
    const { userId } = req.params;
    const { favorite_recipes } = req.body;

    if (!isValidObjectId(userId)) {
        return res.status(400).json({ Error: "Invalid user id parameter" })
    }

    if (!Array.isArray(favorite_recipes)) {
        return res.status(400).json({ Error: "Incorrect request body 1" });
    }

    for (const item of favorite_recipes) {
        if (!isValidObjectId(item)) {
            return res.status(400).json({ Error: "Incorrect request body 2" });
        }
    }

    const { error, favorites } = await userDB.updateFavorites(userId, favorite_recipes);

    if (error){
        return res.status(error === 404 ? 404 : 500)
        .json({ Error: error === 404 ? "User not found" : "Internal server error" });
    }
    return res.json(favorites);
})

export default usersRouter;