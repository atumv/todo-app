import React from 'react';
import './styles.scss';

interface StatusSelectProps {
  status: string;
  handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const StatusSelect: React.FC<StatusSelectProps> = ({
  status,
  handleSelectChange,
}) => (
  <div className="status-select-wrapper">
    <select
      className="status-select"
      name="select"
      value={status}
      onChange={handleSelectChange}
    >
      <option value="status" disabled>
        Статус задачи
      </option>
      <option value="waiting">Ожидает</option>
      <option value="in progress">В процессе</option>
      <option value="completed">Выполнена</option>
    </select>
  </div>
);
