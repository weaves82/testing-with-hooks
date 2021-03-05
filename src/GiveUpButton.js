import React from "react";
import PropTypes from "prop-types";

import languageContext from "./contexts/languageContext";
import successContext from "./contexts/successContext";

import stringModule from "./helpers/strings";

const GiveUpButton = ({ setGivenUp }) => {
  const language = React.useContext(languageContext);
  const [success, setSuccess] = successContext.useSuccess();
  if (success) {
    return <div data-test="component-give-up-button" />;
  }
  return (
    <button
      data-test="component-give-up-button"
      onClick={() => {
        setSuccess(true);
        setGivenUp(true);
      }}
    >
      {stringModule.getStringByLanguage(language, "giveUp")}
    </button>
  );
};

GiveUpButton.propTypes = {
  setGivenUp: PropTypes.func.isRequired,
};

export default GiveUpButton;
