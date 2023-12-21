import mongoose from "mongoose"

const blogSchema = new mongoose.Schema(
    {
        title:{
            type:String,
        },
        summary:{
            type:String
        },
        content: {
            type: String,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        img:{
            type:String,
        }
    },
    { timestamps: true }
)
const BlogModel = mongoose.model.Blog ||  mongoose.model("Blog", blogSchema);

export default BlogModel;