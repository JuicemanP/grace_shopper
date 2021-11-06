import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <Link to="/"> Home </Link> ||
      <Link to="/register"> Register</Link> ||
      <Link to="/login"> Login</Link> ||
      <Link to="/logout"> Logout</Link>
      <Link to="/shopping-cart">Shopping Cart</Link>
    </div>
  );
};

export default Navbar;
