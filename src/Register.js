import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [register, setRegister] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const update = (e) => setRegister({ ...register, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:4000/register", { user: register });
      alert("Successfully registered!");
      navigate("/login");
    } catch (err) {
      console.error(err.response || err);
      alert("Failed to register user");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input name="username" onChange={update} value={register.username} placeholder="Username" />
      <input name="email" onChange={update} value={register.email} placeholder="Email" />
      <input name="password" onChange={update} value={register.password} placeholder="Password" />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
