import React from 'react';

const List = ({ country, showDetails }) => {
  return (
    <li>
      {country.name.common}
      <button
        type="button"
        onClick={showDetails}
        className="btn btn-info btn-sm m-2"
      >
        Show
      </button>
    </li>
  );
};

export default List;
