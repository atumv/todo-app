import React from 'react';
import { Input } from './Input';
import { AddBtn } from './AddBtn';
import './styles.scss';

interface FormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const Form: React.FC<FormProps> = ({ onSubmit }) => (
  <form className="form" onSubmit={onSubmit}>
    <div className="form-container">
      <Input />
      <AddBtn />
    </div>
  </form>
);
