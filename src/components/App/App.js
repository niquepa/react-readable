import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import Header from '../Shared/Header';
import PostsList from '../Posts/PostsList';
// import Footer from '../Shared/Footer';
import 'material-components-web/dist/material-components-web.css';
import 'material-design-icons/iconfont/material-icons.css';
import '../../assets/css/App.css';
import { fetchCategories, fetchComments, fetchPosts } from '../../actions/index';


class App extends Component {
  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchPosts();
    // this.props.posts.map((post) => {
    //   this.props.fetchComments(post.id);
    // });
  }

  render() {
    return (
      <main className="mdc-typography main">
        <Header />
        <PostsList />
      </main>
    );
  }
}

const mapStateToProps = ({ global }) => ({
  categories: global.categories,
  // posts: global.posts,
});

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories()),
  fetchPosts: () => dispatch(fetchPosts()),
  // fetchComments: () => dispatch(fetchComments()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
