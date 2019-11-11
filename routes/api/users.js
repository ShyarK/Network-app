const express = require('express');
const router = express.Router();
const User = require('../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const Validator = require('../../Validator');
const validator = new Validator();
// We use express.Router to have individual files using route method, in case if we have
// multiple files, like we have in this app.

// Route method: GET
// endpoint: /api/users

//@route    GET api/users
//@desc     Register User
//@access   Public

//JWT or json web token is
router.post('/', validator.userRegistrationValidator, async (req, res) => {
  const { email, name, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).send('User already registered');
    }
    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm',
    });

    user = new User({
      name,
      email,
      avatar,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, config.get('jwtPrivateKey'), { expiresIn: 50000 }, (error, token) => {
      if (error) throw error;
      res.json({ token });
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
