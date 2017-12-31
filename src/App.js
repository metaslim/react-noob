import React, { Component } from 'react';
import './App.css';
import { Table } from './Table';
import { Search } from './Search';
import { Button } from './Button';

const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP = '100';

const PATH_BASE = 'https://hn.algolia.com/api/v1'
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY,
    };

    this.setSearchTopStories = this.setSearchTopStories.bind(this)
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this)


    this.onSearchSubmit = this.handleSearchSubmit.bind(this)
    this.onSearchChange = this.handleSearchChange.bind(this)
    this.onDismiss = this.handleDismiss.bind(this)


    //this.onDismiss = (id) => {
    //  const updateList = this.state.list.filter(item => item.objectID !== id);
    //  this.setState({list: updateList});
    //}

    //this.onDismiss = function handleDismiss(id){
    //  const updateList = this.state.list.filter(item => item.objectID !== id);
    //  this.setState({list: updateList});
    //}
  }

  setSearchTopStories(result) {
    const{hits, page} = result;
    const oldHits = page !== 0 ? this.state.result.hits : [];
    const updatedHits = [...oldHits, ...hits];

    this.setState({
      result: {
        hits: updatedHits,
        page: page
      }
    });
  }

  fetchSearchTopStories(searchTerm, page=0) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(e => e);
  }

  handleDismiss(event, id) {
    const isNotId = item => item.objectID !== id;
    const updatedHits = this.state.result.hits.filter(isNotId);

    //this.setState({
    //    result: Object.assign({}, this.state.result, {hits: updatedHits})
    //});

    this.setState({
        result: Object.assign(...this.state.result, {hits: updatedHits})
    });
  }

  handleSearchChange(event) {
    this.setState({searchTerm: event.target.value});
  }

  handleSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
    event.preventDefault();
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm)
  }

  //handleDismiss = (id) => {
  // const updateList = this.state.list.filter(item => item.objectID !== id);
  //  this.setState({list: updateList});
  //}

  render() {
    const { result, searchTerm } = this.state;
    const page = (result && result.page) || 0;
    const fetchSearchTopStories = () => this.fetchSearchTopStories(searchTerm, page + 1)

    return (
      <div className="page">
        <div className="interactions">
          <Search value={searchTerm} onChange={this.onSearchChange} onSubmit={this.onSearchSubmit}>Search</Search>
        </div>
        {result &&<Table list={result.hits} pattern={searchTerm} onDismiss={this.onDismiss} />}
        <div className="interactions">
          <Button onClick={fetchSearchTopStories}>More</Button>
        </div>
      </div>
    );
  }
}

export default App;
