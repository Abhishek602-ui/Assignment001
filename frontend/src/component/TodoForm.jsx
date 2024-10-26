import React, { useState } from 'react';

const TodoForm = ({ onSubmit, initialData, isEditing, onCancel }) => {
    const [formData, setFormData] = useState(initialData || { title: '', desc: '', status: 'pending' });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);  
        setFormData({ title: '', desc: '', status: 'pending' });
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <h4>{isEditing ? 'Edit Todo' : 'Create Todo'}</h4>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input
                    type="text"
                    id="title"
                    className="form-control"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="desc" className="form-label">Description</label>
                <textarea
                    id="desc"
                    className="form-control"
                    value={formData.desc}
                    onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="status" className="form-label">Status</label>
                <select
                    id="status"
                    className="form-control"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
            <button type="submit" className="btn btn-success">{isEditing ? 'Update Todo' : 'Create Todo'}</button>
            {isEditing && (
                <button type="button" className="btn btn-secondary ms-2" onClick={onCancel}>Cancel</button>
            )}
        </form>
    );
};

export default TodoForm;