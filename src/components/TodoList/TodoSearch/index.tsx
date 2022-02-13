import React from 'react';
import { ReactComponent as SearchIcon } from 'assets/svg/Search.svg';
import './styles.scss';

interface TodoSearchProps {
  findTodo: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TodoSearch: React.FC<TodoSearchProps> = ({ findTodo }) => (
  <div className="search">
    <input className="search__input" type="search" onChange={findTodo} />
    <SearchIcon className="search__icon" />
  </div>
);
