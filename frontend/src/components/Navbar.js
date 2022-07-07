import logo from "../images/logo.png"
import Navigation from "./Navigation"
import xv from "../images/xv.png"

const Navbar = ()=>{
    return <header className="navbar" style={{backgroundImage:`url(${xv})`}}>
        <div className="navbar-container">
        <div className="logo">
            <img src={logo} alt="castello-logo" />
        </div>
        <Navigation />
        {/* <div className="burger">
       {nav?  <MdRestaurantMenu /> : <MdMenu />}
        </div> */}
        </div>
        
    </header>
}
export default Navbar