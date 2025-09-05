import React, { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";

export default function Events() {
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({
        title: "",
        date: "",
        location: "",
        description: ""
    });
    const [filter, setFilter] = useState("upcoming");

    // Fetch events from backend
    const fetchEvents = async () => {
        try {
            const res = await API.get("/events");
            setEvents(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    // Add new event
    const handleAdd = async () => {
        if (!newEvent.title || !newEvent.date || !newEvent.location) return;

        try {
            await API.post("/events", newEvent);
            setNewEvent({ title: "", date: "", location: "", description: "" });
            fetchEvents(); // fetch updated events from backend
        } catch (err) {
            console.error(err);
        }
    };

    // Delete an event
    const handleDelete = async (id) => {
        try {
            await API.delete(`/events/${id}`);
            fetchEvents(); // refresh list after deletion
        } catch (err) {
            console.error(err);
        }
    };

    // Filter upcoming / past events
    const filteredEvents = events.filter(event => {
        const now = new Date();
        return filter === "upcoming"
            ? new Date(event.date) >= now
            : new Date(event.date) < now;
    });

    return (
        <>
            <Navbar />
            <div className="p-4 max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-4 text-center">My Events</h2>

                {/* Event Form */}
                <div className="bg-white p-4 rounded-xl shadow-lg mb-4">
                    <input
                        type="text"
                        placeholder="Title"
                        className="border p-2 mb-2 w-full rounded"
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    />
                    <input
                        type="datetime-local"
                        className="border p-2 mb-2 w-full rounded"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Location"
                        className="border p-2 mb-2 w-full rounded"
                        value={newEvent.location}
                        onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    />
                    <textarea
                        placeholder="Description (optional)"
                        className="border p-2 mb-2 w-full rounded"
                        value={newEvent.description}
                        onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    />
                    <button
                        onClick={handleAdd}
                        className={`w-full px-4 py-2 rounded text-white cursor-pointer transition ${newEvent.title && newEvent.date && newEvent.location
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-gray-400 cursor-not-allowed"
                            }`}
                        disabled={!newEvent.title || !newEvent.date || !newEvent.location}
                    >
                        Add Event
                    </button>
                </div>

                {/* Filter Buttons */}
                <div className="flex gap-4 mb-4">
                    <button
                        onClick={() => setFilter("upcoming")}
                        className={`px-4 py-1 cursor-pointer rounded ${filter === "upcoming" ? "bg-blue-600 text-white" : "bg-gray-200"
                            }`}
                    >
                        Upcoming
                    </button>
                    <button
                        onClick={() => setFilter("past")}
                        className={`px-4 py-1 rounded cursor-pointer ${filter === "past" ? "bg-blue-600 cursor-pointer text-white" : "bg-gray-200 cursor-pointer"
                            }`}
                    >
                        Past
                    </button>
                </div>

                {/* Event List */}
                <ul className="space-y-2">
                    {filteredEvents.map((e) => (
                        <li key={e._id} className="flex justify-between bg-white p-3 rounded shadow-md">
                            <div>
                                <h3 className="font-bold">{e.title}</h3>
                                <p>{new Date(e.date).toLocaleString()}</p>
                                <p>{e.location}</p>
                                {e.description && <p>{e.description}</p>}
                            </div>
                            <button
                                onClick={() => handleDelete(e._id)}
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
