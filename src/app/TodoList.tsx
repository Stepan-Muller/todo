"use client";

import { useState } from "react";

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

export default function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState("");

    const addTodo = () => {
        if (newTodo.trim() === "") return;
        setTodos([
            ...todos,
            { id: Date.now(), text: newTodo, completed: false },
        ]);
        setNewTodo("");
    };

    const toggleTodo = (id: number) => {
        setTodos(
            todos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Todo List</h1>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id} className="flex justify-between items-center p-2 border-b">
                        <div className={`flex items-center ${todo.completed ? "line-through" : ""}`}>
                            <input type="checkbox" className="mr-2" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
                            <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
                        </div>
                        <button className="ml-2 p-2 bg-red-500 text-white rounded" onClick={() => deleteTodo(todo.id)}>
                            Odebrat
                        </button>
                    </li>
                ))}
                <li className="flex justify-between items-center p-2 border-b">
                    <input type="text" className="flex-grow p-2 bg-inherit" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} onKeyDown={handleKeyDown} placeholder="Nový úkol" />
                    <button className="ml-2 p-2 bg-blue-500 text-white rounded" onClick={addTodo}>
                        Přidat
                    </button>
                </li>
            </ul>
        </div>
    );
}