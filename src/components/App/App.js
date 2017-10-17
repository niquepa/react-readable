import React, { Component } from 'react';
import logo from '../../assets/img/logo.svg';
import Header from '../Header/';
import 'material-components-web/dist/material-components-web.min.css';
import '../../assets/css/App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
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
