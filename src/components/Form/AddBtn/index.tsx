import React from 'react';
import './styles.scss';

export const AddBtn: React.FC = () => (
  <button className="form__add-btn add-btn" type="submit">
    <span className="add-btn__plus">&times;</span> Добавить
  </button>
);
