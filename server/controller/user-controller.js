import User from "../schema/user-schema.js";
import bcrypt from "bcryptjs";

export const addUser = async (req, res) => {
  try {
    const user = req.body;

    const newUser = new User(user);
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error.message);
    res.status(409).json({ message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUser = async (request, response) => {
  try {
    const user = await User.findById(request.params.id);
    response.status(200).json(user);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const editUser = async (request, response) => {
  let user = request.body;
  const editUser = new User(user);

  try {
    await User.updateOne({ _id: request.params.id }, editUser);
    response.status(201).json(editUser);
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

export const deleteUser = async (request, response) => {
  try {
    await User.deleteOne({ _id: request.params.id });
    response.status(200).json({ message: "User deleted Successfully" });
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

export const changePassword = async (req, res) => {
  const { email, password, newpassword, repassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(409).json({ message: "Current password is incorrect" });

    if (newpassword !== repassword)
      return res.status(409).json({ message: "New passwords do not match" });

    const sameAsOld = await bcrypt.compare(newpassword, user.password);
    if (sameAsOld)
      return res
        .status(409)
        .json({ message: "New password cannot be same as current password" });

    const hashedPassword = await bcrypt.hash(newpassword, 10);

    // Only update the password field
    await User.updateOne({ email }, { $set: { password: hashedPassword } });

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ message: "Error updating password", error });
  }
};

export const returnBook = async (req, res) => {
  try {
    const { userId } = req.params;
    const { bookid } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const rent = user.rents.find(
      (r) => r.bookid.toString() === bookid.toString()
    );

    console.log(rent);
    if (!rent) return res.status(404).json({ message: "Rent not found" });

    rent.issued = "Visszaadva";
    user.markModified("rents");
    await user.save();

    res.status(200).json({ message: "Book returned successfully", user });
  } catch (error) {
    console.error("ReturnBook Error:", error);
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
