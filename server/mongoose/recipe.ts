import {Schema, model, Types, Document} from "mongoose";

interface IIngredient {
    name: string,
    quantity_type: string,
    quantity: number
};

interface IInstruction{
    step: number,
    text: string
};

interface IImage{
    type: string,
    url?: string,
    base64?: string
};

interface IRecipe extends Document{
    _id: Types.ObjectId,
    name: string,
    prep_time: number,
    cook_time: number,
    author: string,
    servings: number,
    tags: string[],
    calories: number,
    ingredients: IIngredient[],
    difficulty: string,
    instructions: IInstruction[],
    rating: number,
    review_count: number,
    image: IImage
};

const recipeSchema: Schema = new Schema<IRecipe>(
    {
        _id:{
            type:Schema.Types.ObjectId,
            auto:true
        },
        name:String,
        prep_time:Number,
        cook_time:Number,
        author:String,
        servings:Number,
        tags:[String],
        calories:Number,
        ingredients:[{
            name:String,
            quantity_type:String,
            quantity:Number
        }],
        difficulty:String,
        instructions:[{
            step:Number,
            text:String
        }],
        rating:Number,
        review_count:Number,
        image:{
            type:{type: String},
            url:String,
            base64:String
        }
    }
);

export default model<IRecipe>("Recipe", recipeSchema, "Recipes");