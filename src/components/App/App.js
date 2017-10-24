import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Shared/Header';
import { withRouter, Route } from 'react-router-dom';
import PostsList from '../Posts/PostsList';
import 'material-components-web/dist/material-components-web.css';
import 'material-design-icons/iconfont/material-icons.css';
import '../../assets/css/App.css';
import { fetchCategories, fetchPostAndComments } from '../../actions/index';


const routes = [
  { path: '/',
    exact: true,
    sidebar: () => <div>home!</div>,
    main: () => <h2>Home</h2>
  },
  { path: '/:category',
    sidebar: () => <div>bubblegum!</div>,
    main: () => <h2>Bubblegum</h2>
  },
]

class App extends Component {
  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchPostAndComments();
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
  fetchPostAndComments: () => dispatch(fetchPostAndComments()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
