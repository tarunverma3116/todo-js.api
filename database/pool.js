import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const connectDB = () => {
  const pool = mysql
    .createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      // host: "127.0.0.1",
      // user: "root",
      // password: "8102788088",
      // database: "todo_app",
    })
    .promise();
  return pool;
};

export default connectDB;
