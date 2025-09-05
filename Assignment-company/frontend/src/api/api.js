import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const register = (data) => API.post("/auth/register", data);
export const login = (data) => API.post("/auth/login", data);
export const getMe = (token) => API.get("/auth/me", { headers: { Authorization: `Bearer ${token}` } });

export const createEvent = (data, token) =>
    API.post("/events", data, { headers: { Authorization: `Bearer ${token}` } });
export const getEvents = (token, filter) =>
    API.get(`/events?filter=${filter}`, { headers: { Authorization: `Bearer ${token}` } });
export const updateEvent = (id, data, token) =>
    API.put(`/events/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });
export const deleteEvent = (id, token) =>
    API.delete(`/events/${id}`, { headers: { Authorization: `Bearer ${token}` } });
export const getPublicEvent = (shareLink) =>
    API.get(`/events/public/${shareLink}`);
