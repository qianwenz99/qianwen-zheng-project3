const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().populate('userId', 'username').sort({ timestamp: -1 });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new post
router.post('/', async (req, res) => {
    const { userId, content } = req.body;

    const newPost = new Post({
        userId,
        content
    });

    try {
        await newPost.save();
        res.status(201).json({ success: true, post: newPost });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
