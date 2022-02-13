import React from 'react';
import { ITodo } from 'shared/interfaces';
import './styles.scss';

interface TodoItemProps {
  todo: ITodo;
  index: number;
  selectTodo: (id: number) => void;
  removeTodo: (id: number) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  index,
  selectTodo,
  removeTodo,
}) => (
  <label>
    <li className="todo-list__item todo-item">
      <div className="todo-item__checkbox-wrap">
        <input
          className="todo-item__checkbox"
          type="checkbox"
          checked={todo.selected || false}
          onChange={() => selectTodo(todo.id)}
        />
        <span className="todo-item__number">{index + 1}</span>
        <span
          className={
            (todo.status === 'waiting' &&
              'todo-item__title todo-item__title--grey') ||
            (todo.status === 'in progress' &&
              'todo-item__title todo-item__title--blue') ||
            (todo.status === 'completed' &&
              'todo-item__title todo-item__title--green') ||
            'todo-item__title'
          }
        >
          {todo.title}
        </span>
      </div>
      <button
        className="todo-item__remove-btn remove-btn"
        onClick={() => removeTodo(todo.id)}
      >
        &times;
      </button>
    </li>
  </label>
);
