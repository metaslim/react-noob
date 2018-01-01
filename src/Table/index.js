import React from 'react';
import {Button} from '../Button';
import {SORTS} from '../Constant';
import Sort from '../Sort';

const Table = ({list, pattern, onDismiss, sortKey, onSort, isSortReverse}) => {
  const sortedList = SORTS[sortKey](list);
  const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList;
  const isSearched = (searchTerm) => (item) => !searchTerm || item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase());
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
      <div className="table-header">
        <span style={{ width: '40%' }}>
          <Sort sortKey={'TITLE'} onSort={onSort} activeSortKey={sortKey}>
            Title
          </Sort>
        </span>
        <span style={{ width: '30%' }}>
          <Sort sortKey={'AUTHOR'} onSort={onSort} activeSortKey={sortKey}>
            Author
          </Sort>
        </span>
        <span style={{ width: '10%' }}>
          <Sort sortKey={'COMMENTS'} onSort={onSort} activeSortKey={sortKey}>
            Comments
          </Sort>
        </span>
        <span style={{ width: '10%' }}>
          <Sort sortKey={'POINTS'} onSort={onSort} activeSortKey={sortKey}>
            Points
          </Sort>
        </span>
        <span style={{ width: '10%' }}>
          Archive
        </span>
      </div>
      {reverseSortedList.filter(isSearched(pattern)).map(item => {
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
