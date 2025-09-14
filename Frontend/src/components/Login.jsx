import { useState ,useContext} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login`, formData, {
        withCredentials: true,
      });
      setUser(res.data.user);
      console.log("Login successful:", res.data.user);
      login(res.data.token);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full mb-3 rounded"/>
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full mb-3 rounded"/>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Login</button>
      </form>
    </div>
  );
};

export default Login;
