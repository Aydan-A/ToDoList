const Todo = require('../models/Todo');

const todoController = {
    // Get all todos
    getAllTodos: async (req, res) => {
        try {
            const todos = await Todo.findAll();
            res.json(todos);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching todos', error });
        }
    },

    // Create a new todo
    createTodo: async (req, res) => {
        try {
            const { title } = req.body;
            const todo = await Todo.create({ title });
            res.status(201).json(todo);
        } catch (error) {
            res.status(500).json({ message: 'Error creating todo', error });
        }
    },

    // Update a todo
    updateTodo: async (req, res) => {
        try {
            const { id } = req.params;
            const { title, completed } = req.body;
            const todo = await Todo.findByPk(id);

            if (!todo) {
                return res.status(404).json({ message: 'Todo not found' });
            }

            await todo.update({ title, completed });
            res.json(todo);
        } catch (error) {
            res.status(500).json({ message: 'Error updating todo', error });
        }
    },

    // Delete a todo
    deleteTodo: async (req, res) => {
        try {
            const { id } = req.params;
            const todo = await Todo.findByPk(id);

            if (!todo) {
                return res.status(404).json({ message: 'Todo not found' });
            }

            await todo.destroy();
            res.json({ message: 'Todo deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting todo', error });
        }
    },

    // Delete all todos
    deleteAllTodos: async (req, res) => {
        try {
            await Todo.destroy({ where: {} });
            res.json({ message: 'All todos deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting all todos', error });
        }
    }
};

module.exports = { todoController }; 