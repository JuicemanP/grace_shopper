import { Link } from "react-router-dom"

const Navbar = (props)=>{


    return <div >
<div className="dropdown">
<Link to = "/"> Home </Link> 
    <div class="dropdown-content">
    <div>Categories</div>
        <div class="dropdown-content">
        <Link>Men</Link>
        <Link>Women</Link>
        <Link>Children</Link>
        </div>
    </div>
</div>

<Link>
<input type="text" placeholder="Search..."/>
</Link>
<Link>Cart</Link>
{!props.user && <Link to = "/login"> Login</Link>} 
{!props.user && <Link to = "/register"> Register</Link>} 
{props.user && <Link to ="/logout"> Logout</Link>} 
    </div>
}

export default Navbar