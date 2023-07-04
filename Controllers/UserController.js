const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("..//Models/UserModel");

//@desc Register a user
//@route Post api/user/register
//@access public

const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    res.status(400);
    throw new Error("All Fields are mendetory");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User With Same Email Already Present");
  }
  //Hash Password

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    userName,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User provided is not valid");
  }
  res.json({ message: "register the user succesfully" });
});

//@desc Login a user
//@route Post api/user/login
//@access public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandetory");
  }
  const user = await User.findOne({ email });
  //compare password with hashed password

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.userName,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SCERET,
      { expiresIn: "15m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("please type valid name and password");
  }
  res.json({ message: "login the user succesfully" });
});

//@desc get currentUser  info
//@route Post api/user/currentUser
//@access public

const getCurrentUserInfo = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, getCurrentUserInfo };
