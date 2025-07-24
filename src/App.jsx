import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import EventsPage from './pages/EventsPage';
import ForumPage from './pages/ForumPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import MessageDetailPage from './pages/MessageDetailPage';


function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-100">
                <Navbar />
                <Routes>
                    <Route path="/" element={<LandingPage />} />          {/* ANASAYFA */}
                    <Route path="/events" element={<EventsPage />} />     {/* ETKİNLİKLER */}
                    <Route path="/forum" element={<ForumPage />} />       {/* FORUM */}
                    <Route path="/signin" element={<SignInPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/messages/:id" element={<MessageDetailPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
