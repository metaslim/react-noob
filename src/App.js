import React, { Component } from 'react';
import './App.css';
import { Table } from './Table';
import { Search } from './Search';

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list,
      searchTerm: '',
    };

    this.onDismiss = this.handleDismiss.bind(this)
    this.onSearchChange = this.handleChange.bind(this)

    //this.onDismiss = (id) => {
    //  const updateList = this.state.list.filter(item => item.objectID !== id);
    //  this.setState({list: updateList});
    //}

    //this.onDismiss = function handleDismiss(id){
    //  const updateList = this.state.list.filter(item => item.objectID !== id);
    //  this.setState({list: updateList});
    //}
  }

  handleDismiss(event, id) {
    const updateList = this.state.list.filter(item => item.objectID !== id);
    this.setState({list: updateList});
  }

  handleChange(event) {
    this.setState({searchTerm: event.target.value});
  }

  //handleDismiss = (id) => {
  // const updateList = this.state.list.filter(item => item.objectID !== id);
  //  this.setState({list: updateList});
  //}

  render() {
    const { list, searchTerm } = this.state;

    return (
      <div className="page">
        <div className="interactions">
          <Search value={searchTerm} onChange={this.onSearchChange}>Search</Search>
        </div>
        <Table list={list} pattern={searchTerm} onDismiss={this.onDismiss} />
      </div>
    );
  }
}

export default App;
