import React, { useState, useEffect } from 'react';

import { ITodo } from 'shared/interfaces';
import { API_URL } from 'shared/constants/api';
import { todoStatuses } from 'shared/constants/todoStatuses';
import './styles.scss';

import { Header } from 'components/Header';
import { Form } from 'components/Form';
import { TodoList } from 'components/TodoList';
import { TodoEdit } from 'components/TodoEdit';

const App: React.FC = () => {
  // Создадим переменные состояния
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Для демонстрационных целей опишем функцию,
  // которая будет загружать заметки со стороннего API
  // и сохранять их в стейт todos со случайными статусами
  const fetchTodos = async (url: string) => {
    try {
      const response = await fetch(url);
      const todos = await response.json();

      const todosWithRandomStatuses = todos.map((todo: ITodo) => {
        const randomIndex = Math.floor(Math.random() * todoStatuses.length);
        todo.status = todoStatuses[randomIndex];
        return todo;
      });

      setTodos(todosWithRandomStatuses);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  // Загружаем заметки при монтировании компонента
  useEffect(() => {
    setLoading(true);
    setTimeout(() => fetchTodos(API_URL), 1000);
  }, []);

  // Далее определим функции для манипуляции заметками

  // Функция, позволяющая добавить новую заметку в стейт
  const addTodo = (title: string): void => {
    const newTodo = {
      id: Date.now(),
      title,
      completed: false,
      selected: false,
      status: 'waiting',
    };
    setTodos(todos.concat(newTodo));
  };

  // Функция, переключающая состояние заметки на «выбрана»
  const selectTodo = (id: number): void => {
    const todosWithOneSelected = todos.map((todo) => {
      todo.id === id ? (todo.selected = true) : (todo.selected = false);
      return todo;
    });
    setTodos(todosWithOneSelected);
  };

  // Функция, выполняющая поиск заметки
  const findTodo = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = event.target.value;
    const regex = new RegExp(`${inputValue}`);

    const todosWithNoOneSelected = todos.map((todo) => {
      if (todo.selected) todo.selected = false;
      return todo;
    });

    setTodos(todosWithNoOneSelected);
    const newTodos = [...todos];

    for (let i = 0; i < newTodos.length; i++) {
      if (!inputValue) {
        setTodos(todosWithNoOneSelected);
      } else {
        if (newTodos[i].title.match(regex)) {
          newTodos[i].selected = true;
          setTodos(newTodos);
          break;
        } else {
          setTodos(todosWithNoOneSelected);
        }
      }
    }
  };

  // Функция, позволяющая отредактировать заметку
  const editTodo = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const textArea = event.currentTarget.textArea;
    const select = event.currentTarget.select;

    const updatedTodos = todos.map((todo) => {
      if (todo.selected) {
        todo.title = textArea.value;
        todo.status = select.value;
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  // Функция, удаляющая заметку из стейта
  const removeTodo = (id: number): void => {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
  };

  // Обработчик, добавляющий новую заметку в стейт при отправке формы
  const addNewTodo = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const input = event.currentTarget.elements[0] as HTMLInputElement;
    const inputValue = input.value.trim();
    if (inputValue) addTodo(inputValue);
    input.value = '';
  };

  return (
    <div className="app">
      <Header />
      <Form onSubmit={addNewTodo} />
      <main className="main">
        <TodoList
          loading={loading}
          todos={todos}
          findTodo={findTodo}
          selectTodo={selectTodo}
          removeTodo={removeTodo}
        />
        <TodoEdit todos={todos} editTodo={editTodo} />
      </main>
    </div>
  );
};

export default App;
