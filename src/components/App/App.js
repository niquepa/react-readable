import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { Grid } from 'react-mdc-web/lib';
import 'material-components-web/dist/material-components-web.min.css';
import Header from '../Shared/Header';
import PostsList from '../Posts/PostsList'
import Footer from '../Shared/Footer';
import '../../assets/css/App.css';
import { fetchCategories, fetchPosts } from '../../actions/index';


class App extends Component {
  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchPosts();
  }

  render() {
    return (
      <main>
        <Header />
        <PostsList />
      </main>
    );
  }
}

const mapStateToProps = ({ global }) => ({
  categories: global.categories,
});

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories()),
  fetchPosts: () => dispatch(fetchPosts()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
