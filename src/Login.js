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
      const res = await axios.post("http://localhost:4000/login", { user: login });
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
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-sm" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="card-title text-center mb-3">Welcome to the Login Page</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              className="form-control"
              name="username"
              onChange={update}
              value={login.username}
              placeholder="Username"
              required
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              type="password"
              name="password"
              onChange={update}
              value={login.password}
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <p className="mt-3 text-center">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
