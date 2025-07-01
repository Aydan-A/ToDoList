import React from 'react';

const FilteredButtons = ({ filter, setFilter, clearAll }) => {
    return (
        <div className="filter-buttons">
            <div className={`all-tasks ${filter === 'all' ? 'clickedBtn' : ''}`} onClick={() => setFilter('all')}>All</div>
            <div className={`pending-tasks ${filter === 'pending' ? 'clickedBtn' : ''}`} onClick={() => setFilter('pending')}>Pending</div>
            <div className={`completed-tasks ${filter === 'completed' ? 'clickedBtn' : ''}`} onClick={() => setFilter('completed')}>Completed</div>
            <button className="clear-all" onClick={clearAll}>
                Clear All Tasks
            </button>
        </div>
    );
};

export default FilteredButtons;