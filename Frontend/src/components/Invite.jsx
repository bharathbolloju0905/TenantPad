import { useState } from "react";
import axios from "axios";

const Invite = () => {
  const [email, setEmail] = useState("");

  const handleInvite = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/invite`,
        { email },
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Invite failed");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Invite User</h2>
      <form onSubmit={handleInvite} className="flex space-x-2">
        <input type="email" placeholder="User Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 rounded flex-grow"/>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Invite</button>
      </form>
    </div>
  );
};

export default Invite;
