import { v4 } from 'node-uuid';
import * as api from '../api';

const receiveTodos = (filter, response) => ({
  type: 'RECEIVE_TODOS',
  filter,
  response,
});

export const fetchTodos = filter =>
  api.fetchTodos(filter).then(response =>
    receiveTodos(filter, response)
  );

export const addTodo = text => ({
  type: 'ADD_TODO',
  id: v4(),
  text,
});

export const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id,
});

export const deleteTodo = id => ({
  type: 'DELETE_TODO',
  id,
});
