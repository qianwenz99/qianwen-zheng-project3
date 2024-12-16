// server/controllers/postController.js
const Post = require('../models/Post');
const User = require('../models/User');

// Create a new post
const createPost = async (req, res) => {
  const { content } = req.body;
  const userId = req.user.id; // Assumes user ID is attached to the request via middleware

  try {
    // Create new post
    const newPost = new Post({
      content,
      user: userId,
      createdAt: new Date(),
    });

    // Save post to database
    await newPost.save();

    res.status(201).json({ message: 'Post created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during post creation' });
  }
};

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    // Get posts in descending order by createdAt
    const posts = await Post.find().sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching posts' });
  }
};

// Get posts by user
const getUserPosts = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Get posts by user
    const posts = await Post.find({ user: userId }).sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching user posts' });
  }
};

// Edit a post
const updatePost = async (req, res) => {
  const postId = req.params.postId;
  const { content } = req.body;

  try {
    // Find post and update it
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Ensure the user updating the post is the author
    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to edit this post' });
    }

    post.content = content;
    await post.save();

    res.json({ message: 'Post updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while updating post' });
  }
};

// Delete a post
const deletePost = async (req, res) => {
  const postId = req.params.postId;

  try {
    // Find post and delete it
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Ensure the user deleting the post is the author
    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to delete this post' });
    }

    await post.remove();

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while deleting post' });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getUserPosts,
  updatePost,
  deletePost,
};
