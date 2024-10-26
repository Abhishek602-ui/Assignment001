import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoForm from './TodoForm';  
import Pagination from './Pagination';  
import CustomNavbar from './navbar' 

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingTodo, setEditingTodo] = useState(null);  
    const [showForm, setShowForm] = useState(false);  
    const [filter, setFilter] = useState('all'); 
    const todosPerPage = 5;

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await axios.get('http://localhost:4000/'); 
                setTodos(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch todos');
                setLoading(false);
            }
        };

        fetchTodos();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/tasks/${id}`); 
            setTodos(todos.filter(todo => todo._id !== id));  
        } catch (err) {
            setError('Failed to delete todo');
        }
    };

    const handleEdit = (todo) => {
        setEditingTodo(todo);  
        setShowForm(true); 
    };

    const handleUpdate = async (formData) => {
        try {
            const updatedData = {
                title: formData.title,
                desc: formData.desc,
                status: formData.status  
            };
            const response = await axios.put(`http://localhost:4000/tasks/${editingTodo._id}`, updatedData); // Update the todo
            setTodos(todos.map(todo => (todo._id === editingTodo._id ? response.data : todo))); // Update the state
            setEditingTodo(null);  
            setShowForm(false);  
        } catch (err) {
            setError('Failed to update todo');
        }
    };

    const handleCreate = async (formData) => {
        try {
            const newTodo = {
                title: formData.title,
                desc: formData.desc,
                status: formData.status
            };
            const response = await axios.post('http://localhost:4000/tasks', newTodo); // Create the todo
            setTodos([...todos , response.data]); 
            setShowForm(false);
        } catch (err) {
            setError('Failed to create todo');
        }
    };

    const handleCancel = () => {
        setEditingTodo(null); 
        setShowForm(false); 
    };

    
    const filteredTodos = todos.filter(todo => {
        if (filter === 'completed') return todo.status === 'completed';
        if (filter === 'pending') return todo.status === 'pending';
        return true; 
    });

    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) return <div className="text-center loading">Loading...</div>;
    if (error) return <div className="text-danger text-center">{error}</div>;

    return (
        <div>
            <CustomNavbar setFilter={setFilter} />
            <div className="container mt-5">
                <h1 className="text-center mb-4 title">Todo List</h1>
                <button className="btn btn-primary mb-4" onClick={() => setShowForm(true)}>Create Todo</button>

                {showForm && (
                    <TodoForm
                        onSubmit={editingTodo ? handleUpdate : handleCreate}
                        initialData={editingTodo}
                        isEditing={!!editingTodo}
                        onCancel={handleCancel}
                    />
                )}

                <ul className="list-group">
                    {currentTodos.map(todo => (
                        <li key={todo._id} className="list-group-item mb-3 todo-item">
                            <h5 className="todo-title">{todo.title}</h5>
                            <p className="todo-description">{todo.desc}</p>
                            <p>Status: <span className={`badge ${todo.status === 'completed' ? 'bg-success' : 'bg-warning'}`}>{todo.status.charAt(0).toUpperCase() + todo.status.slice(1)}</span></p>
                            
                            <div className="button-group">
                                <button className="btn btn-primary me-2" onClick={() => handleEdit(todo)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(todo._id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
                <Pagination
                    todosPerPage={todosPerPage}
                    totalTodos={filteredTodos.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
            </div>
        </div>
    );
};

export default TodoList;