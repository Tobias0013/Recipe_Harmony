import express, {Router, Request, Response} from "express";
import userDB from "../controller/database/userDB";

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

export default usersRouter;