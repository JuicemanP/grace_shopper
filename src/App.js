import { useEffect, useState } from "react";
import { Route } from "react-router";
import "./App.css";
import BASE_URL from "./BaseURL";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import Register from "./components/Register";
import NewJersey from "./components/NewJersey";
import Cart from "./components/Cart";
import Admin from "./components/Admin";
import { SliderData } from "./components/SliderData";

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [jerseys, setJerseys] = useState([]);
  const [activeOrder, setActiveOrder] = useState({});
  const [cartProducts, setCartProducts] = useState([]);
  const [allProductOrders, setAllProductOrders] = useState([]);

  const fetchJerseys = async () => {
    const response = await fetch(`${BASE_URL}/products`, {
      contentType: "application/json",
    });
    const info = await response.json();
    setJerseys(info);
  };

  const fetchAllUsers = async () => {
    const response = await fetch(`${BASE_URL}/users`);
    const info = await response.json();
    return setAllUsers(info);
  };

  const filterCartProducts = () => {
    if (activeOrder.id) {
      const filteredProdOrds = allProductOrders.filter(
        (prodOrd) => prodOrd.order_id == activeOrder.id
      );
      return setCartProducts(filteredProdOrds);
    }
  };

  const fetchCartProducts = async () => {
    const response = await fetch(`${BASE_URL}/productorders`, {
      contentType: "application/json",
    });
    const info = await response.json();
    const filteredCartProd = info.filter(
      (cart) => cart.order_id == activeOrder.id
    );
    console.log(info, "info");
    setAllProductOrders(info);
  };

  const checkForCart = async () => {
    if (user) {
      const orders = await fetch(`${BASE_URL}/orders/${user.id}/orders`);
      const cartOrder = orders.filter((order) => {
        return order.status == "pending";
      });
      if (cartOrder.length > 0) {
        return setActiveOrder(cartOrder[0]);
      }
    } else {
      return;
    }
  };

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
      setToken(savedToken);
    };

    fetchUser();
    fetchJerseys();
    checkForCart();
    fetchCartProducts();
    fetchAllUsers();
  }, []);

  useEffect(() => {
    filterCartProducts();
  }, [allProductOrders, user]);

  return (
    <div>
      <Navbar
        fetchJerseys={fetchJerseys}
        user={user}
        setUser={setUser}
        jerseys={jerseys}
        setJerseys={setJerseys}
      />
      <Route exact path="/">
        <Home user={user} slides={SliderData} />
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
      <Route path="/create_jersey">
        <NewJersey user={user} fetchJerseys={fetchJerseys} />
      </Route>
      <Route path="/products">
        <Products
          jerseys={jerseys}
          setJerseys={setJerseys}
          fetchJerseys={fetchJerseys}
          fetchCartProducts={fetchCartProducts}
          setCartProducts={setCartProducts}
          user={user}
          activeOrder={activeOrder}
          setActiveOrder={setActiveOrder}
        />
      </Route>
      <Route path="/cart">
        <Cart
          user={user}
          activeOrder={activeOrder}
          setActiveOrder={setActiveOrder}
          cartProducts={cartProducts}
          setCartProducts={setCartProducts}
          fetchCartProducts={fetchCartProducts}
          filterCartProducts={filterCartProducts}
          checkForCart={checkForCart}
        />
      </Route>
      <Route path="/admin">
        <Admin allUsers={allUsers} user={user} />
      </Route>
    </div>
  );
}
export default App;
