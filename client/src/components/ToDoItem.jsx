import React from 'react';

const ToDoItem = ({ task,
    editingTaskId,
    editingText,
    openDropdownId,
    toggleTask,
    startEditing,
    saveEdit,
    setEditingText,
    toggleDropdown,
    deleteTask
}) => {
    return (
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
    );
};

export default ToDoItem;