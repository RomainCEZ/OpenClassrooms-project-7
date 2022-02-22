const Posts = require("../domain/data/Posts")
const InMemoryForumRepository = require("../domain/mock/InMemoryForumRepository")

const inMemoryForumRepository = new InMemoryForumRepository(Posts)

exports.getAllPosts = (req, res, next) => {
    try {
        res.status(200).json(Posts);
    } catch (error) {
        res.status(404).json(error);
    }
}

exports.postPost = (req, res, next) => {
    try {
        inMemoryForumRepository.savePost(req.body)
        res.status(201).json({message: "Saved !"});
    } catch (error) {
        res.status(404).json(error);
    }
}
