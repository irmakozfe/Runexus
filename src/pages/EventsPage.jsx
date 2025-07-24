import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import api from '../api/api';

export default function EventsPage() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        api.get('/events')
            .then((res) => {
                setEvents(res.data);
            })
            .catch((err) => {
                console.error('Etkinlikler alınamadı:', err);
            });
    }, []);

    return (
        <main className="bg-gray-100 min-h-screen py-10 px-6">
            <h1 className="text-3xl font-bold text-center text-blue-700 mb-10">
                Explore Upcoming Events
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {events.map((event) => (
                    <Card
                        key={event.eventId}
                        title={event.title}
                        description={event.description}
                        image={event.imageUrl || 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e'} // fallback image
                    />
                ))}
            </div>
        </main>
    );
}
