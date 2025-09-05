import React, { useState, useEffect, useRef } from "react";
import { getMe } from "../api/api";

const Navbar = ({ logout }) => {
    const [user, setUser] = useState({ name: "", email: "" });
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef();
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchUser = async () => {
            if (!token) return;
            try {
                const res = await getMe(token);
                setUser(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchUser();

        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [token]);

    return (
        <nav className="bg-blue-500 p-4 text-white flex justify-between items-center">
            <h1 className="font-bold text-xl cursor-pointer">Mini Event Tracker</h1>
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 bg-white text-blue-500 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition cursor-pointer"
                >
                    {user.email || "User"}
                    <svg
                        className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : "rotate-0"}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white text-gray-800 rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50">
                        <div className="p-4 border-b border-gray-200">

                            <p className="text-sm text-gray-500 cursor-pointer">{user.email}</p>
                        </div>
                        <button
                            onClick={logout}
                            className="w-full text-left px-4 py-3 hover:bg-gray-100 transition font-medium text-red-500 cursor-pointer"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
