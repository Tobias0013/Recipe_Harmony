import {Schema, model, Types, Document} from "mongoose";

interface IShoppingList {
    name: string,
    quantity_type: string,
    quantity: number
}

interface IIngredients {
    name: string,
    quantity_type: string,
    quantity: number
};

interface IHousehold extends Document{
    _id: Types.ObjectId,
    name: string,
    owner: string,
    members: string[],
    shopping_list: IShoppingList[],
    ingredients: IIngredients[]
};

const householdSchema: Schema = new Schema<IHousehold>(
    {
        _id:{
            type:Schema.Types.ObjectId,
            auto:true
        },
        name:String,
        owner:String,
        members:[String],
        shopping_list:[{
            name:String,
            quantity_type:String,
            quantity:Number
        }],
        ingredients: [{
            name:String,
            quantity_type:String,
            quantity:Number
        }]
    }
);

export default model<IHousehold>("Household", householdSchema, "Households");

