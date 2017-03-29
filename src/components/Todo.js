import React, { PropTypes } from 'react';

const Todo = ({ onClick, onDeleteClick, completed, text }) => (
  <span style={{ display: 'inline' }}>
    <li
      onClick={onClick}
      style={{
        textDecoration: completed ? 'line-through' : 'none',
      }}
    >
      {text}
    </li>
    <button
      onClick={onDeleteClick}
    > Delete </button>
  </span>
);

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};

export default Todo;
