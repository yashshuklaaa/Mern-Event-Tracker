// const express = require("express");
// const router = express.Router();
// const protect = require("../middleware/auth");
// const {
//     createEvent,
//     getEvents,
//     getPublicEvent,
//     updateEvent,
//     deleteEvent,
// } = require("../controllers/eventController");

// router.post("/", protect, createEvent);
// router.get("/", protect, getEvents);
// router.put("/:id", protect, updateEvent);
// router.delete("/:id", protect, deleteEvent);

// router.get("/public/:shareLink", getPublicEvent);

// module.exports = router;
// routes/eventRoutes.js
const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { createEvent, getEvents, getPublicEvent } = require("../controllers/eventController");

router.post("/", protect, createEvent);
router.get("/", protect, getEvents);


router.get("/public/:shareLink", getPublicEvent);

module.exports = router;

