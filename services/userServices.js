import connectDB from "../database/pool.js";
import jwt from "jsonwebtoken";
const pool = connectDB();

export const getUsers = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM users");
  return res.status(200).json({
    success: true,
    message: "Users retrieved successfully",
    data: rows,
  });
};

export const getUser = async (req, res) => {
  const { id } = req.user;
  const [user] = await pool.query("SELECT * FROM users WHERE id = ?", id);
  return res.status(200).json({
    success: true,
    message: "User retrieved successfully",
    data: user,
  });
};

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const [rows] = await pool.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, password]
  );
  return res.status(201).json({
    success: true,
    message: "User created successfully",
    data: rows,
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const [user] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  if (user.length === 0) {
    return res.status(401).json({
      success: false,
      message: "User Not Found",
    });
  }
  if (user[0].password !== password) {
    return res.status(401).json({
      success: false,
      message: "Invalid Password",
    });
  }
  const payload = { id: user[0].id };
  const token = jwt.sign(payload, "access_token", { expiresIn: "1h" });
  return res.status(200).json({
    success: true,
    message: "User logged in successfully",
    data: {
        "accessToken": token,
    },
  });
};


