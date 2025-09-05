import React from "react";

const EventCard = ({ event }) => {
    return (
        <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition relative">
            <h2 className="text-xl font-bold text-blue-700">{event.title}</h2>
            <p className="text-gray-500 mt-1">{new Date(event.date).toLocaleString()}</p>
            <p className="text-gray-500">{event.location}</p>
            {event.description && <p className="mt-2 text-gray-700">{event.description}</p>}

            <div className="flex justify-between mt-4 items-center">
                <a
                    href={`http://localhost:5173/public/${event.shareLink}`}
                    target="_blank"
                    className="text-blue-600 hover:underline font-medium"
                >
                    Share Link
                </a>

            </div>
        </div>
    );
};

export default EventCard;
