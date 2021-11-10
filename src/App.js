import { useEffect, useState } from "react";
import { Route } from "react-router";
import "./App.css";
import BASE_URL from "./BaseURL";
import Home from "./components/Home";
import Login from "./components/Login";
<<<<<<< HEAD
=======
import Logout from "./components/Logout";
>>>>>>> main
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import Register from "./components/Register";

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
<<<<<<< HEAD
  const [jerseys, setJerseys] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const savedToken = localStorage.getItem("token");

      if (!savedToken) {
=======

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      console.log(token);
      if (!token) {
>>>>>>> main
        return;
      }

      const resp = await fetch(`${BASE_URL}/users/me`, {
        headers: {
<<<<<<< HEAD
          Authorization: `Bearer ${savedToken}`,
=======
          Authorization: `Bearer ${token}`,
>>>>>>> main
        },
      });

      const info = await resp.json();

<<<<<<< HEAD
      setUser({
        id: info.user.id,
        username: info.user.username,
        admin: info.user.admin,
      });
=======
      setUser({ id: info.user.id, username: info.user.username });
>>>>>>> main
      setToken(info.token);
      localStorage.setItem("token", info.token);
    };
    fetchUser();
  }, []);
  return (
    <div>
<<<<<<< HEAD
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
=======
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
      <Route path="/products">
        <Products />
      </Route>
      <Route path="/logout">
        <Logout />
>>>>>>> main
      </Route>
    </div>
  );
}

export default App;
