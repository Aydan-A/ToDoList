import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TodoList.css';

const API_URL = 'http://localhost:5001/api/todos';

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [filter, setFilter] = useState('all');
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editingText, setEditingText] = useState('');
    const [openDropdownId, setOpenDropdownId] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.threedot')) {
                setOpenDropdownId(null);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get(API_URL);
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const addTask = async () => {
        if (inputValue.trim()) {
            try {
                const response = await axios.post(API_URL, { title: inputValue });
                setTasks([...tasks, response.data]);
                setInputValue('');
            } catch (error) {
                console.error('Error adding task:', error);
            }
        }
    };

    const toggleTask = async (id) => {
        try {
            const task = tasks.find(t => t.id === id);
            if (task) {
                const response = await axios.put(`${API_URL}/${id}`, {
                    ...task,
                    completed: !task.completed
                });
                setTasks(tasks.map(t => t.id === id ? response.data : t));
            }
        } catch (error) {
            console.error('Error toggling task:', error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setTasks(tasks.filter(task => task.id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const startEditing = (task) => {
        setEditingTaskId(task.id);
        setEditingText(task.title);
    };

    const saveEdit = async (id) => {
        if (editingText.trim()) {
            try {
                const task = tasks.find(t => t.id === id);
                if (task) {
                    const response = await axios.put(`${API_URL}/${id}`, {
                        ...task,
                        title: editingText
                    });
                    setTasks(tasks.map(t => t.id === id ? response.data : t));
                    setEditingTaskId(null);
                }
            } catch (error) {
                console.error('Error updating task:', error);
            }
        }
    };

    const clearAll = async () => {
        if (tasks.length > 0) {
            try {
                await axios.delete(API_URL);
                setTasks([]);
            } catch (error) {
                console.error('Error clearing tasks:', error);
            }
        }
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'all') return true;
        if (filter === 'completed') return task.completed;
        if (filter === 'pending') return !task.completed;
        return true;
    });

    const progress = tasks.length > 0
        ? Math.floor((tasks.filter(task => task.completed).length / tasks.length) * 100)
        : 0;

    const toggleDropdown = (taskId, event) => {
        event.stopPropagation();
        setOpenDropdownId(openDropdownId === taskId ? null : taskId);
    };

    return (
        <div className="ToDo-container">
            <div className="inputData">
                <input
                    type="text"
                    placeholder="Add new task..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addTask()}
                    className='input-field'
                />
                <button onClick={addTask}>Add</button>
            </div>

            <div className="filter-buttons">
                <div
                    className={`all-tasks ${filter === 'all' ? 'clickedBtn' : ''}`}
                    onClick={() => setFilter('all')}
                >
                    All
                </div>
                <div
                    className={`pending-tasks ${filter === 'pending' ? 'clickedBtn' : ''}`}
                    onClick={() => setFilter('pending')}
                >
                    Pending
                </div>
                <div
                    className={`completed-tasks ${filter === 'completed' ? 'clickedBtn' : ''}`}
                    onClick={() => setFilter('completed')}
                >
                    Completed
                </div>
                <button className="clear-all" onClick={clearAll}>
                    Clear All Tasks
                </button>
            </div>

            <div className="task-message">
                <p className="status">
                    {tasks.length === 0
                        ? "You don't have any tasks here"
                        : `You have ${tasks.length} task(s) and you completed ${progress}% out of 100%`}
                </p>
                {filteredTasks.map(task => (
                    <div key={task.id} className="tasks">
                        <div className="checkboxtasks">
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleTask(task.id)}
                            />
                            {editingTaskId === task.id ? (
                                <input
                                    type="text"
                                    className="edit-input"
                                    value={editingText}
                                    onChange={(e) => setEditingText(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && saveEdit(task.id)}
                                    onBlur={() => saveEdit(task.id)}
                                    autoFocus
                                />
                            ) : (
                                <label style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                                    {task.title}
                                </label>
                            )}
                        </div>
                        <div className="threedot" onClick={(e) => toggleDropdown(task.id, e)}>
                            ⋮
                            <div className={`dropdown-menu ${openDropdownId === task.id ? 'show' : ''}`}>
                                <div onClick={(e) => { toggleDropdown(task.id, e); startEditing(task); }}>Edit</div>
                                <div onClick={(e) => { toggleDropdown(task.id, e); deleteTask(task.id); }}>Delete</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="chart">
                <div
                    className="progress-bar"
                    style={{ width: `${progress}%` }}
                >
                    {progress}%
                </div>
            </div>
        </div>
    );
};

export default TodoList; 