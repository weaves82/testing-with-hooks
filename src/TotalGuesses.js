import React from "react";
import PropTypes from "prop-types";

const TotalGuesses = ({ totalGuesses }) => {
  return (
    totalGuesses > 0 && (
      <div data-test="component-total-guesses">
        Total Guesses: {totalGuesses}
      </div>
    )
  );
};

TotalGuesses.propTypes = {
  totalGuesses: PropTypes.number,
};

export default TotalGuesses;
