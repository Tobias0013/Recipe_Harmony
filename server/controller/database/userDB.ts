import bcrypt from "bcrypt";
import User from '../../mongoose/user';

async function addUser(full_name: string, password: string, email: string){
    try{
        const res = await User.find({email: email});
        if (res.length > 0) {            
            return {error: 409, res};
        }

        const currentDate: Date = new Date();
        const defaultFavoriteRecipes: string[] = [];
        const saltRounds: number = 10;
        const hashedPassword: string = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            full_name,
            password: hashedPassword,
            email,
            joined: currentDate,
            favorite_recipes: defaultFavoriteRecipes
        });

        const user = await newUser.save();
        return {error: null, user};
    }
    catch (e){
        return{error: e, user: null}
    }
}


/*
    Verify user credentials and return JWT token for further authorization
    TODO:
    Implement JWT Token
*/
async function createUserSession(email: string, password: string){
    try{
        const res = await User.find({email: email});
        if(res.length === 0){
            //no user with that email
            return{error: 401}
        }
        const hashedPassword: string = res[0].password;
        const validPassword: boolean = await bcrypt.compare(password, hashedPassword);
        return{error: null}
        if(!validPassword){
            //incorrect password
            return{error: 401}
        }

    }catch(e){
        return{error: e}
    }
}

export default {
    user: {
        add: addUser,
        login: createUserSession
    }
}