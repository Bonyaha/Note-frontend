import React from 'react';

const Display = ({ name, number }) => {
  //console.log(info);
  return (
    <li className="list-group-item">
      {name}: {number}
    </li>
  );
};

export default Display;
