const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
    {
        posterId: { type: String },
        message: { type: String, required: true },
        likes: { type: Number, default: 0 },
        usersLiked: { type: [String] }
    }
)

module.exports = mongoose.model("Post", postSchema);