<<<<<<< HEAD
import { Route } from "react-router";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Cart from "./components/Cart";
import Products from "./components/Products";
=======

import { useEffect, useState } from 'react';
import { Route } from 'react-router';
import './App.css';
import BASE_URL from './BaseURL';
import Home from './components/Home';
import Login from './components/Login';
import Logout from './components/Logout';
import Navbar from './components/Navbar';
import Register from './components/Register';
>>>>>>> bacf71eafb71e780bad6e8538332b94304485997

function App() {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null);
 

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      
      if (!token) {
        return;
      }
      setToken(token);
      
      const resp = await fetch(`${BASE_URL}/users/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const info = await resp.json();
      console.log(info)
      setUser({id: info.id, username: info.username});
    };
    fetchUser();
  }, [token]);
  return (
    <div>
<<<<<<< HEAD
      <Navbar />
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/logout">
        <Logout />
      </Route>
      <Route path="/shopping-cart">
        <Cart />
=======
      <Navbar user={user}/>
      <Route exact path = "/">
        <Home user={user}/>
      </Route>
      <Route path ="/register">
        <Register setToken={setToken}/>
      </Route>
      <Route path ="/login">
        <Login
        user={user}
        setUser={setUser}
        token={token}
        setToken={setToken}/>
>>>>>>> bacf71eafb71e780bad6e8538332b94304485997
      </Route>
      <Route path="/products">
        <Products />
      </Route>
    </div>
  );
}

export default App;
