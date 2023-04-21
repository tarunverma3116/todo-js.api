import connectDB from "../database/pool.js";
const pool = connectDB();

export const createTask = async (req, res) => {
  const { title, description } = req.body;
  const { id } = req.user;
  const [rows] = await pool.query(
    "INSERT INTO tasks (user_id, title, description) VALUES (?, ?, ?)",
    [id, title, description]
  );
  return res.status(201).json({
    success: true,
    message: "Task created successfully",
    data: rows,
  });
};

export const getTasks = async (req, res) => {
  const { id } = req.user;
  const [rows] = await pool.query("SELECT * FROM tasks WHERE user_id = ?", id);
  return res.status(200).json({
    success: true,
    message: "Tasks retrieved successfully",
    data: rows,
  });
};

export const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const [rows] = await pool.query(
        "UPDATE tasks SET title = ?, description = ? WHERE id = ?",
        [title, description, id]
    );
    if(rows.affectedRows === 0) {
        return res.status(404).json({
            success: false,
            message: "Task not found",
        });
    }
    const [task] = await pool.query("SELECT * FROM tasks WHERE id = ?", id);
    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: task,
    });  
}

export const completeTask = async (req, res) => {
    const { id } = req.params;
    const [rows] = await pool.query("UPDATE tasks SET status = 'completed' WHERE id = ?", id);
    if(rows.affectedRows === 0) {
        return res.status(404).json({
            success: false,
            message: "Task not found",
        });
    }
    const [task] = await pool.query("SELECT * FROM tasks WHERE id = ?", id);
    return res.status(200).json({
        success: true,
        message: "Task completed successfully",
        data: task,
    });
}

export const deleteTask = async (req, res) => {
    const { id } = req.params;
    const [rows] = await pool.query("DELETE FROM tasks WHERE id = ?", id);
    return res.status(200).json({
        success: true,
        message: "Task deleted successfully",
        data: rows,
    });
}

