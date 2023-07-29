import { useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState();
  const [profession, setProfesssion] = useState("Select");
  const [isInvalid, setIsInvalid] = useState(false);
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
  const navigate = useNavigate();

  const onClickSubmit = (event) => {
    console.log("Triggered", {
      name,
      email,
      password,
      mobile,
      profession,
    });
    event.preventDefault();
    if (!name || !email || !password || !mobile || profession === "Select") {
      return;
    }
    const currentUsers = JSON.parse(localStorage.getItem("usersData"));
    console.log("currentusers", currentUsers);
    let updatedUsers;
    if (!currentUsers) {
      updatedUsers = [
        {
          name,
          email,
          password,
          mobile,
          profession,
        },
      ];
    } else {
      let isUserAlreadyExits = currentUsers.find((obj) => obj.email === email);
      if (isUserAlreadyExits) {
        setIsInvalid(true);
        return;
      }
      updatedUsers = [
        ...currentUsers,
        {
          name,
          email,
          password,
          mobile,
          profession,
        },
      ];
    }
    localStorage.setItem("usersData", JSON.stringify(updatedUsers));
    setIsRegistrationSuccess(true);
    setTimeout(() => {
      navigate("/auth/login");
    }, 2000);
  };

  return (
    <div className="">
      <form onSubmit={onClickSubmit}>
        <div className="form-group">
          <label htmlFor="nameId">Name</label>
          <input
            type="text"
            id="nameId"
            className="form-control"
            placeholder="Krishna"
            onChange={(event) => setName(event.target.value)}
            value={name}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="EmailId">Email</label>
          <input
            type="email"
            id="EmailId"
            className="form-control"
            placeholder="sample@gmail.com"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="MobileId">Mobile</label>
          <input
            type="number"
            id="MobileId"
            className="form-control"
            placeholder="8889990001"
            onChange={(event) => setMobile(event.target.value)}
            value={mobile}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="PasswordId">Password</label>
          <input
            type="text"
            id="PasswordId"
            className="form-control"
            placeholder="Password@123"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            required
          />
          <small className="form-text text-secondary">
            Set strong password!
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="ProfessionId">Profession</label>
          <br />
          <Select
            id="ProfessionId"
            size="small"
            sx={{ width: "100%" }}
            value={profession}
            placeholder="Select"
            label="Profession"
            onChange={(event) => setProfesssion(event.target.value)}>
            <MenuItem value="Select">Select</MenuItem>
            <MenuItem value="Doctor">Doctor</MenuItem>
            <MenuItem value="Developer">Developer</MenuItem>
            <MenuItem value="MBBS">MBBS</MenuItem>
          </Select>
        </div>

        <button type="submit" className="btn btn-primary w-100 mt-3">
          SignUp
        </button>
        {isRegistrationSuccess && <LinearProgress />}
        {isInvalid && (
          <small id="emailHelp" className="form-text text-danger">
            Please verify your credentials & try again.
          </small>
        )}
      </form>
    </div>
  );
};

export default Register;
