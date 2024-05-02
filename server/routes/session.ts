import express, {Router, Request, Response} from "express";
import userDB from "../controller/database/userDB";

const sessionRouter: Router = express.Router();

sessionRouter.post("/", async(req: Request, res: Response) => {
    if(!req.body.password || !req.body.email){
        res.status(400).json({"Error" : "400 Body Missing Required Data"});
    }else{
        try{
            const result = await userDB.user.login(req.body.email, req.body.password);
            if(result.error === 401){
                res.status(401).json({"Error" : "401 Incorrect email or password"})
            }else if (result.error === null){
                res.status(200).json({"Message":"Logged in"});
            }else{
                res.status(500).json({"Error" : "500 Internal Server Error"});
            }
        }catch(err){
            res.status(500).json({"Error" : "500 Internal Server Error"});
        }
    }
})

export default sessionRouter;