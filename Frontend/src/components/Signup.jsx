import { useState ,useContext} from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyname: ""
  });
  const { login } = useContext(AuthContext);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/signup`, formData, {
        withCredentials: true,
      });
      alert("Signup successful! Please login.");
      login(res.data.token);
      console.log(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 w-96">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} className="border p-2 w-full mb-3 rounded"/>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full mb-3 rounded"/>
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full mb-3 rounded"/>
        <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} className="border p-2 w-full mb-3 rounded"/>
        <input type="text" name="companyname" placeholder="Company Name" onChange={handleChange} className="border p-2 w-full mb-3 rounded"/>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
