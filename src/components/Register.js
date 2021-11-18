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
    props.setUser(info.user);
    history.push("/");
  };

  return (
    <div
      style={{
        backgroundImage: `url("https://initiafy-website-images.s3.amazonaws.com/wordpress-upload/2019/09/Hero-Amazing-Construction-10-US-Football-Stadiums-We-Love.jpg")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <form onSubmit={handlesubmit} className="form">
        <div className="form-contents">
          <div>
            <label />
            Email*
            <div class="input-container">
              <i class="fa fa-envelope icon" />
              <input
                class="input-field"
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
            <div class="input-container">
              <i class="fa fa-user icon" />
              <input
                class="input-field"
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
            <div class="input-container">
              <i class="fa fa-key icon"></i>
              <input
                class="input-field"
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
            <div class="input-container">
              <input
                class="input-field"
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
              <button className="register-btn">Register</button>
            </div>
            <div>
              <Link to="/login">Have An Account? Login Here!</Link>
            </div>
          </div>
          <div>
            <p>{errorMessage}</p>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Register;
