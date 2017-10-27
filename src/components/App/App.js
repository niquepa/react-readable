import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Shared/Header';
import { withRouter, Route } from 'react-router-dom';
import PostsList from '../Posts/PostsList';
import PostDetail from '../Posts/PostDetail';
import 'material-components-web/dist/material-components-web.css';
import 'material-design-icons/iconfont/material-icons.css';
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
          path="/redux"
          exact
          render={() => (
            <PostsList />
        )}
        />
        <Route
          path="/react"
          exact
          render={() => (
            <PostsList />
        )}
        />
        <Route
          path="/udacity"
          exact
          render={() => (
            <PostsList />
        )}
        />

        <Route exact path="/:categoryId/:postId" render={({match}) => (
            <PostDetail
              postId={match.params.postId}
              category={match.params.categoryId}
            />
        )}/>

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
