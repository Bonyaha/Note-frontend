import React from 'react';

const Display = ({ info, number }) => {
  //console.log(info);
  return (
    <li className="list-group-item">
      {info.name}: {number}
    </li>
  );
};

export default Display;
