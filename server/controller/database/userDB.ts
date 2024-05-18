import bcrypt from "bcrypt";

import User from '../../mongoose/user';
import recipeDB from './recipeDB';

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
    Verify user credentials using emal and password
*/
async function verifyUserCredentials(email: string, password: string){
    try{
        const res = await User.find({email: email});
        if(res.length === 0){
            //no user with that email
            return{error: 401}
        }
        const hashedPassword: string = res[0].password;
        const validPassword: boolean = await bcrypt.compare(password, hashedPassword);
        if(!validPassword){
            //incorrect password
            return{error: 401}
        }
        return{error: null, userId: res[0]._id, fullName: res[0].full_name, email: res[0].email}

    }catch(e){
        return{error: e}
    }
}

/*
    Get user information from user id. Designed to be used on pages were JWT is valid
    Provide user id found in JWT token
    Returns null if no user with provided id is found
*/
async function getUserById(id: any){
    try{
        const res = await User.find({_id: id});
        if(res.length === 1){
            return({
                "error":null,
                "fullName":res[0].full_name,
                "email":res[0].email,
                "joined":res[0].joined,
                "favoriteRecipes":res[0].favorite_recipes
            })
        }else{
            return {error: 404};
        }
    }catch(e){
        return{error: e}
    }
}

async function getAllUsers(){
    try{
        const res = await User.find();
        return({
            "error": null,
            "users": res
        })
    }catch(e){
        return{error: e}
    }
}

async function updateFavorites(id: string, favorite_recipes: string[]) {
    try{
        const favorites = await User.findById(id).select("favorite_recipes");
        
        if (!favorites) {
            return { error: 404, favorites: null };
        }

        favorites.favorite_recipes.forEach(f => {
            if (!favorite_recipes.includes(f)){
                //Dec
                recipeDB.decrementReviewCount(f);
            }
        });

        favorite_recipes.forEach(f => {
            if (!favorites.favorite_recipes.includes(f)){
                //Inc
                recipeDB.incrementReviewCount(f);
            }
        });

        favorites.favorite_recipes = favorite_recipes;
        const updatedFavorites = await favorites.save();

        return { error: null, favorites: updatedFavorites.favorite_recipes }
    }
    catch(e){
        return { error: e, favorites: null }
    }
}

export default {
    user: {
        add: addUser,
        login: verifyUserCredentials,
        getUserData: getUserById,
        getAllUsers: getAllUsers
    },
    updateFavorites
}