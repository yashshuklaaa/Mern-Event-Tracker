// // const jwt = require("jsonwebtoken");

// // const protect = (req, res, next) => {
// //     let token = req.headers.authorization?.split(" ")[1];
// //     if (!token) return res.status(401).json({ msg: "No token, auth denied" });

// //     try {
// //         const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //         req.user = decoded.id;
// //         next();
// //     } catch (err) {
// //         res.status(401).json({ msg: "Token invalid" });
// //     }
// // };

// // module.exports = protect;


// // const jwt = require("jsonwebtoken");

// // const protect = (req, res, next) => {
// //     const token = req.headers.authorization?.split(" ")[1];
// //     if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

// //     try {
// //         const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //         req.user = decoded;
// //         next();
// //     } catch (err) {
// //         res.status(401).json({ msg: "Token is not valid" });
// //     }
// // };

// // module.exports = protect;

// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// const protect = async (req, res, next) => {
//     let token;

//     if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
//         token = req.headers.authorization.split(" ")[1];

//         try {
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);
//             req.user = await User.findById(decoded.id).select("-password");
//             next();
//         } catch (err) {
//             return res.status(401).json({ msg: "Not authorized" });
//         }
//     } else {
//         return res.status(401).json({ msg: "Not authorized, no token" });
//     }
// };

// module.exports = protect;

const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            return res.status(401).json({ message: "Not authorized" });
        }
    }
    if (!token) {
        return res.status(401).json({ message: "No token" });
    }
};

module.exports = protect;
