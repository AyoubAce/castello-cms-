import { useContext } from "react"
import { ContextApi } from "../ContextApi"
import authenticate from "../../services/auth";
import { AiOutlineEdit } from 'react-icons/ai';
import { RiDeleteBin2Line } from 'react-icons/ri';
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { auth } from "../services/auth";

const URL = "/api/menu"
const MenuItem = ({ item, setCurrentId }) => {
  const {setMenuChange, auth} = useContext(ContextApi);
  const navigate= useNavigate()

    // formats a Number to price format ex: 10,90 €
    const formatter = new Intl.NumberFormat("de-DE", {
        style:"currency",
        currency: "EUR"
    })
    const handleDelete =async ()=>{
        await axios.delete(`${URL}/${item._id}`, auth())
        .then(res => {
          console.log("deleted successfully",res);
          setMenuChange(res)
        })
        .catch(err => {
            console.log("menu get error", err.response)
            authenticate.logout();
            navigate("/")
        })
    
    }

    return <div className="menu-item" >
        <div>
            <p className="title">{item.name}</p>
            <p className="description">{item.description}</p>
        </div>
        <div>
            <p className="price">{formatter.format(item.price)} </p>
            <AiOutlineEdit className="edit-icon icon" onClick={() => setCurrentId(item._id)} />
            <RiDeleteBin2Line className="delete-icon icon" onClick={handleDelete} />

        </div>
    </div>
}

export default MenuItem