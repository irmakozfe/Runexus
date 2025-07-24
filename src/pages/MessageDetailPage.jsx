import React from 'react';
import { useParams } from 'react-router-dom';

export default function MessageDetailPage() {
    const { id } = useParams();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-6 rounded-xl shadow max-w-md w-full">
                <h1 className="text-xl font-bold text-blue-600 mb-4">Message #{id}</h1>
                <p className="text-gray-700">Bu, mesaj detay sayfasıdır. Burada seçilen mesajın tüm içeriği gösterilir.</p>
            </div>
        </div>
    );
}
