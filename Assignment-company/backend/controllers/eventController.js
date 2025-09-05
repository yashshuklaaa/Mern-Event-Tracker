const Event = require("../models/Event");
const crypto = require("crypto");
const mongoose = require("mongoose");

// Create Event
exports.createEvent = async (req, res) => {
    const { title, date, location, description } = req.body;
    try {
        const shareLink = crypto.randomBytes(8).toString("hex");
        const event = await Event.create({
            user: req.user._id,
            title,
            date,
            location,
            description,
            shareLink,
        });
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Events (User Only)
exports.getEvents = async (req, res) => {
    const { filter } = req.query;
    try {
        let events = await Event.find({ user: req.user._id }).sort({ date: 1 });
        const now = new Date();
        if (filter === "upcoming") events = events.filter((e) => e.date >= now);
        if (filter === "past") events = events.filter((e) => e.date < now);
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get Public Event
exports.getPublicEvent = async (req, res) => {
    try {
        const event = await Event.findOne({ shareLink: req.params.shareLink });
        if (!event) return res.status(404).json({ message: "Event not found" });
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
