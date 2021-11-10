import { Link } from "react-router-dom";
import { useHistory } from "react-router";

const Navbar = (props) => {
  const history = useHistory();
  const handleLogout = () => {
    console.log("HELLO THERE");
    props.setUser(null);
    localStorage.removeItem("token");
    history.push("/");
    window.location.reload();
    console.log("GENERAL KENOBI");
  };
  return (
    <div>
      <div className="dropdown">
        <Link to="/"> Home </Link>
        <div class="dropdown-content">
          <Link>Categories</Link>
          <div class="dropdown-content">
            <Link>Men</Link>
            <Link>Women</Link>
            <Link>Children</Link>
          </div>
        </div>
      </div>

      <Link>
        <input placeholder="Search..." />
      </Link>
      <Link>Cart</Link>
      {!props.user && <Link to="/login"> Login</Link>}
      {!props.user && <Link to="/register"> Register</Link>}
      {props.user && (
        <Link to="/" onClick={handleLogout}>
          Logout
        </Link>
      )}
    </div>
  );
};

export default Navbar;
