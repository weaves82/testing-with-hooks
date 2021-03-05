import React from "react";
import PropTypes from "prop-types";

import languageContext from "./contexts/languageContext";
import guessedWordsContext from "./contexts/guessedWordsContext";
import successContext from "./contexts/successContext";
import hooksAction from "./actions/actionHooks";
import stringModule from "./helpers/strings";

const NewWordButton = ({ setSecretWord, setGivenUp }) => {
  const language = React.useContext(languageContext);
  const [success, setSuccess] = successContext.useSuccess();
  const [guessedWords, setGuessedWords] = guessedWordsContext.useGuessedWords();

  if (!success) {
    return null;
  }
  return (
    <button
      onClick={() => {
        hooksAction.getSecretWord(setSecretWord);
        setSuccess(false);
        setGuessedWords([]);
        setGivenUp(false);
      }}
      data-test="new-word-button"
    >
      {stringModule.getStringByLanguage(language, "newWord")}
    </button>
  );
};

NewWordButton.propTypes = {
  setSecretWord: PropTypes.func.isRequired,
  setGivenUp: PropTypes.func.isRequired,
};

export default NewWordButton;
