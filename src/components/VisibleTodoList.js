import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { toggleTodo, deleteTodo } from '../actions';
import { withRouter } from 'react-router';
import { getVisibleTodos } from '../reducers';
import TodoList from './TodoList';
import { fetchTodos } from '../api';

class VisibleTodoList extends Component {
  componentDidMount() {
    fetchTodos(this.props.filter).then(todos =>
      console.log(this.props.filter, todos) // eslint-disable-line no-console
    );
  }
  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      fetchTodos(this.props.filter).then(todos =>
        console.log(this.props.filter, todos) // eslint-disable-line no-console
      );
    }
  }
  render() {
    return <TodoList {...this.props} />;
  }
}

VisibleTodoList.propTypes = {
  filter: PropTypes.string.isRequired,
};

const mapStateToProps = (state, { match }) => {
  const filter = match.params.filter || 'all';
  return {
    todos: getVisibleTodos(state, filter),
    filter,
  };
};

VisibleTodoList = withRouter(connect(
  mapStateToProps,
  {
    onTodoClick: toggleTodo,
    onTodoDelete: deleteTodo,
  }
)(VisibleTodoList));

export default VisibleTodoList;
