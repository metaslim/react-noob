import React from 'react';
import Button from '../Button';

const Table = ({list, pattern, onDismiss}) => {
  const isSearched = (searchTerm) => (item) => !searchTerm|| item.title.toLowerCase().includes(searchTerm.toLowerCase());
  const largeColumn = {
    width: '40%',
  };

  const midColumn = {
    width: '30%',
  };

  const smallColumn = {
    width: '10%',
  };

  return (
    <div className="table">
      {list.filter(isSearched(pattern)).map(item => {
        const onDismiss_with_event = (event) => onDismiss(event, item.objectID)

        return (
          <div key={item.objectID} className="table-row">
            <span style={largeColumn}>
              <a href={item.url}>{item.title}</a>
            </span>
            <span style={midColumn}>
              {item.author}
            </span>
            <span style={smallColumn}>
              {item.num_comments}
            </span>
            <span style={smallColumn}>
              {item.points}
            </span>
            <span style={smallColumn}>
              <Button onClick={onDismiss_with_event} className="button-inline">
                Dismiss
              </Button>
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default Table;

//class Table extends Component {
//  render() {
//    const {list, pattern, onDismiss} = this.props;
//    const isSearched = (searchTerm) => (item) => !searchTerm|| item.title.toLowerCase().includes(searchTerm.toLowerCase());

//    return (
//      <div>
//        {list.filter(isSearched(pattern)).map(item => {
//          const onDismiss_with_event = (event) => onDismiss(event, item.objectID)

//          return (
//            <div key={item.objectID}>
//              <span>
//                <a href={item.url}>{item.title}</a>
//              </span>
//              <span>{item.author}</span>
//              <span>{item.num_comments}</span>
//              <span>{item.points}</span>
//              <span>
//                <Button onClick={onDismiss_with_event}>
//                  Dismiss
//                </Button>
//              </span>
//            </div>
//          );
//        })}
//      </div>
//    );
//  }
//}

//function isSearched(searchTerm) {
//  return function(item) {
//    return item.title.toLowerCase().includes(searchTerm.toLowerCase());
//  }
//}

// ES6
// const isSearched = (searchTerm) => (item) => !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());

//var searchTerm = 'rea';
//var item = { title: 'React' };

//console.log(isSearched(searchTerm)(item));
