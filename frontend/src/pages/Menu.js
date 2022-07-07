import { useContext, useEffect, useState } from "react"
import MenuForm from "../components/menu/MenuForm"
import MenuItem from "../components/menu/MenuItem"
import { ContextApi } from "../components/ContextApi"
import axios from "axios"
import Navbar from "../components/Navbar"
import { useNavigate } from "react-router-dom"
import Footer from "../components/Footer"


const URL = "/api/menu"
const Menu = () => {
    const [menu, setMenu]= useState([]);
    const options= ["Alle","Vorspeisen","Salate","Wraps","Pizzabrötchen","Pasta","Pizza", "Fisch", "Dessert"]
    const [category,setCategory]= useState(""); 
    const [currentId, setCurrentId] = useState(null)
    const { menuChange, user} = useContext(ContextApi);
   
    const navigate= useNavigate()

    const getMenu = async () => {
  
        await axios.get(URL)
        .then(res => setMenu(res.data))
        .catch(err => console.log("menu-get error", err.response))
      
      }
      useEffect(() => {
          if(user){
            getMenu()
          }
          else {
              navigate("/")
          }
      }, [menuChange])

   
    //filter menu according to category
    const filter = menu?.filter((item)=>{
        if(category === "Alle" || category==="" ){
            return item
        }
        else{
            return item.category === category
        }
        
    }) 
    console.log(category);

    // Dish-Update form style
   const formStyle={
        form: {
           color: "#2A363B"
        },
        inputs: {
            backgroundColor:"#e4e0e0",
            color: "#2A363B"            
        }   
    }

    return <>
    <Navbar />
    <section className="menu">
        <div className="menu-container">
            <MenuForm />
            <h1 className="menu-header" >Speisekarte</h1>
            <div className="menu-filter">
                <span>Nach Kategorie filtern:</span>
                <select  value={category} onChange={(e)=>setCategory(()=>e.target.value)}>
                    {options.map((item, index)=>{
                    return <option  className="option" key={index}>{item}</option>
                    })}
                </select>
            </div>

            <div className='menu-list'>
                {filter?.map((item, index) => {
                    return <div key={item._id}>
                        <MenuItem item={item} setCurrentId={setCurrentId} />
                        {
                        currentId === item._id ? 
                        <MenuForm currentId={currentId} formStyle={formStyle} setCurrentId={setCurrentId} item={item} /> : null
                        }
                    </div>
                })}

            </div>
          
        </div>
    </section>
    <Footer/>
    </>
}
export default Menu