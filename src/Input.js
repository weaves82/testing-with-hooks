import React from "react";
import PropTypes from "prop-types";

import stringModules from "./helpers/strings";
import { getLetterMatchCount } from "./helpers";

import guessedWordsContext from "./contexts/guessedWordsContext";
import successContext from "./contexts/successContext";
import languageContext from "./contexts/languageContext";

const Input = (props) => {
  const language = React.useContext(languageContext);
  const { secretWord } = props;
  const [success, setSuccess] = successContext.useSuccess();
  const [guessedWords, setGuessedWords] = guessedWordsContext.useGuessedWords();
  const [currentGuess, setCurrentGuess] = React.useState("");

  if (success) {
    return null;
  }
  return (
    <div data-test="component-input">
      <form className="form-inline">
        <input
          data-test="input-box"
          className="mb-2 mx-sm-3"
          type="text"
          placeholder={stringModules.getStringByLanguage(
            language,
            "guessInputPlaceholder"
          )}
          value={currentGuess}
          onChange={(event) => setCurrentGuess(event.target.value)}
        />
        <button
          data-test="submit-button"
          className="btn btn-primary mb-2"
          onClick={(event) => {
            event.preventDefault();
            const newGuessedWords = [
              ...guessedWords,
              {
                guessedWord: currentGuess,
                letterMatchCount: getLetterMatchCount(currentGuess, secretWord),
              },
            ];
            setGuessedWords(newGuessedWords);
            if (currentGuess === secretWord) {
              setSuccess(true);
            }
            setCurrentGuess("");
          }}
        >
          {stringModules.getStringByLanguage(language, "submit")}
        </button>
      </form>
    </div>
  );
};

Input.propTypes = {
  secretWord: PropTypes.string.isRequired,
};

export default Input;
