import { useState, useEffect } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

export default function ForumPage() {
    const currentUserId = 1;

    const [entries, setEntries] = useState([
        {
            id: 1,
            userId: 1,
            title: "Morning Run Tips",
            text: "What's your go-to routine before a run?",
            edited: false,
            comments: [
                { id: 1, userId: 2, user: "Alice", text: "I always stretch for 10 minutes.", edited: false },
                { id: 2, userId: 1, user: "You", text: "I prefer quick dynamic warm-ups.", edited: false }
            ],
        }
    ]);

    const [selectedEntry, setSelectedEntry] = useState(null);
    const [newComment, setNewComment] = useState("");
    const [dropdownOpenId, setDropdownOpenId] = useState(null);
    const [commentDropdown, setCommentDropdown] = useState(null);
    const [editingEntry, setEditingEntry] = useState(null);
    const [editingText, setEditingText] = useState("");
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingCommentText, setEditingCommentText] = useState("");

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "Escape") {
                setSelectedEntry(null);
                setDropdownOpenId(null);
                setCommentDropdown(null);
                setEditingEntry(null);
                setEditingCommentId(null);
            }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, []);

    const handleCardClick = (entry) => {
        setSelectedEntry(entry);
        setEditingEntry(null);
        setEditingText("");
        setDropdownOpenId(null);
        setCommentDropdown(null);
    };

    const handleAddComment = () => {
        if (!newComment.trim()) return;
        const newCom = {
            id: Date.now(),
            userId: currentUserId,
            user: "You",
            text: newComment,
            edited: false,
        };
        const updated = entries.map((e) =>
            e.id === selectedEntry.id
                ? { ...e, comments: [...e.comments, newCom] }
                : e
        );
        setEntries(updated);
        setSelectedEntry((prev) => ({
            ...prev,
            comments: [...prev.comments, newCom],
        }));
        setNewComment("");
    };

    const handleDeleteEntry = (id) => {
        setEntries(entries.filter((e) => e.id !== id));
        setSelectedEntry(null);
    };

    const handleDeleteComment = (entryId, commentId) => {
        const updated = entries.map((e) =>
            e.id === entryId
                ? { ...e, comments: e.comments.filter((c) => c.id !== commentId) }
                : e
        );
        setEntries(updated);
        if (selectedEntry?.id === entryId) {
            setSelectedEntry((prev) => ({
                ...prev,
                comments: prev.comments.filter((c) => c.id !== commentId),
            }));
        }
    };

    const handleSaveEntryEdit = () => {
        const updated = entries.map((e) =>
            e.id === editingEntry ? { ...e, text: editingText, edited: true } : e
        );
        setEntries(updated);
        if (selectedEntry?.id === editingEntry) {
            setSelectedEntry((prev) => ({
                ...prev,
                text: editingText,
                edited: true,
            }));
        }
        setEditingEntry(null);
    };

    const handleSaveCommentEdit = () => {
        const updated = entries.map((e) =>
            e.id === selectedEntry.id
                ? {
                    ...e,
                    comments: e.comments.map((c) =>
                        c.id === editingCommentId ? { ...c, text: editingCommentText, edited: true } : c
                    ),
                }
                : e
        );
        setEntries(updated);
        setSelectedEntry((prev) => ({
            ...prev,
            comments: prev.comments.map((c) =>
                c.id === editingCommentId ? { ...c, text: editingCommentText, edited: true } : c
            ),
        }));
        setEditingCommentId(null);
    };

    return (
        <div className="bg-gray-100 min-h-screen py-10 px-4">
            <div className="max-w-5xl mx-auto bg-white/90 rounded-xl shadow p-6">
                <h1 className="text-3xl font-bold mb-6 text-blue-600">Forum</h1>
                <div className="space-y-4">
                    {entries.map((entry) => (
                        <div
                            key={entry.id}
                            onClick={() => handleCardClick(entry)}
                            className="bg-gray-50 p-4 rounded-lg border relative hover:bg-gray-100 cursor-pointer"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="font-semibold text-lg">{entry.title}</h2>
                                    <p className="text-gray-600 mt-1">
                                        {entry.text} {entry.edited && <span className="text-xs text-gray-400">(edited)</span>}
                                    </p>
                                </div>
                                {entry.userId === currentUserId && (
                                    <div className="relative z-50">
                                        <EllipsisVerticalIcon
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setDropdownOpenId(dropdownOpenId === entry.id ? null : entry.id);
                                            }}
                                            className="w-5 h-5 text-gray-500 hover:text-gray-700"
                                        />
                                        {dropdownOpenId === entry.id && (
                                            <div className="absolute right-0 mt-2 bg-white shadow rounded w-28 z-[9999]">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedEntry(entry);
                                                        setEditingEntry(entry.id);
                                                        setEditingText(entry.text);
                                                        setDropdownOpenId(null);
                                                    }}
                                                    className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteEntry(entry.id);
                                                    }}
                                                    className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left text-red-500"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedEntry && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full p-6 relative z-50">
                        <button
                            onClick={() => setSelectedEntry(null)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
                        >
                            ✕
                        </button>
                        <h2 className="text-xl font-bold mb-1">{selectedEntry.title}</h2>
                        {editingEntry === selectedEntry.id ? (
                            <>
                <textarea
                    className="w-full border border-gray-300 rounded p-2 mb-2 text-sm"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                />
                                <div className="flex justify-between mb-4">
                                    <button
                                        onClick={() => setEditingEntry(null)}
                                        className="text-sm text-gray-500 hover:text-red-500"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSaveEntryEdit}
                                        className="bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700"
                                    >
                                        Save
                                    </button>
                                </div>
                            </>
                        ) : (
                            <p className="text-gray-700 mb-4">
                                {selectedEntry.text} {selectedEntry.edited && <span className="text-xs text-gray-400">(edited)</span>}
                            </p>
                        )}
                        <hr className="mb-4" />
                        <h3 className="font-semibold text-blue-600 mb-2">Comments</h3>
                        <div className="space-y-2 max-h-60 overflow-y-auto mb-4">
                            {selectedEntry.comments.map((c) => (
                                <div key={c.id} className="relative bg-gray-100 p-2 rounded flex justify-between items-start">
                                    <div>
                                        {editingCommentId === c.id ? (
                                            <>
                        <textarea
                            className="w-full border rounded p-1 text-sm mb-1"
                            value={editingCommentText}
                            onChange={(e) => setEditingCommentText(e.target.value)}
                        />
                                                <div className="text-right space-x-2">
                                                    <button
                                                        onClick={() => setEditingCommentId(null)}
                                                        className="text-sm text-gray-500 hover:text-red-500"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        onClick={handleSaveCommentEdit}
                                                        className="text-sm text-blue-600 hover:underline"
                                                    >
                                                        Save
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <p className="text-sm">
                                                <strong>{c.user}:</strong> {c.text}{" "}
                                                {c.edited && <span className="text-xs text-gray-400">(edited)</span>}
                                            </p>
                                        )}
                                    </div>
                                    {c.userId === currentUserId && !editingCommentId && (
                                        <div className="relative inline-block z-50">
                                            <EllipsisVerticalIcon
                                                onClick={() => setCommentDropdown(commentDropdown === c.id ? null : c.id)}
                                                className="w-4 h-4 text-gray-500 hover:text-gray-700 cursor-pointer"
                                            />
                                            {commentDropdown === c.id && (
                                                <div className="absolute right-0 top-full mt-1 bg-white border rounded shadow w-28 z-[9999]">
                                                    <button
                                                        onClick={() => {
                                                            setEditingCommentId(c.id);
                                                            setEditingCommentText(c.text);
                                                            setCommentDropdown(null);
                                                        }}
                                                        className="block px-4 py-1 text-sm hover:bg-gray-100 w-full text-left"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteComment(selectedEntry.id, c.id)}
                                                        className="block px-4 py-1 text-sm hover:bg-gray-100 text-red-500 w-full text-left"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <textarea
                            rows="3"
                            className="w-full border border-gray-300 rounded-md p-2 text-sm mb-2"
                            placeholder="Write a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleAddComment();
                                }
                            }}
                        />
                        <div className="flex justify-end">
                            <button
                                onClick={handleAddComment}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
