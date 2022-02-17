const Posts = require("../domain/data/Posts")

exports.getAllPosts = (req, res, next) => {
    try {
        res.status(201).json(Posts);
    } catch (error) {
        res.status(404).json(error);
    }
}
