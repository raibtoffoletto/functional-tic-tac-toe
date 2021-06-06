import React, { useState } from "react";
import PropTypes from "prop-types";

const Square = ({ value }) => {
  const [thisValue, setThisValue] = useState("");

  return (
    <button className="square" onClick={() => setThisValue("X")}>
      {thisValue}
    </button>
  );
};

Square.propTypes = {
  value: PropTypes.number.isRequired,
};

export default Square;
