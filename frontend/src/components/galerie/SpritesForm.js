import { useState, useContext } from "react";
import axios from "axios";
import { ContextApi } from "../ContextApi";
import { MdAddAPhoto } from "react-icons/md";
import { BsFillCloudUploadFill } from "react-icons/bs";
import authenticate from "../../services/auth";
import { useNavigate } from "react-router-dom";

const URL = "/api/thumbs";

const SpritesForm = () => {
  const [fileName, setFileName] = useState("");
  const [image, setImage] = useState();
  const [imageName, setImageName] = useState("");
  const [isLoading, setIsLoading]= useState(false)
  const { setImgChange, auth } = useContext(ContextApi);
  //   const base64 = await FileSystem.readAsStringAsync(photo.uri, { encoding: 'base64' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (image) {
      const formData = new FormData();
      formData.append("name", imageName);
      formData.append("image", image);
      //show spinner
      setIsLoading(true)
      await axios.post(URL, formData, auth())
        .then((res) => {
          setImgChange(res.data);
        })
        .catch((err) => {
          console.log("post ERROR:", err.response);
          if (err.response && err.response.status === 401) {
            
            authenticate.logout();
            navigate("/");
          }
        });
        //close spinner
      setIsLoading(false)
      setFileName("");
      setImage();
      console.log("DONE!!!!!!!");
    }
  };

  const handleFile = (e) => {
    setFileName(e.target.files[0].name);
    console.log("file", e.target.files[0]);
    setImage(e.target.files[0]);
    // let reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onload = (e) => {
    //   setImage({ ...image, selectedFile: e.target.result });
    // };
  };

  //ALBUM photos FORM
  return (
    <div className="form-container">
      <h1>Bildverwaltung</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <input
            type="text"
            name="name"
            value={imageName}
            onChange={(e) => {
              setImageName(e.target.value);
            }}
            placeholder="Enter image name"
          />
        </div>
        <div>
          <button className="inputfile">
            <MdAddAPhoto className="select-icon" /> Wähle ein Foto
            <span>{fileName}</span>
          </button>
          <input
            type="file"
            name="selectedFile"
            onChange={handleFile}
            accept="image/x-png,image/gif,image/jpeg"
            placeholder="add me"
          />
        </div>
        <button type="submit" className={isLoading ? "submit btn-loading":"submit "}>
          {isLoading ? "": <span><BsFillCloudUploadFill className="select-icon" />
          Hochladen</span>}
        </button>
      </form>
    </div>
  );
};
export default SpritesForm;
