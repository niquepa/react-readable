import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import 'material-components-web/dist/material-components-web.css';
import 'material-design-icons/iconfont/material-icons.css';
import Header from '../Shared/Header';
import PostsList from '../Posts/PostsList';
import PostDetail from '../Posts/PostDetail';
import PostDetailEdit from '../Posts/PostDetailEdit';
import '../../assets/css/App.css';
import { fetchCategories } from '../../actions/index';

class App extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    return (
      <main className="mdc-typography main">
        <Header />

        <Route
          path="/:categoryId"
          exact
          render={({ match }) => (
            <PostsList category={match.params.categoryId} />
        )}
        />

        <Route
          exact
          path="/:categoryId/:postId"
          render={({ match }) => (
            <PostDetail
              postId={match.params.postId}
              category={match.params.categoryId}
            />
        )}
        />

        <Route
          exact
          path="/:categoryId/:postId/edit"
          render={({ match }) => (
            <PostDetailEdit
              postId={match.params.postId}
              category={match.params.categoryId}
            />
        )}
        />

        <Route
          exact
          path="/"
          render={() => (
            <PostsList />
        )}
        />
      </main>
    );
  }
}

const mapStateToProps = ({ global }) => ({
  categories: global.categories,
});

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories()),
});

App.propTypes = {
  fetchCategories: PropTypes.func,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
