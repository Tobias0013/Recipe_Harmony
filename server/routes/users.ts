import express, {Router, Request, Response} from "express";
import userDB from "../controller/database/userDB";
import veriyAdminJWT from "./middleware/admin_middle";
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
usersRouter.get("/:id", async (req: Request, res: Response) => {
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

usersRouter.patch("/:id", async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const { full_name, password, email } = req.body;

    if (!full_name && !password && !email) {
        return res.status(400).json({ "Error": "400 Body Missing Required Data" });
    }

    try {
        const result = await userDB.user.updateUser(id, { full_name, password, email });
        if (result.error === 404) {
            res.status(404).json({ "Error": "404 User Not Found" });
        } else if (result.error === null) {
            res.status(200).json({ "Updated": result.user });
        } else {
            res.status(500).json({ "Error": "500 Internal Server Error" });
        }
    } catch (err) {
        res.status(500).json({ "Error": "500 Internal Server Error" });
    }
});


export default usersRouter;