import { useState } from "react";
import { Link } from "react-router-dom";
import BASE_URL from "../BaseURL";
import { useHistory } from "react-router";
import "./Form.css";
const Register = (props) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log(email, username, password, confirmPassword);

    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        username,
        password,
      }),
    });
    const info = await response.json();
    console.log(info);
    if (info.error) {
      setErrorMessage(info.error);
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Password do not match!");
      return;
    }
    localStorage.setItem("token", info.token);
    props.setToken(info.token);
    history.push("/");
  };

  return (
    <div>
      <form onSubmit={handlesubmit} className="form">
        <div>
          <label />
          Email*
          <div>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div>
          <label />
          Username*
          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        </div>
        <div>
          <label />
          Password*
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={"8"}
              required
            />
          </div>
        </div>
        <div>
          <label />
          Confirm Password*
          <div>
            <input
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              minLength={"8"}
              required
            />
          </div>
        </div>
        <div>
          <div>
            <button>Register</button>
          </div>
          <div>
            <Link to="/login">Have An Account? Login Here!</Link>
          </div>
        </div>
        <div>
          <p>{errorMessage}</p>
        </div>
      </form>
    </div>
  );
};
export default Register;
