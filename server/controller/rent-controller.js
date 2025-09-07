import Rent from "../schema/rent-schema.js";
import User from "../schema/user-schema.js";

export const addRent = async (req, res) => {
  try {
    const rent = req.body;

    const newRent = new Rent(rent);
    await newRent.save();

    res.status(201).json(newRent);
  } catch (error) {
    console.error("AddRent Error:", error);
    res.status(409).json({ message: error.message });
  }
};

export const getRents = async (req, res) => {
  try {
    const rents = await Rent.find();
    res.status(200).json(rents);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getRent = async (request, response) => {
  try {
    const rent = await Rent.findById(request.params.id);
    response.status(200).json(rent);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const getRentByUser = async (request, response) => {
  try {
    const { userid } = request.params;

    const rent = await Rent.findOne({ userid: Number(userid) });

    if (!rent) {
      return response
        .status(404)
        .json({ message: "Rent not found for this user" });
    }

    response.status(200).json(rent);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

export const updateRent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedRent = await Rent.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedRent) {
      return res.status(404).json({ message: "Rent not found" });
    }

    res.status(200).json(updatedRent);
  } catch (error) {
    console.error("UpdateRent Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const addOrUpdateRent = async (req, res) => {
  try {
    const { userid, bookid, startdate, enddate, issuedays, issued } = req.body;

    const user = await User.findById(userid);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newRent = {
      bookid,
      startdate,
      enddate,
      issuedays,
      issued,
    };

    user.rents.push(newRent);

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error("addOrUpdateRent Error:", error);
    res.status(500).json({ message: error.message });
  }
};
