import { useEffect, useState } from "react";
import { Route } from "react-router";
import "./App.css";
import BASE_URL from "./BaseURL";
import Home from "./components/Home";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Products from "./components/Products";

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      console.log(token);
      if (!token) {
        return;
      }
      // setToken(token);

      const resp = await fetch(`${BASE_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(resp);
      const info = await resp.json();

      setUser({ id: info.id, username: info.username });
      setToken(token);
    };
    fetchUser();
  }, []);
  return (
    <div>
      <Navbar user={user} />
      <Route exact path="/">
        <Home user={user} />
      </Route>
      <Route path="/register">
        <Register setToken={setToken} />
      </Route>
      <Route path="/login">
        <Login
          user={user}
          setUser={setUser}
          token={token}
          setToken={setToken}
        />
      </Route>
      <Route path="/products">
        <Products />
      </Route>
      <Route path="/logout">
        <Logout />
      </Route>
    </div>
  );
}

export default App;
