import { connect } from 'react-redux';
import { toggleTodo, deleteTodo } from '../actions';
import { withRouter } from 'react-router';
import { getVisibleTodos } from '../reducers';
import TodoList from './TodoList';

const mapStateToProps = (state, { match }) => ({
    todos: getVisibleTodos(state, match.params.filter || 'all'),
});

const VisibleTodoList = withRouter(connect(
  mapStateToProps,
  {
    onTodoClick: toggleTodo,
    onTodoDelete: deleteTodo,
  }
)(TodoList));

export default VisibleTodoList;
