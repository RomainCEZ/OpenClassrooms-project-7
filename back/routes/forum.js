const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forum')

router.get('/', forumController.getAllPosts);
router.post("/", forumController.postPost);
module.exports = router;