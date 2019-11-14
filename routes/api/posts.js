const express = require('express');
const router = express.Router();
const auth = require('../../middleware/authentication');
const Validator = require('../../Validator');
const validator = new Validator();
const Post = require('../models/Posts');
const Profile = require('../models/Profile');
const User = require('../models/User');
// @route    POST api/posts
// @desc     Create a post
// @access   Private

// select method: to select the properties we want to be returned.
// for example we can select user.select
router.post('/', [auth, [validator.userPostValidator]], async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    // We got Post class from models folder which we defined it with model model
    // When creating a new instance of Post class we use new keyword to create a post object
    // we pass an object to initialize our post object
    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    });

    //Because we are dealing with asynchronous operation that needs some time to
    // save post in the databases. And because we are going to access to the file system.
    // save() methods returns a promise!
    // When saving post to mongoDB, the mongoDB going to assign a unique id to the post.
    const post = await newPost.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/posts
// @desc     Get all posts
// @access   Private

// we use sort method and passed an object with key-value pair, here we sorting by the date
// value 1 is indicate ascending Order from the smallest to the largest object.
// value -1 is indicate descending Order from the largest to the smallest object.
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/posts/:id
// @desc     Get post by ID
// @access   Private
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check for ObjectId format and post
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check for ObjectId format and post
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await post.remove();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    const likedPost = post.likes.filter(like => like.user.toString() === req.user.id).length;
    if (likedPost > 0) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }

    // Get remove index
    const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
