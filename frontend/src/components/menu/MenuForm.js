import { useState, useContext, useEffect } from "react";
import { ContextApi } from "../ContextApi";
import { MdAddBox } from "react-icons/md";
import { MdCheckCircle } from "react-icons/md";
import axios from "axios";
import authenticate from "../../services/auth";
import { useNavigate } from "react-router-dom";
const URL = "/api/menu";


const MenuForm = ({ currentId, setCurrentId, item, formStyle }) => {
  const {setMenuChange, auth} = useContext(ContextApi);
  
  const [meal, setMeal] = useState(
    item
      ? item
      : {
          category: "vorspeisen",
          name: "",
          description: "",
          price: "",
          active: true,
        }
  );
  const navigate= useNavigate()
  useEffect(() => {}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    if (currentId) {
      //update a dish values
      await axios
        .put(`${URL}/${currentId}`, meal, auth())
        .then((res) => {
          console.log("meal updated successfully");
          setMenuChange(res)
        })
        .catch((err) => {
          console.log("meal-update error", err.response)
          //if token is expired logout! then navigate to login page 
          if(err.response && err.response.status===401){
            authenticate.logout();
             navigate("/")
          }
        });

      
    } else if (meal.name && meal.price) {
      //add a new dish to the menu

      await axios
        .post(URL, meal, auth())
        .then((res) => {
          console.log("meal is added successfully!", res);
          setMenuChange(res)
        })
        .catch((err) => {
          console.log("menu-post error", err.response)
          //if token is expired logout! then navigate to login page 
          if(err.response && err.response.status===401){
            authenticate.logout();
             navigate("/")
          }
        });
    }
    //clear Form and Current ID
    clear();
    setCurrentId(null);
} catch (error) {
        console.log("new/update meal err", error);
}
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setMeal((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const clear = () => {
    setMeal({
      category: "vorspeisen",
      name: "",
      description: "",
      price: "",
      active: true,
    });
  };
  console.log("meal", meal);
  return (
    <div className="menu-form">
      {currentId ? null : <h1>Speisekartenverwaltung</h1> }
      <form onSubmit={handleSubmit} style={formStyle?.form}>
        <div>
          <select
            onChange={handleChange}
            value={meal.category}
            style={formStyle?.inputs}
            name="category"
          >
            {/* <option>vorspeisen</option> */}
            <option>Vorspeisen</option>
            <option>Salate</option>
            <option>Wraps</option>
            <option>Pizzabrötchen</option>
            <option>Pasta</option>
            <option>Pizza</option>
            <option>Fisch</option>
            <option>Dessert</option>
          </select>
        </div>
        <div>
          <input
            className="input"
            type="text"
            name="name"
            placeholder="Gerichtname"
            value={meal.name}
            style={formStyle?.inputs}
            onChange={handleChange}
          />
        </div>
        <div>
          <textarea
            className="input"
            type="text"
            name="description"
            rows="3"
            placeholder="Beschreibung"
            value={meal.description}
            style={formStyle?.inputs}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            className="input"
            type="number"
            name="price"
            min="1"
            max="99"
            placeholder="Preis €"
            value={meal.price}
            style={formStyle?.inputs}
            step="any"
            onChange={handleChange}
          />
        </div>
        {/* <input type='checkbox' onChange={()=>{
            setMeal((prev)=>{return {...prev,active:!meal.active}})
        }} /> */}
        <button type="submit">
          {currentId ? (
            <>
              <MdCheckCircle className="add-update-icon" /> Neufassung{" "}
            </>
          ) : (
            <>
              <MdAddBox className="add-update-icon" /> Gericht hinzufügen
            </>
          )}
        </button>
      </form>
    </div>
  );
};
export default MenuForm;
