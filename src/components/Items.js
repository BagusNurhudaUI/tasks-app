import React from "react";

export default function Items ({item, index}){

    return (
        <div className="todo-list">
        <li>{item.todo}</li>
        </div>
    )
}