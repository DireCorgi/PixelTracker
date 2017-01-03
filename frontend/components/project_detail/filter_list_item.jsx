import React from 'react';

const FilterListItem = (props) => {
  const spanClassName = `sidebar-icon ${props.filterName}-icon`;
  let liClassName = `${props.filterName}-item`;
  if (props.sidebar) liClassName += ' selected-filter';
  return (
    <li
      id={props.filterName}
      onClick={props.handleFilter(props.filterName)}
      className={liClassName}>
      <span className={spanClassName}></span>
      {props.filterContent}
    </li>
  );
};

export default FilterListItem;
