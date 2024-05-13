import {Request, Response, NextFunction} from "express";
import jwt from "../../controller/session/jwt";

/*
    Middleware for routes to verify jwt token
    JWT token should be provided as Authorization header in http request
*/

function verifyJWT(req: Request, res: Response, next: NextFunction){
    const jwtToken = req.header('Authorization') || "";
    const result = jwt.session.verifyJWT(jwtToken);
    if(result === null){
        return res.status(401).json({error: "401 Unauthorized"})
    }else{
        return next();
    }
    
}

export default verifyJWT;