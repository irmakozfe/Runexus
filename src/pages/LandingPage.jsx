import React from 'react';
import Card from '../components/Card';

export default function LandingPage() {
    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <div className="text-center py-20 px-4">
                <h1 className="text-4xl font-bold text-blue-700 mb-4">Welcome to Runexus</h1>
                <p className="text-gray-600 max-w-xl mx-auto">
                    Discover and book amazing running events around the world. Join the community and stay active!
                </p>
            </div>

            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Popular Events</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Card
                            key={i}
                            title="Popular Running Event"
                            description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                            image="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
