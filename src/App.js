
import { useEffect, useState } from 'react';
import { Route } from 'react-router';
import './App.css';
import BASE_URL from './BaseURL';
import Home from './components/Home';
import Login from './components/Login';
import Logout from './components/Logout';
import Navbar from './components/Navbar';
import Register from './components/Register';

function App() {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null);
 

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      
      if (!token) {
        return;
      }
      
      const resp = await fetch(`${BASE_URL}/users/me`, {
        headers: {
  
          Authorization: `Bearer ${token}`,
        },
      });
      
      const info = await resp.json();
      
      setUser({id: info.user.id, username: info.user.username});
      setToken(info.token);
    };
    fetchUser();
  }, [token]);
  return (
    <div>
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
      </Route>
      <Route path ="/logout">
        <Logout/>
      </Route>
    </div>
  );
}

export default App;
