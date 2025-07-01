import React, { useState, useEffect } from 'react';
import ToDoItem from './ToDoItem';
import FilteredButtons from './FilteredButtons';
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

            <FilteredButtons
                filter={filter}
                setFilter={setFilter}
                clearAll={clearAll}
            />

            <div className="task-message">
                <p className="status">
                    {tasks.length === 0
                        ? "You don't have any tasks here"
                        : `You have ${tasks.length} task(s) and you completed ${progress}% out of 100%`}
                </p>
                {filteredTasks.map(task => (
                    <ToDoItem
                        key={task.id}
                        task={task}
                        toggleTask={toggleTask}
                        deleteTask={deleteTask}
                        startEditing={startEditing}
                        saveEdit={saveEdit}
                        setEditingText={setEditingText}
                        toggleDropdown={toggleDropdown}
                        editingTaskId={editingTaskId}
                        editingText={editingText}
                        openDropdownId={openDropdownId}
                    />
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