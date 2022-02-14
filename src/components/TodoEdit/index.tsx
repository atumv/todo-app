import React, { useState, useEffect } from 'react';
import { ITodo } from 'shared/interfaces';
import './styles.scss';

import { TextField } from './TextField';
import { StatusSelect } from './StatusSelect';
import { SaveBtn } from './SaveBtn';

interface TodoEditProps {
  todos: ITodo[];
  editTodo: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const TodoEdit: React.FC<TodoEditProps> = ({ todos, editTodo }) => {
  const [title, setTitle] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    const selectedTodo = todos.find((todo) => todo.selected);

    if (!selectedTodo) {
      setTitle('');
      setStatus('');
    } else {
      setTitle(selectedTodo.title);
      setStatus(selectedTodo.status);
    }
  }, [todos]);

  const handleTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setTitle(event.target.value);
  };

  const handleSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setStatus(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    editTodo(event);
  };

  return (
    <div className="todo-edit">
      <div className="todo-edit-container">
        <form className="todo-edit__form edit-form" onSubmit={handleFormSubmit}>
          <TextField title={title} handleTextChange={handleTextChange} />
          <div className="todo-edit__controls">
            <StatusSelect
              status={status}
              handleSelectChange={handleSelectChange}
            />
            <SaveBtn />
          </div>
        </form>
      </div>
    </div>
  );
};
