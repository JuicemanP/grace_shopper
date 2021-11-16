import { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import BASE_URL from "../BaseURL";
import "./Form.css";
const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = props;

  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log(username, password);

    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const info = await response.json();

    if (info.error) {
      setErrorMessage(info.error);
      return;
    }
    console.log(info);
    localStorage.setItem("token", info.token);
    props.setToken(info.token);
    setUser(info.user);
    history.push("/");
  };

  return (
    <div>
      <form onSubmit={handlesubmit} className="form">
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
          <div>
            <button>Login</button>
          </div>
          <div>
            <Link to="/Register">Don't Have An Account? Register Here!</Link>
          </div>
        </div>
        <div>
          <p>{errorMessage}</p>
        </div>
      </form>
    </div>
  );
};
export default Login;
