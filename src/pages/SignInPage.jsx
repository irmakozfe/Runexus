import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';


export default function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/auth/login', {
                email,
                password
            });

            // 2️⃣ JWT token varsa buradan al
            const token = response.data.token;
            localStorage.setItem('token', token);

            // 3️⃣ Axios'a default header olarak ekle
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            // 4️⃣ Başarıyla giriş yaptıysa yönlendir
            navigate('/events');
        } catch (error) {
            console.error('Giriş başarısız:', error);
            alert("Giriş başarısız: " + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-xl shadow">
                <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">Sign In to Runexus</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Sign In
                    </button>
                </form>
                <p className="text-sm text-center mt-4 text-gray-600">
                    Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
                </p>
            </div>
        </div>
    );
}
