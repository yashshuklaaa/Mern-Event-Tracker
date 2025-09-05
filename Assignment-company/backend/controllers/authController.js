// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// exports.signup = async (req, res) => {
//     const { username, email, password } = req.body;
//     try {
//         const userExists = await User.findOne({ email });
//         if (userExists) return res.status(400).json({ msg: "User already exists" });

//         const hashed = await bcrypt.hash(password, 10);
//         const user = await User.create({ username, email, password: hashed });

//         res.json({ msg: "Signup successful" });
//     } catch (err) {
//         res.status(500).json({ msg: err.message });
//     }
// };

// exports.login = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const user = await User.findOne({ email });
//         if (!user) return res.status(400).json({ msg: "Invalid credentials" });

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//             expiresIn: "1d"
//         });

//         res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
//     } catch (err) {
//         res.status(500).json({ msg: err.message });
//     }
// };


// const User = require("../models/User");
// const jwt = require("jsonwebtoken");

// const generateToken = (id) => {
//     return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
// };

// // Register user
// exports.register = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const userExists = await User.findOne({ email });
//         if (userExists) return res.status(400).json({ message: "User exists" });

//         const user = await User.create({ email, password });
//         res.status(201).json({ token: generateToken(user._id) });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Login user
// exports.login = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const user = await User.findOne({ email });
//         if (!user) return res.status(400).json({ message: "Invalid credentials" });

//         const isMatch = await user.matchPassword(password);
//         if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//         res.json({ token: generateToken(user._id) });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };


const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Register user
exports.register = async (req, res) => {
    const { name, email, password } = req.body; // include name if you want
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "User exists" });

        const user = await User.create({ name, email, password });

        res.status(201).json({
            token: generateToken(user._id),
            user: { id: user._id, name: user.name, email: user.email },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login user
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        res.json({
            token: generateToken(user._id),
            user: { id: user._id, name: user.name, email: user.email },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get logged-in user info
exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password"); // remove password
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({ id: user._id, name: user.name, email: user.email });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
