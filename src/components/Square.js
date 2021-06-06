import React from "react";
import PropTypes from "prop-types";

const Square = ({ value }) => {
  return <button className="square">{value}</button>;
};

Square.propTypes = {
  value: PropTypes.number.isRequired,
};

export default Square;
