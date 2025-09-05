// // const mongoose = require("mongoose");

// // const eventSchema = new mongoose.Schema({
// //     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
// //     title: { type: String, required: true },
// //     date: { type: Date, required: true },
// //     location: { type: String, required: true },
// //     description: { type: String }
// // });

// // module.exports = mongoose.model("Event", eventSchema);

// const mongoose = require("mongoose");

// const eventSchema = new mongoose.Schema({
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     title: { type: String, required: true },
//     date: { type: Date, required: true },
//     location: { type: String, required: true },
//     description: { type: String },
// });

// module.exports = mongoose.model("Event", eventSchema);

const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    description: { type: String },
    shareLink: { type: String, unique: true }
}, { timestamps: true });

module.exports = mongoose.model("Event", eventSchema);
