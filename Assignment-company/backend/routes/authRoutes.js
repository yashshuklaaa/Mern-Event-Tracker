// // const express = require("express");
// // const { signup, login } = require("../controllers/authController");

// // const router = express.Router();

// // router.post("/signup", signup);
// // router.post("/login", login);

// // module.exports = router;


// const express = require("express");
// const router = express.Router();
// const { register, login } = require("../controllers/authController");

// router.post("/register", register);
// router.post("/login", login);

// module.exports = router;

const express = require("express");
const router = express.Router();
const { register, login, getMe } = require("../controllers/authController");
const protect = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe); // fetch logged-in user info

module.exports = router;
