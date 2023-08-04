import {Schema,models,model} from "mongoose";

const UserSchema = new Schema({
    email:{
        type:String
    },
    username:{
        type:String
    },
    password:{
        type:String
    },
    image:{
        type:String
    },
})

const User = models.User || model("User",UserSchema);
export default User;