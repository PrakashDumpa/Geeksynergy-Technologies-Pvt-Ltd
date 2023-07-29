import { useState, useEffect } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import LinearProgress from "@mui/material/LinearProgress";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const navigate = useNavigate();

  const onClickSubmit = (event) => {
    event.preventDefault();
    const currentUsers = JSON.parse(localStorage.getItem("usersData"));
    const isUserAlreadyExits = currentUsers.find(
      (obj) => obj.email === email && obj.password === password
    );
    if (isUserAlreadyExits) {
      setIsLoginSuccess(true);
      setIsInvalid(false);
      Cookies.set("jwtToken", email + "token");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      setIsInvalid(true);
    }
  };

  return (
    <div className="">
      <form onSubmit={onClickSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            required
            placeholder="Enter email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            required
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
          <small id="emailHelp" className="form-text text-muted">
            We respect your privacy.
          </small>
        </div>

        <button type="submit" className="btn btn-primary w-100 mt-3">
          Login
        </button>
        {isLoginSuccess && <LinearProgress />}
        {isInvalid && (
          <small id="emailHelp" className="form-text text-danger">
            Invalid credentials entered!
          </small>
        )}
      </form>
    </div>
  );
};

export default Login;
