import React, { useState } from "react";

const EventForm = ({ addEvent }) => {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        addEvent({ title, date, location, description });
        setTitle(""); setDate(""); setLocation(""); setDescription("");
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-lg space-y-4">
            <input
                className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Event Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
            />
            <input
                type="datetime-local"
                className="border border-gray-300 p-3 cursor-pointerrounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={date}
                onChange={e => setDate(e.target.value)}
                required
            />
            <input
                className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Location"
                value={location}
                onChange={e => setLocation(e.target.value)}
                required
            />
            <textarea
                className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Description (optional)"
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
            <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer transition text-white font-semibold py-3 rounded-xl shadow-md"
            >
                Add Event
            </button>
        </form>
    );
};

export default EventForm;
