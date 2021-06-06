import React from "react";
import PropTypes from "prop-types";

const Square = ({ value, handleClick }) => (
  <button className="square" onClick={handleClick}>
    {value}
  </button>
);

Square.propTypes = {
  value: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
};

export default Square;
