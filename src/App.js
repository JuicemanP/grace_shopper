import { useEffect, useState } from "react";
import { Route } from "react-router";
import "./App.css";
import BASE_URL from "./BaseURL";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import Register from "./components/Register";

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [jerseys, setJerseys] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const savedToken = localStorage.getItem("token");

      if (!savedToken) {
        return;
      }

      const resp = await fetch(`${BASE_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${savedToken}`,
        },
      });

      const info = await resp.json();

      setUser({
        id: info.user.id,
        username: info.user.username,
        admin: info.user.admin,
      });
      setToken(info.token);
      localStorage.setItem("token", info.token);
    };
    fetchUser();
  }, [token]);
  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      <Route exact path="/">
        <Home user={user} />
      </Route>
      <Route path="/register">
        <Register setToken={setToken} setUser={setUser} />
      </Route>
      <Route path="/login">
        {!user && (
          <Login
            user={user}
            setUser={setUser}
            token={token}
            setToken={setToken}
          />
        )}
      </Route>
      <Route path="/products">
        <Products jerseys={jerseys} setJerseys={setJerseys} />
      </Route>
    </div>
  );
}

export default App;
