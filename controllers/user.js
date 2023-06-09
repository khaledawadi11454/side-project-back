import userModel from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userModel.find();
    res.status(200).json({ message: allUsers });
  } catch (error) {
    res.json({ error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    res.status(200).json({ message: user });
  } catch (error) {
    res.json({ error: error.message });
  }
};

export const registerUser = async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const salt = bcrypt.genSaltSync(10);

  const hash = bcrypt.hashSync(password, salt);
  try {
    const user = new userModel({
      name,
      email,
      role,
      password:hash,
    });
    await user.save();

    res.status(201).json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      const errorMessage = "You are already Signup";
      return next(new BadRequestError(errorMessage));
    }
    next(error);
  }
};

export const editUser = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);

    const hash = bcrypt.hashSync(req.body.password, salt);

    const editUser = {
      name: req.body.name,
      email: req.body.email,
      password: hash,
      role: req.body.role,
    };

    const updateUser = await userModel.findByIdAndUpdate(
      req.params.id,
      { $set: editUser },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (error) {
    res.json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.status(200).json("User deleted successfully");
  } catch (error) {
    res.json({ error: error.message });
  }
};

export const logInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).send("Email is Required");
    }
    if (!password) {
      return res.status(400).json("Password is Required");
    }

    const user = await userModel.findOne({ email });
    if(!user) {
      return res.status(404).json('User Not Found')
    }
    if(await bcrypt.compare(password,user.password)){
      return res.status(401).json({success:false,message:"wrong password"})
    }
    const token=jwt.sign(
      {_id:user._id,email:user.email},
      process.env.JWT_SECRET_KEY,
    )

    res.status(200).json({message: 'Logged In Successfully', data:user,token})

  } catch (error) {
   res.status(500).send({success:false,message:"error loggin in"})
  }
  // console.log('I am in here')
};