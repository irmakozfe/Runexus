import Card from '../components/Card';

export default function EventsPage() {
    return (
        <main className="bg-gray-100 min-h-screen py-10 px-6">
            <h1 className="text-3xl font-bold text-center text-blue-700 mb-10">
                Explore Upcoming Events
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 12 }).map((_, i) => (
                    <Card
                        key={i}
                        title="The ultimate UX and UI guide to card design"
                        description="Lorem ipsum dolor sit amet pretium consectetur adipiscing elit. Lorem consectetur adipiscing elit."
                        image="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e"
                    />
                ))}
            </div>
        </main>
    );
}
