import React from "react";

const Filter = ({ setFilter }) => {
  return (
    <div style={{ marginBottom: "25px" }}>
      <input
        placeholder="search"
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      />
    </div>
  );
};

export default Filter;
