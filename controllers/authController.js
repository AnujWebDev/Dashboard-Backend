const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const User = require("../Modals/user");

const { ErrorHandler } = require("../middleware/errorHandler");
const createAccessToken = (user) => {
  return jwt.sign(user, process.env.JWT_ACCESS_KEY, { expiresIn: "30d" });
};

const login = async (req, res, next) => {
  try {
    let { email, password, role } = req.body;
    email = email.toLowerCase();

    if (!(email && password && role)) {
      return next(
        new ErrorHandler(400, "email ,role and password is required")
      );
    }

    const user = await User.findOne({ email });
    // console.log(user);
    if (!user) {
      return next(new ErrorHandler(404, "user not found"));
    }

    const result = await bcrypt.compare(password, user.password);

    // console.log(password);
    // console.log(user.password);
    if (!result) return next(new ErrorHandler(400, "Invalid Credentials"));

    const accessToken = createAccessToken({ id: user._id });

    return res.status(200).json({
      id: user._id,
      success: true,
      msg: `WELCOME ${user.name} !! login successful`,
      user,
      accessToken,
    });
  } catch (error) {
    // console.log(error);
    next(error);
  }
};

const signup = async (req, res, next) => {
  try {
    const { name, phone, email, password } = req.body;

    const isUserExists = await User.findOne({ email: email.toLowerCase() });

    if (isUserExists) {
      return next(new ErrorHandler(400, "user by this email already exists"));
    }
    if (!(name && phone && email && password)) {
      return next(new ErrorHandler(400, "All the input fields are required."));
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const user = new User({
      name,
      email,
      password: hashPassword,
      phone,
    });

    const savedUser = await user.save();
    // console.log(savedUser);

    const accessToken = createAccessToken({ id: user._id });

    return res.status(200).json({
      id: user._id,
      success: true,
      msg: `WELCOME ${name}  !! signup successful`,
      user,
      accessToken,
      // refreshToken,
    });
  } catch (error) {
    next(error);
    // console.log(error);
  }
};

module.exports = {
  login,
  signup,
};
