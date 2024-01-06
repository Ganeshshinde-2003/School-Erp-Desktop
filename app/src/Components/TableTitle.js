import React from 'react';

const TableTitle = ({ title }) => {
  return (
    <h1 className="h-16 text-center font-bold text-white bg-black  flex items-center justify-center">
      {title}
    </h1>
  );
};

export default TableTitle;
