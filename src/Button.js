import React, { Component } from 'react';

export const Button = ({onClick, className='', children}) =>
  <button onClick={onClick} className={className} type="button">
    {children}
  </button>

  //class Button extends Component {
  //  render() {
  //    const {onClick, className='', children} = this.props;

  //    return (
  //      <button onClick={onClick} className={className} type="button">
  //        {children}
  //      </button>
  //    );
  //  }
  //}
