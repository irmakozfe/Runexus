import React, { useState } from 'react';
import { Link } from 'react-router-dom';


export default function SignUpPage() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Kayıt formu:', form);
        // Buraya kayıt API'si eklenebilir
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-xl shadow">
                <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">Create Your Account</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            name="name"
                            type="text"
                            required
                            value={form.name}
                            onChange={handleChange}
                            className="mt-1 w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            name="email"
                            type="email"
                            required
                            value={form.email}
                            onChange={handleChange}
                            className="mt-1 w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            name="password"
                            type="password"
                            required
                            value={form.password}
                            onChange={handleChange}
                            className="mt-1 w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="text-sm text-center mt-4 text-gray-600">
                    Already have an account? <Link to="/signin" className="text-blue-600 hover:underline">Sign in</Link>
                </p>
            </div>
        </div>
    );
}
