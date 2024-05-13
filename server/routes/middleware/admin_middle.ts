import {Request, Response, NextFunction} from "express";
import jwt from "../../controller/session/jwt";

/*
    Middleware for admin routes to verify jwt token
    JWT token should be provided as Authorization header in http request
*/

function verifyAdminJWT(req: Request, res: Response, next: NextFunction){
    const jwtToken = req.header('Authorization') || "";
    const result = jwt.session.verifyJWT(jwtToken);
    if(!result || !result.role){
        return res.status(401).json({error: "401 Unauthorized"})
    }else if (result.role === "admin"){
        return next();
    }else{
        return res.status(401).json({error: "401 Unauthorized"})
    }
    
}

export default verifyAdminJWT;