import React, { useState } from 'react';
import ToDoForm from './ToDoForm';
import {v4 as uuid} from "uuid";
import EditTodoForm from './EditTodoForm';
import Todo from './Todo';

function ToDoWrapper() {
    const[todos, setTodos] = useState([]);

    // add todo
    const addTodo = (todo) => {
        setTodos([
            ...todos, {id:uuid(), task:todo, completed: false, isEditing:false}
        ]);
    }

    // Delete Todo
    const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

    // Toggle complete todo

    const toggleComplete = (id) => {
        setTodos(
            todos.map((todo) => todo.id === id ? {...todo, completed:!todo.completed} : todo)
        )
    }

    //Edit Todo
    const editTodo = (id) => {
        setTodos(
            todos.map((todo) => todo.id === id ? {...todo, isEditing:!todo.isEditing} : todo)
        )
    }
    
    //Edit task todo
    const editTask = (task, id) => {
        setTodos(
            todos.map((todo) => todo.id === id ? {...todo, task,
                isEditing:!todo.isEditing} : todo)
        )
    }

    console.log("todos", todos)
    return (
        <div className='ToDoWrapper'>
            <h1>Web Development Tasks !!!</h1>
            <ToDoForm addToDo={addTodo}/>

            {/* Display To Do */}
            {todos.map((todo) => todo.isEditing ? (
                <EditTodoForm editTodo={editTask} task={todo}/>
            ) : (
                <Todo 
                key={todo.id}
                task={todo}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
                toggleComplete={toggleComplete} 
                />
            )
        )}
        </div>
    );
}

export default ToDoWrapper;