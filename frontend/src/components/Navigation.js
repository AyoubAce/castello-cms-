import { MdRestaurantMenu } from 'react-icons/md';
import { BsImages} from 'react-icons/bs';
import { HiOutlineLogout} from 'react-icons/hi';
import { Link } from 'react-router-dom';
import auth from '../services/auth';

const Navigation = ()=>{
    const handleLogout= ()=>{
       auth.logout();
      window.location.reload();
    }

    return <ul className="navigation-container">
            <div className='menu-album'>
           {/* <Link to="/menu"> <li><MdRestaurantMenu className='icon' /></li></Link>
            <Link to="/galerie"><li><BsImages className='icon' /></li></Link> */}
            <Link to="/menu"> <li>MENU</li></Link>
            <Link to="/galerie"><li>ALBUM</li></Link>
            </div>
            <li onClick={handleLogout} className="logout" >Logout <HiOutlineLogout/></li>
            {/* <p><MdRestaurantMenu className='icon' /> SpeiseKarte</p>
            <p><BsImages className='icon' /> Galerie</p> */}
        </ul>
    
}
export default Navigation