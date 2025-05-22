import { useState } from 'react';

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("profile");

    // Profile state
    const [username, setUsername] = useState("buseokcu");
    const [newUsername, setNewUsername] = useState("");
    const [profileImage, setProfileImage] = useState("https://i.pravatar.cc/150?img=3");

    // Privacy state
    const [isPrivate, setIsPrivate] = useState(false);
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

    // Notification state
    const [emailNotif, setEmailNotif] = useState(true);
    const [smsNotif, setSmsNotif] = useState(false);

    const handleUsernameChange = () => {
        if (newUsername.trim()) {
            setUsername(newUsername);
            setNewUsername("");
            alert("Kullanıcı adı güncellendi!");
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setProfileImage(imageURL);
        }
    };

    return (
        <div className="min-h-screen flex bg-gray-50">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Settings</h2>
                <ul className="space-y-3 text-gray-700">
                    <li
                        onClick={() => setActiveTab("profile")}
                        className={`cursor-pointer ${activeTab === "profile" ? "text-blue-600 font-medium" : "hover:text-blue-500"}`}
                    >
                        Profile
                    </li>
                    <li
                        onClick={() => setActiveTab("privacy")}
                        className={`cursor-pointer ${activeTab === "privacy" ? "text-blue-600 font-medium" : "hover:text-blue-500"}`}
                    >
                        Privacy
                    </li>
                    <li
                        onClick={() => setActiveTab("notifications")}
                        className={`cursor-pointer ${activeTab === "notifications" ? "text-blue-600 font-medium" : "hover:text-blue-500"}`}
                    >
                        Notifications
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">
                {activeTab === "profile" && (
                    <>
                        <h1 className="text-2xl font-bold text-blue-700 mb-6">Profile Settings</h1>
                        <div className="mb-6">
                            <img
                                src={profileImage}
                                alt="Profile"
                                className="w-32 h-32 rounded-full border shadow-md object-cover"
                            />
                            <div className="mt-2">
                                <label className="text-sm text-gray-600">Change Profile Picture</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="block mt-1 text-sm"
                                />
                            </div>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 mb-1">Current Username</label>
                            <p className="mb-2 font-semibold">{username}</p>
                            <input
                                type="text"
                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value)}
                                placeholder="New username"
                                className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full mb-2"
                            />
                            <button
                                onClick={handleUsernameChange}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
                            >
                                Update Username
                            </button>
                        </div>
                    </>
                )}

                {activeTab === "privacy" && (
                    <>
                        <h1 className="text-2xl font-bold text-blue-700 mb-6">Privacy Settings</h1>
                        <div className="mb-4">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={isPrivate}
                                    onChange={() => setIsPrivate(!isPrivate)}
                                />
                                <span>Make my profile private</span>
                            </label>
                        </div>
                        <div className="mb-4">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={twoFactorEnabled}
                                    onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
                                />
                                <span>Enable two-factor authentication (2FA)</span>
                            </label>
                        </div>
                    </>
                )}

                {activeTab === "notifications" && (
                    <>
                        <h1 className="text-2xl font-bold text-blue-700 mb-6">Notification Settings</h1>
                        <div className="mb-4">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={emailNotif}
                                    onChange={() => setEmailNotif(!emailNotif)}
                                />
                                <span>Email Notifications</span>
                            </label>
                        </div>
                        <div className="mb-4">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={smsNotif}
                                    onChange={() => setSmsNotif(!smsNotif)}
                                />
                                <span>SMS Notifications</span>
                            </label>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
