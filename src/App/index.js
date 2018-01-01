import React, { Component } from 'react';
import './index.css';

import Table from '../Table';
import Search from '../Search';
import {Button, ButtonWithLoading} from '../Button';
import Loading from '../Loading';

import {DEFAULT_QUERY, DEFAULT_HPP, PATH_BASE, PATH_SEARCH, PARAM_SEARCH, PARAM_PAGE, PARAM_HPP} from '../Constant';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      error: null,
      isLoading: false
    };

    this.needToSearchTopStories = this.needToSearchTopStories.bind(this)
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

  needToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm];
  }

  setSearchTopStories(result) {
    const{hits, page} = result;
    const{searchKey, results} = this.state;

    const oldHits = results && results[searchKey] ? results[searchKey].hits : [];
    const updatedHits = [...oldHits, ...hits];

    this.setState({
      results: {
        ...results,
        [searchKey]: {hits: updatedHits, page: page}
      },
      isLoading: false
    });
  }

  fetchSearchTopStories(searchTerm, page=0) {
    this.setState({isLoading: true});

    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(e => this.setState({ error: e }));
  }

  handleDismiss(event, id) {
    const {searchKey, results} = this.state;
    const {hits, page} = results[searchKey];

    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);

    //this.setState({
    //    result: Object.assign({}, this.state.result, {hits: updatedHits})
    //});

    //this.setState({
    //    result: Object.assign(...this.state.result, {hits: updatedHits})
    //});

    this.setState({
      results: {
        ...results,
        [searchKey]: {hits: updatedHits, page}
      }
    });
  }

  handleSearchChange(event) {
    this.setState({searchTerm: event.target.value});
  }

  handleSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.setState({searchKey: searchTerm})

    if (this.needToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }

    event.preventDefault();
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.setState({searchKey: searchTerm})
    this.fetchSearchTopStories(searchTerm)
  }

  //handleDismiss = (id) => {
  // const updateList = this.state.list.filter(item => item.objectID !== id);
  //  this.setState({list: updateList});
  //}

  render() {
    const {results, searchTerm, searchKey, error, isLoading} = this.state;

    const page = (results && results[searchKey] && results[searchKey].page) || 0;
    const list = (results && results[searchKey] && results[searchKey].hits) || [];

    if (error) {
      return <p>Something went wrong.</p>;
    }

    const fetchSearchTopStories = () => this.fetchSearchTopStories(searchKey, page + 1)

    return (
      <div className="page">
        <div className="interactions">
          <Search value={searchTerm} onChange={this.onSearchChange} onSubmit={this.onSearchSubmit}>Search</Search>
        </div>
        {<Table list={list} pattern={searchTerm} onDismiss={this.onDismiss} />}
        <div className="interactions">
          <ButtonWithLoading isLoading={isLoading} onClick={fetchSearchTopStories}>More</ButtonWithLoading>
        </div>
      </div>
    );
  }
}

export default App;
