import { sign, verify} from "jsonwebtoken";
import "dotenv";

function createAndSignJWT(userId: string, fullName: string, email: string){

    interface IJwtPayload {
        user_id: string,
        full_name: string,
        email: string
    };

    const jwtPayload: IJwtPayload = {
        user_id: userId,
        full_name: fullName,
        email: email
    };

    const secret: any = process.env.SECRET;
    const jwtToken: string = sign(jwtPayload, secret);

    return jwtToken;
}

function verifyJWT(token: string){
    try{
        const secret: any = process.env.SECRET;
        const jwtPayload: any = verify(token, secret);
        return jwtPayload;
    }catch(e){
        //JWT token not valid
        return null;
    }
}

export default {
    session: {
        createJWT: createAndSignJWT,
        verifyJWT: verifyJWT
    }
}