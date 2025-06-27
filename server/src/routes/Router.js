const express = require('express');
const { todoController } = require('../controllers/todoController');

const router = express.Router();

// Get all todos
router.get('/todos', todoController.getAllTodos);

// Create a new todo
router.post('/todos', todoController.createTodo);

// Update a todo
router.put('/todos/:id', todoController.updateTodo);

// Delete a todo
router.delete('/todos/:id', todoController.deleteTodo);

// Delete all todos
router.delete('/todos', todoController.deleteAllTodos);

module.exports = router; 