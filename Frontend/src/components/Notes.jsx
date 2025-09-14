import { useEffect, useState } from "react";
import axios from "axios";
import Popup from "./Popup";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [editingId, setEditingId] = useState(null);
  const [popupMessage, setPopupMessage] = useState(""); // 🔥 for popup

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const fetchNotes = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/notes`, {
        headers,
        withCredentials: true,
      });
      setNotes(res.data);
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const createOrUpdateNote = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(
          `${import.meta.env.VITE_BASE_URL}/notes/${editingId}`,
          form,
          { headers, withCredentials: true }
        );
        setEditingId(null);
      } else {
        await axios.post(`${import.meta.env.VITE_BASE_URL}/notes`, form, {
          headers,
          withCredentials: true,
        });
      }
      setForm({ title: "", content: "" });
      fetchNotes();
    } catch (err) {
      if (err.response && err.response.status === 403) {
        setPopupMessage("Maximum limit reached. Upgrade to pro."); // 🔥 show popup
      } else {
        console.error("Error creating/updating note:", err);
      }
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/notes/${id}`, {
        headers,
        withCredentials: true,
      });
      fetchNotes();
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  const startEditing = (note) => {
    setForm({ title: note.title, content: note.content });
    setEditingId(note._id);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Notes</h2>

      <form onSubmit={createOrUpdateNote} className="mb-6 flex space-x-2">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border p-2 rounded w-1/4"
          required
        />
        <input
          type="text"
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="border p-2 rounded flex-grow"
          required
        />
        <button
          type="submit"
          className={`${
            editingId ? "bg-green-600" : "bg-blue-600"
          } text-white px-4 py-2 rounded`}
        >
          {editingId ? "Update" : "Add"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setForm({ title: "", content: "" });
            }}
            className="bg-gray-500 text-white px-3 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </form>

      <ul>
        {notes.map((note) => (
          <li
            key={note._id}
            className="border p-3 mb-2 rounded flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold">{note.title}</h3>
              <p>{note.content}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => startEditing(note)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteNote(note._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* 🔥 Show popup if message exists */}
      {popupMessage && (
        <Popup
          message={popupMessage}
          onClose={() => setPopupMessage("")}
        />
      )}
    </div>
  );
};

export default Notes;
