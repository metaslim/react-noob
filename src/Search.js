import React, { Component } from 'react';

export const Search = ({onChange, value, children}) =>
  <form>
    {children} <input type="text" onChange={onChange} value={value}/>
  </form>

  //class Search extends Component {
  //  render() {
  //    const {onChange, value, children} = this.props;

  //    return (
  //      <form>
  //        {children} <input type="text" onChange={onChange} value={value}/>
  //      </form>
  //    );
  //  }
  //}

  //function Search(props){
  //  const {onChange, value, children} = props;

  //  return (
  //    <form>
  //      {children} <input type="text" onChange={onChange} value={value}/>
  //    </form>
  //  );
  //}

  //const Search = (props) => {
  //  const {onChange, value, children} = props;

  //  return (
  //    <form>
  //      {children} <input type="text" onChange={onChange} value={value}/>
  //    </form>
  //  );
  //}
