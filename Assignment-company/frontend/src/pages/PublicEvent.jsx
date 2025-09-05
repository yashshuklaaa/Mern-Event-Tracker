import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPublicEvent } from "../api/api";
import EventCard from "../components/EventCard";

const PublicEvent = () => {
    const { shareLink } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        getPublicEvent(shareLink).then(res => setEvent(res.data)).catch(err => setEvent(null));
    }, [shareLink]);

    if (!event) return <p className="p-4">Event not found</p>;
    return <div className="p-4"><EventCard event={event} /></div>;
};

export default PublicEvent;
