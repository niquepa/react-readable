import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import 'material-components-web/dist/material-components-web.min.css';
import Header from '../Header/';
import '../../assets/css/App.css';
import { fetchCategories } from '../../actions/index';


class App extends Component {

  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    return (
      <div className="app">
        <Header />
      </div>
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
