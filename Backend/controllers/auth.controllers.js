const Tenant = require("../models/tenant.model");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUSer = async (req, res) => {
  try {
    const { username, email, password, confirmPassword, companyname } = req.body;

    if (!username || !email || !password || !confirmPassword || !companyname) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password !== confirmPassword || password.length < 6) {
      return res.status(400).json({ message: "Passwords must match and be >= 6 chars" });
    }

    const isCompanyExist = await Tenant.findOne({ name: companyname.toLowerCase() });
    if (isCompanyExist) {
      return res.status(400).json({ errors: { companyname: "Company already exists" } });
    }

    const isUserExist = await User.findOne({ $or: [{ username }, { email }] });
    if (isUserExist) {
      return res.status(400).json({ errors: { username: "Username or Email already exists" } });
    }

    const newTenant = await Tenant.create({
      name: companyname.toLowerCase(),
      slug: companyname.toLowerCase().replace(/\s+/g, '-'),
      plan: 'free'
    });

    const genSalt = await bcrypt.genSalt(10);
    const hashesPassword = await bcrypt.hash(password, genSalt);

    const newUser = await User.create({
      username,
      email,
      password: hashesPassword,
      role: "admin",
      tenant: newTenant._id
    });

    const token = jwt.sign(
      { id: newUser._id, tenant: newTenant._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    newUser.password = undefined;
    return res.status(201).json({ message: "User registered successfully", token, user: {
      id: newUser._id,
      email: newUser.email,
      role: newUser.role,
      tenant: newTenant._id
    } });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, tenant: user.tenant, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    user.password = undefined;
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        tenant: user.tenant
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict"
  });
  return res.status(200).json({ message: "Logout successful" });
};

module.exports = { registerUSer, loginUser, logoutUser };
