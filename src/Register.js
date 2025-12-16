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
      await axios.post("http://localhost:4000/register", { user: register });
      alert("Successfully registered!");
      navigate("/login");
    } catch (err) {
      console.error(err.response || err);
      alert("Failed to register user");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-sm" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="card-title text-center mb-3">Register</h3>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <input
              className="form-control"
              name="username"
              onChange={update}
              value={register.username}
              placeholder="Username"
              required
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              name="email"
              type="email"
              onChange={update}
              value={register.email}
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              name="password"
              type="password"
              onChange={update}
              value={register.password}
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
