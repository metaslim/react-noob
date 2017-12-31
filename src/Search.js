import React from 'react';

export const Search = ({onChange, onSubmit, value, children}) =>
  <form onSubmit={onSubmit}>
    <input type="text" onChange={onChange} value={value} />
    <button type="submit">{children}</button>
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
