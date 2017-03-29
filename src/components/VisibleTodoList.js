import { connect } from 'react-redux';
import { toggleTodo, deleteTodo } from '../actions';
import { withRouter } from 'react-router';
import { getVisibleTodos } from '../reducers';
import TodoList from './TodoList';

const mapStateToProps = (state, { match }) => ({
    todos: getVisibleTodos(state, match.params.filter || 'all'),
});

const mapDispatchToProps = (dispatch) => ({
    onTodoClick: (id) => {
      dispatch(toggleTodo(id));
    },
    onTodoDelete: (id) => {
      dispatch(deleteTodo(id));
    },
});

const VisibleTodoList = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList));

export default VisibleTodoList;
