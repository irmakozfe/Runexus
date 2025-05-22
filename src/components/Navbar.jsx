import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { BellIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

export default function Navbar() {

const [messages, setMessages] = useState([
    { id: 1, user: "Alice", text: "Etkinliğe katılıyor musun?", read: false },
    { id: 2, user: "Bob", text: "Yarınki koşu saat kaçta?", read: true },
    { id: 3, user: "Charlie", text: "Tebrikler!", read: false }
]);


    const location = useLocation();
    const path = location.pathname;
    const isLandingPage = path === '/';
    const isAuthPage = path === '/signin' || path === '/signup';
    const navigate = useNavigate();

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [msgOpen, setMsgOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [replyText, setReplyText] = useState("");

    const profileRef = useRef();
    const msgRef = useRef();
    const notifRef = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) setDropdownOpen(false);
            if (msgRef.current && !msgRef.current.contains(e.target)) setMsgOpen(false);
            if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            <nav className="bg-white shadow p-4 flex justify-between items-center">
                <div className="flex items-center space-x-6">
                    <div className="text-xl font-bold text-blue-600">Runexus</div>
                    {!isAuthPage && !isLandingPage && (
                        <>
                            <Link to="/events" className="text-gray-700 hover:text-blue-500 font-medium">Events</Link>
                            <Link to="/forum" className="text-gray-700 hover:text-blue-500 font-medium">Forum</Link>
                        </>
                    )}
                </div>

                {!isAuthPage && (
                    <div className="relative flex items-center space-x-4">
                        {isLandingPage ? (
                            <>
                                <Link to="/signin" className="text-black font-medium px-4 py-2">Sign In</Link>
                                <Link to="/signup" className="bg-blue-600 text-white font-medium px-4 py-2 rounded-md hover:bg-blue-700">
                                    Sign Up
                                </Link>
                            </>
                        ) : (
                            <>
                                {/* Messages Icon */}
                                <div ref={msgRef} className="relative">
                                    <EnvelopeIcon onClick={() => {
                                        setMsgOpen(!msgOpen);
                                        setNotifOpen(false);
                                        setDropdownOpen(false);
                                    }} className="w-6 h-6 text-gray-600 hover:text-blue-500 cursor-pointer" />
                                    {msgOpen && (
                                        <div className="absolute right-0 top-8 bg-white shadow rounded-md w-64 p-2 z-50">
                                            <p className="font-semibold px-2 pb-2 border-b">Messages</p>
                                            {messages.map((msg) => (
                                                <div
                                                    key={msg.id}
                                                    onClick={() => {
                                                        setMsgOpen(false);
                                                        setMessages((prev) =>
                                                            prev.map((m) => m.id === msg.id ? { ...m, read: true } : m)
                                                        );
                                                        setSelectedMessage(msg);
                                                    }}
                                                    className={`p-2 text-sm rounded cursor-pointer hover:bg-gray-100 ${msg.read ? 'text-gray-500' : 'font-semibold'}`}
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <p>{msg.user}</p>
                                                        {!msg.read && <span className="w-2 h-2 bg-red-500 rounded-full inline-block" />}
                                                    </div>
                                                    <p className="text-xs">{msg.text}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Notifications Icon */}
                                <div ref={notifRef} className="relative">
                                    <BellIcon onClick={() => {
                                        setNotifOpen(!notifOpen);
                                        setMsgOpen(false);
                                        setDropdownOpen(false);
                                    }} className="w-6 h-6 text-gray-600 hover:text-blue-500 cursor-pointer" />
                                    {notifOpen && (
                                        <div className="absolute right-0 top-8 bg-white shadow rounded-md w-64 p-2 z-50">
                                            <p className="font-semibold px-2 pb-2 border-b">Notifications</p>
                                            {[1, 2].map((i) => (
                                                <div key={i} className="p-2 text-sm hover:bg-gray-100 rounded">
                                                    <p className="font-medium">Etkinlik Hatırlatması</p>
                                                    <p className="text-gray-500 text-xs">Koşu etkinliği yarın saat 10:00'da başlıyor.</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Profile Dropdown */}
                                <div ref={profileRef} className="relative">
                                    <img
                                        onClick={() => {
                                            setDropdownOpen(!dropdownOpen);
                                            setMsgOpen(false);
                                            setNotifOpen(false);
                                        }}
                                        src="https://i.pravatar.cc/32"
                                        alt="Profile"
                                        className="w-8 h-8 rounded-full border cursor-pointer"
                                    />
                                    {dropdownOpen && (
                                        <div className="absolute right-0 top-12 bg-white shadow-md rounded-md w-40 z-50">
                                            <Link
                                                to="/profile"
                                                className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                Profile
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    setDropdownOpen(false);
                                                    navigate('/signin');
                                                }}
                                                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                                            >
                                                Log out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                )}
            </nav>

            {/* Mesaj Detay Modalı */}
            {selectedMessage && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
                        <button
                            onClick={() => setSelectedMessage(null)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
                        >
                            ✕
                        </button>
                        <h2 className="text-blue-600 font-semibold text-lg mb-2">Message from {selectedMessage.user}</h2>
                        <p className="text-gray-700 mb-4">{selectedMessage.text}</p>
                        <textarea
                            rows="3"
                            className="w-full border border-gray-300 rounded-md p-2 text-sm mb-2"
                            placeholder="Write your reply..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                        />
                        <button
                            onClick={() => {
                                console.log("Yanıt gönderildi:", replyText);
                                setReplyText("");
                                alert("Yanıt gönderildi!");
                            }}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
                        >
                            Send Reply
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
