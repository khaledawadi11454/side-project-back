import userModel from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userModel.find();
    res.status(200).json({ message: allUsers });
  } catch (err) {
    res.json({ error: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    res.status(200).json({ message: user });
  } catch (error) {
    res.json({ error: err.message });
  }
};

// export const registerUser = async (req, res) => {
//   try {
//     const existingEmail = await userModel.findOne({ email: req.body.email });

//     if (existingEmail) {
//       return res.json({ message: "Email has been taken" });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hash(req.body.password, salt);

//     const newUser = new userModel({
//       name: req.body.name,
//       email: req.body.email,
//       password: hash,
//       role: req.body.role,
//     });

//     await newUser.save();
//     res.status(200).json({ message: "User has been created successfully" });
//   } catch (error) {
//     res.json({ error: error.message });
//   }
// };
export const registerUser = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

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
// export const logInUser = async (req, res) => {
//   try {
//     const user = await userModel.findOne({ email: req.body.email });

//     if (!user) return res.status(404).json("User not found");

//     const isPasswordCorrect = await bcrypt.compare(
//       req.body.password,
//       user.password
//     );

//     if (!isPasswordCorrect) return res.json("Incorrect email or password");

//   } catch (error) {
//     res.json({ error: err.message });
//   }
// };
export const logInUser = async (req, res) => {
  // Get user input
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;

  // Validate user input
  if (!(email && password)) {
    res.status(400).send("All input is required");
  }
  // Validate if user exist in our database
  const user = await userModel.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "5h",
      }
    );
    return res.cookie("auth-token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    // user
  }
  return res.status(400).send("Invalid Credentials");
};

export const editUser = async (req, res) => {
  try {
    const salt = bcrypt.genSalt(10, (err) => {
      if (err) throw err;
    });

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
    res.json({ error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.status(200).json("User deleted successfully");
  } catch (error) {
    res.json({ error: err.message });
  }
};
