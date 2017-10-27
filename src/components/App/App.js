import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Shared/Header';
import { withRouter, Route } from 'react-router-dom';
import PostsList from '../Posts/PostsList';
import 'material-components-web/dist/material-components-web.css';
import 'material-design-icons/iconfont/material-icons.css';
import '../../assets/css/App.css';
import { fetchCategories, fetchPosts } from '../../actions/index';

class App extends Component {
  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchPosts();
  }

  render() {
    return (
      <main className="mdc-typography main">
        <Header />
        <Route exact path="/:category" render={() => (
          <PostsList />
        )} />
        <Route exact path="/" render={() => (
          <PostsList />
        )} />
      </main>
    );
  }
}

const mapStateToProps = ({ global }) => ({
  categories: global.categories,
});

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories()),
  fetchPosts: ( category ) => dispatch(fetchPosts(category)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
