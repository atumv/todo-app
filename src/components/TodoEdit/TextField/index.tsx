import React from 'react';
import './styles.scss';

interface TextFieldProps {
  title: string;
  handleTextChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextField: React.FC<TextFieldProps> = ({
  title,
  handleTextChange,
}) => (
  <textarea
    className="todo-edit__text-field"
    name="textArea"
    value={title}
    onChange={handleTextChange}
  ></textarea>
);
