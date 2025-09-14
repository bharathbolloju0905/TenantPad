import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const Home = ({ user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  function upgradePlan() {
   try{
      const token = localStorage.getItem("token");
      const res = axios.post(`${import.meta.env.VITE_BASE_URL}/tenants/${user?.tenant?.name}/upgrade`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      <Navigate to="/" />
   }catch(err){
      console.error("Upgrade failed:", err);
      alert(err.response?.data?.message || "Upgrade failed");
   }
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Welcome, {user?.username}</h1>
      <p className="text-gray-600">Tenant: {user?.tenant?.name} ({user?.role})</p>

      <div className="mt-6 space-x-4">
        <button onClick={() => navigate("/notes")} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Manage Notes</button>
        {user?.role === "admin" && (
          <button onClick={() => navigate("/invite")} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Invite Users</button>
        )}
        {user?.role === "admin" && user?.tenant?.plan=== "free" && (
          <button onClick={upgradePlan} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Upgrade Plan</button>
        )}
      </div>
    </div>
  );
};

export default Home;
