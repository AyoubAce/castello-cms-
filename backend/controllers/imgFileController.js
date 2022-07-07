const { ImgFileMessage } = require("../modules/modules");

const getFile = async (req, res) => {
  try {
    const imgFile = await ImgFileMessage.find();
    res.status(200).json(imgFile);
  } catch (error) {
    console.log(error);
  }
};

const setFile = async (req, res) => {
  // console.log("body",req.body.name);
  const file = req.file;
  console.log(req.file);

  const newFile = new ImgFileMessage({
    name: req.body.name,
    selectedFile: req.file.location,
  });
  try {
    await newFile.save();
    res.status(201).json(newFile);
  } catch (error) {
    res.status(400).json({ status: "400", message: error });
  }
};

const deleteFile = async (req, res) => {
  try {
    const file = await ImgFileMessage.findById(req.params.id);
    if (!file) {
      res.status(404).json({ message: "File not found" });
    }
    await ImgFileMessage.findByIdAndDelete(req.params.id);
    res.status("200").json({ id: req.params.id });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { getFile, setFile, deleteFile };
