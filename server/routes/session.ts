import express, {Router, Request, Response} from "express";
import userDB from "../controller/database/userDB";
import householdDB from '../controller/database/householdDB';
import jwt from "../controller/session/jwt";
import verifyJWT from "./middleware/jwt_middle";

const sessionRouter: Router = express.Router();


/*
    POST with body containing email and password
    Returns 401 if wrong email or password
    Returns json with jwt field containg the jwt token if valid email and password combo
*/
sessionRouter.post("/", async(req: Request, res: Response) => {
    if(!req.body.password || !req.body.email){
        res.status(400).json({"Error" : "400 Body Missing Required Data"});
    }else{
        try{
            const result = await userDB.user.login(req.body.email, req.body.password);
            if(result.error === 401){
                res.status(401).json({"Error" : "401 Incorrect email or password"})
            }else if (result.error === null && result.userId){
                
                const { error, household } = await householdDB.getOrCreate(result.userId.toString());
                
                if (error || !household){
                    return res.status(500).json({"Error" : "500 Internal Server Error"});
                }

                const jwtToken = jwt.session.createJWT(result.userId, result.fullName, result.email, household._id.toString());
                res.status(200).json({"jwt":jwtToken});
            }else{
                res.status(500).json({"Error" : "500 Internal Server Error"});
            }
        }catch(err){
            res.status(500).json({"Error" : "500 Internal Server Error"});
        }
    }
})

sessionRouter.patch("/", verifyJWT, async(req: Request, res: Response) => {
    if(!req.body.jwt){
        res.status(400).json({"Error" : "400 Body Missing Required Data"});
    }else{
        try{
            const tokenData = jwt.session.verifyJWT(req.body.jwt);
            if(tokenData){
                const { error, household } = await householdDB.getOrCreate(tokenData.user_id);
                if (error || !household){
                    return res.status(500).json({"Error" : "500 Internal Server Error"});
                }
                const jwtToken = jwt.session.createJWT(tokenData.user_id, tokenData.full_name, tokenData.email, household._id.toString());
                
                res.status(200).json({"jwt":jwtToken});
            }else{
                res.status(400).json({"Error" : "400 Body Missing Required Data"});
            }
        }catch(err){
            console.log(err)
            res.status(500).json({"Error" : "500 Internal Server Error"});
        }
    }
})

export default sessionRouter;