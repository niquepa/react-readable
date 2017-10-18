import React, { Component } from 'react';
import 'material-components-web/dist/material-components-web.min.css';
import Header from '../Header/';
import '../../assets/css/App.css';
import { getCategories } from '../../utils/api';

class App extends Component {
  state = {
    categories: null,
  }

  componentDidMount = () => {
    getCategories()
      .then((categories) => {
        this.setState({ categories: categories})
      })
  }


  render() {
    return (
      <div className="app">
        <Header categories={this.state.categories} />
        {/* <Route path="/search" render={() => ( */}
        {/* <SearchBooks myBooks={this.state.books} shelves={this.state.shelves} updateBookShelve={this.updateBookShelve}/> */}
        {/* )} /> */}
        {/* <Route exact path="/" render={() => ( */}
        {/* <ListBooks myBooks={this.state.books} shelves={this.state.shelves} updateBookShelve={this.updateBookShelve} /> */}
        {/* )} /> */}
      </div>
    );
  }
}

export default App;
