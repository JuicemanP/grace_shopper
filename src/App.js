
import { Route } from 'react-router';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Logout from './components/Logout';
import Navbar from './components/Navbar';
import Register from './components/Register';

function App() {
  return (
    <div>
      <Navbar/>
      <Route exact path = "/">
        <Home/>
      </Route>
      <Route path ="/register">
        <Register/>
      </Route>
      <Route path ="/login">
        <Login/>
      </Route>
      <Route path ="/logout">
        <Logout/>
      </Route>
    </div>
  );
}

export default App;
