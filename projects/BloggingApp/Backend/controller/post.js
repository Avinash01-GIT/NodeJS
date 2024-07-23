const Post = require("../model/post");

const createPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    const post = new Post({ title, description });
    await post.save();
    res.json({
      success: true,
      message: "Post created successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const listPost = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json({
      success: true,
      posts,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const post = await Post.findByIdAndUpdate(id, { title, description });
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    res.json({
      success: true,
      message: "Post updated Successfully",
      post,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    res.json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = { createPost, listPost, updatePost, deletePost };
