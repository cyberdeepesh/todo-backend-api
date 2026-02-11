const supabase = require("../config/supabaseClient");

// GET all todos
exports.getTodos = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

// GET single todo
exports.getTodoById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

// CREATE todo
exports.createTodo = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const { data, error } = await supabase
      .from("todos")
      .insert([{ title, description }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

// UPDATE todo
exports.updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("todos")
      .update(req.body)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

// DELETE todo
exports.deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("todos")
      .delete()
      .eq("id", id);

    if (error) throw error;

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (err) {
    next(err);
  }
};
