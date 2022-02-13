import React from 'react';
import './styles.scss';

export const NoTasksMsg: React.FC = () => (
  <div className="no-tasks">
    <p className="no-tasks__text">Список задач пуст.</p>
    <p className="no-tasks__text">Добавьте задачу чтобы начать работу.</p>
  </div>
);
