import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [login, setLogin] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const update = (e) => setLogin({ ...login, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:4000/login", { user: login });
      if (res.status === 200 && res.data.user) {
        const { user, token } = res.data;
        onLogin(user, token);
        navigate("/listings");
      } else {
        alert("Incorrect username or password");
      }
    } catch (err) {
      alert("Login failed");
      console.error(err.response || err);
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <input name="username" onChange={update} value={login.username} placeholder="Username" />
        <input name="password" type="password" onChange={update} value={login.password} placeholder="Password" />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </>
  );
}

export default Login;
