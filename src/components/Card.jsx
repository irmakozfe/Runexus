import { useState } from 'react';

export default function Card({ title, description, image }) {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <>
            {/* Kart */}
            <div className="bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden flex flex-col">
                <img src={image} alt={title} className="w-full h-40 object-cover" />
                <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                        <h2 className="font-semibold text-lg mb-1">{title}</h2>
                        <p className="text-sm text-gray-600">{description}</p>
                    </div>
                    <button
                        className="mt-4 bg-blue-600 text-white text-sm px-4 py-2 rounded-full hover:bg-blue-700"
                        onClick={() => setShowDetails(true)}
                    >
                        View Details
                    </button>
                </div>
            </div>

            {/* Detaylı Açılır Modal */}
            {showDetails && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center px-4">
                    <div className="bg-white max-w-xl w-full rounded-xl shadow-lg overflow-hidden">
                        <img src={image} alt={title} className="w-full h-64 object-cover" />
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-blue-700 mb-2">{title}</h2>
                            <p className="text-gray-700 mb-4">{description}</p>
                            <p className="text-sm text-gray-500">📍 Berlin, Germany</p>
                            <p className="text-sm text-gray-500 mb-4">🗓️ 21 June 2025</p>
                            <button
                                onClick={() => setShowDetails(false)}
                                className="mt-2 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
