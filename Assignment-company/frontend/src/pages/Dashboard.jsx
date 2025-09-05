import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Navbar from "../components/Navbar";
import EventForm from "../components/EventForm";
import EventCard from "../components/EventCard";
import { createEvent, getEvents, deleteEvent as deleteAPI } from "../api/api";

const Dashboard = () => {
    const [events, setEvents] = useState([]);
    const [filter, setFilter] = useState("upcoming");
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) window.location.href = "/"; // protect route
        fetchEvents();
    }, [filter]);

    const fetchEvents = async () => {
        try {
            const res = await getEvents(token, filter);
            setEvents(res.data);
        } catch (err) {
            toast.error("Failed to fetch events");
        }
    };

    const addEvent = async (data) => {
        try {
            const res = await createEvent(data, token);
            setEvents((prev) => [...prev, res.data]);
            toast.success("Event created successfully!");
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to create event");
        }
    };


    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
            <Toaster />
            <Navbar logout={logout} />
            <div className="p-6 max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">My Events</h1>
                <EventForm addEvent={addEvent} />

                {/* Filter Buttons */}
                <div className="flex gap-4 my-4 justify-center">
                    {["upcoming", "past"].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-5 py-2 rounded-full font-semibold transition 
                ${filter === f ? "bg-blue-600 text-white shadow-lg" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                        >
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Event Cards */}
                <div className="grid md:grid-cols-2 gap-6 mt-4">
                    {events.map((event) => (
                        <EventCard key={event._id} event={event} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
