import {Schema,models,model} from "mongoose";

const PostSchema = new Schema({
    creator:{
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    post:{
        type:String
    },
    tag:{
        type:String
    },
    createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Posts = models.Posts || model("Posts", PostSchema);
export default Posts;