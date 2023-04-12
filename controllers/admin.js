import adminModel from "../models/admin.js";
import bcrypt from "bcryptjs";

export const getAllAdmins = async (req, res) => {
  try {
    const allAdmins = await adminModel.find();
    res.status(200).json({ message: allAdmins });
  } catch (err) {
    res.json({ error: err.message });
  }
};

export const getAdminById = async (req, res) => {
  try {
    const admin = await adminModel.findById(req.params.id);
    res.status(200).json({ message: admin });
  } catch (error) {
    res.json({ error: err.message });
  }
};

export const registerAdmin = async (req, res) => {
  try {
    const existingEmail = await adminModel.findOne({ email: req.body.email });

    if (existingEmail) {
      return res.json({ message: "Email has been taken" });
    }

    const salt = bcrypt.genSalt(10, (err) => {
      if (err) throw err;
    });

    const hash = bcrypt.hashSync(req.body.password, salt);

    const newAdmin = new adminModel({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    });
    await newAdmin.save();
    res.status(200).json("Admin has been created successfully");
  } catch (error) {
    res.json({ err: error.message });
  }
};

export const logInAdmin = async (req, res) => {
  try {
    const admin = await AdminModel.findOne({ email: req.body.email });

    if (!admin) return res.status(404).json("Admin not found");

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      admin.password
    );

    if (!isPasswordCorrect) return res.json("uncorrect email or password");

    
  } catch (error) {
    res.json({ error: err.message });
  }
};

export const editAdmin = async (req, res) => {
  try {
    const salt = bcrypt.genSalt(10, (err) => {
      if (err) throw err;
    });

    const hash = bcrypt.hashSync(req.body.password, salt);

    const editAdmin = {
      name: req.body.name,
      email: req.body.email,
      password: hash,
    };

    const updateAdmin = await adminModel.findByIdAndUpdate(
      req.params.id,
      { $set: editAdmin },
      { new: true }
    );
    res.status(200).json(updateAdmin);
  } catch (error) {
    res.json({ error: err.message });
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    await adminModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Admin deleted successfully");
  } catch (error) {
    res.json({ error: err.message });
  }
};