import React from 'react';
import { ITodo } from 'shared/interfaces';
import { TodoSearch } from './TodoSearch';
import { TodoItem } from './TodoItem';
import { Spinner } from './Spinner';
import { NoTasksMsg } from './NoTasksMsg';
import './styles.scss';

interface TodoListProps {
  todos: ITodo[];
  loading: boolean;
  findTodo: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectTodo: (id: number) => void;
  removeTodo: (id: number) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  loading,
  findTodo,
  selectTodo,
  removeTodo,
}) => (
  <div className="todo-list-container">
    <TodoSearch findTodo={findTodo} />
    <ul className="todo-list">
      {loading && <Spinner />}
      {!loading &&
        todos.length > 0 &&
        todos.map((todo: ITodo, index: number) => (
          <TodoItem
            todo={todo}
            key={todo.id}
            index={index}
            selectTodo={selectTodo}
            removeTodo={removeTodo}
          />
        ))}
      {!loading && !todos.length && <NoTasksMsg />}
    </ul>
  </div>
);
