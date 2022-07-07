const { MenuMessage } = require("../modules/modules");

const getMenu = async (req, res) => {
  try {
    const menu = await MenuMessage.find();
    res.status(200).json(menu);
  } catch (error) {
    console.log(error);
  }
};

const setMeal = async (req, res) => {
  try {
    const meal = req.body;
    const newMenuMeal = new MenuMessage(meal);
    console.log(meal);

    await newMenuMeal.save();
    res.status(201).json(newMenuMeal);
  } catch (error) {
    res.status(400).json({ status: 400, message: error });
  }
};

const updateMeal = async (req, res) => {
  try {
    const meal = await MenuMessage.findById(req.params.id);
    // do this  if meal.id === req.params.id =>
    if (!meal) {
      res.status(400).json({ message: "meal not found" });
    }
    const updatedMeal = await MenuMessage.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updateMeal);
  } catch (error) {
    console.log(error);
  }
};

const deleteMeal = async (req, res) => {
  try {
    const meal = await MenuMessage.findById(req.params.id);

    if (!meal) {
      res.status(400).json({ message: "meal not found" });
    }
    await MenuMessage.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.body.id });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getMenu, setMeal, updateMeal, deleteMeal };
