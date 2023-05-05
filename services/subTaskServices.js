import connectDB from "../database/pool.js";
const pool = connectDB();

export const createSubTask = async (req, res) => {
  const { title } = req.body;
  const { id } = req.params;
  const [rows] = await pool.query(
    "INSERT INTO subtasks (task_id, title, description) VALUES (?, ?, ?)",
    [id, title, `subtask`]
  );
  return res.status(201).json({
    success: true,
    message: "SubTask created successfully",
    data: rows,
  });
};

export const getSubTasks = async (req, res) => {
  const { id } = req.params;
  const [rows] = await pool.query(
    "SELECT * FROM subtasks WHERE task_id = ?",
    id
  );
  return res.status(200).json({
    success: true,
    message: "SubTasks retrieved successfully",
    data: rows,
  });
};

export const getSubTask = async (req, res) => {
  const { id } = req.params;
  const [rows] = await pool.query("SELECT * FROM subtasks WHERE id = ?", id);

  if (rows.length === 0) {
    return res.status(404).json({
      success: false,
      message: "SubTask not found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "SubTask retrieved successfully",
    data: rows[0],
  });
};

export const completeSubTask = async (req, res) => {
  const { id } = req.params;
  const [rows] = await pool.query(
    "UPDATE subtasks SET status = 'completed' WHERE id = ?",
    id
  );
  if (rows.affectedRows === 0) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }
  const [task] = await pool.query("SELECT * FROM subtasks WHERE id = ?", id);
  return res.status(200).json({
    success: true,
    message: "SubTask completed successfully",
    data: task,
  });
};

export const deleteSubTask = async (req, res) => {
  const { id } = req.params;
  const [rows] = await pool.query("DELETE FROM subtasks WHERE id = ?", id);
  return res.status(200).json({
    success: true,
    message: "SubTask deleted successfully",
    data: rows,
  });
};
