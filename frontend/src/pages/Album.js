import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { ContextApi } from "../components/ContextApi";
import SpritesForm from "../components/galerie/SpritesForm";
import { MdDeleteForever } from "react-icons/md";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import authenticate from "../services/auth";
import Footer from "../components/Footer";

const URL = "/api/thumbs";

const Album = () => {
  const { imgChange, setImgChange, auth, user } = useContext(ContextApi);
  const [sprites, setSprites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    //check localStorage for user, if no user exist navigate to login
    if (user) {
      getSprites();
    } else {
      navigate("/");
    }
  }, [imgChange]);

  //fetch images
  const getSprites = async () => {
    await axios
      .get(URL)
      .then((res) => {
        setSprites(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleDelete = async (id) => {
    await axios
      .delete(`${URL}/${id}`, auth())
      .then((res) => {
        console.log("delete res", res);
        setImgChange(res);
      })
      .catch((err) => {
        console.log("delete err", err);
        if (err.response && err.response.status === 401) {
          authenticate.logout();
          navigate("/");
        }
      });
  };

  return (
    <>
      <Navbar />
      <section className="galerie">
        <div className="galerie-container">
          <SpritesForm />

          <h1 style={{ borderTop:"1px solid #474747"}}>Album</h1>
          <div className="images-container">
            {sprites
              ?.slice()
              .reverse()
              .map((item, index) => {
                return (
                  <div key={index} className="image-item">
                    {/* <button onClick={()=>setSpriteId(item._id)}>Delete</button> */}
                    <MdDeleteForever
                      className="delete-icon"
                      onClick={() => {
                        handleDelete(item._id);
                      }}
                    />
                    {/* <h3>{item.name}</h3> */}
                    <img src={item.selectedFile} alt={`${item.name}-img`} />
                  </div>
                );
              })}
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
};
export default Album;
