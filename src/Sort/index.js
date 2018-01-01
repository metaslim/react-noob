import React from 'react';
import {Button} from '../Button';
import classNames from 'classnames'

const Sort = ({sortKey, onSort='', children, activeSortKey}) => {
  const sortClass = classNames(
    'button-inline',
    {'button-active': sortKey === activeSortKey}
  );

  const onSort_with_event = (event) => onSort(sortKey)

  return <Button onClick={onSort_with_event} className={sortClass}>
    {children}
  </Button>
}

export default Sort;
