import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import Header from '../Shared/Header';
import PostsList from '../Posts/PostsList';
// import Footer from '../Shared/Footer';
import 'material-components-web/dist/material-components-web.css';
import 'material-design-icons/iconfont/material-icons.css';
import '../../assets/css/App.css';
import { fetchCategories, fetchPostAndComments } from '../../actions/index';


class App extends Component {
  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchPostAndComments();
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
});

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories()),
  fetchPostAndComments: () => dispatch(fetchPostAndComments()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
