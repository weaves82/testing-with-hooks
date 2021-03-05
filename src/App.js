import React from "react";
import "./App.css";
import hookActions from "./actions/actionHooks";
import languageContext from "./contexts/languageContext";
import successContext from "./contexts/successContext";
import guessedWordsContext from "./contexts/guessedWordsContext";

import Input from "./Input";
import LanguagePicker from "./LanguagePicker";
import Congrats from "./Congrats";
import NewWordButton from "./NewWordButton";
import GiveUpButton from "./GiveUpButton";
import SecretWordReveal from "./SecretWordReveal";
import GuessedWords from "./GuessedWords";

const reducer = (state, action) => {
  switch (action.type) {
    case "setSecretWord":
      return {
        ...state,
        secretWord: action.payload,
      };
    case "setLanguage":
      return {
        ...state,
        language: action.payload,
      };
    case "setGivenUp":
      return {
        ...state,
        givenUp: action.payload,
      };
    default:
      throw new Error("Error dawgs,get the hell out of there");
  }
};

function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    secretWord: null,
    language: "en",
    givenUp: false,
  });

  const setSecretWord = (secretWord) => {
    dispatch({
      type: "setSecretWord",
      payload: secretWord,
    });
  };

  const setLanguage = (language) => {
    dispatch({
      type: "setLanguage",
      payload: language,
    });
  };

  const setGivenUp = (givenUp) => {
    dispatch({
      type: "setGivenUp",
      payload: givenUp,
    });
  };

  React.useEffect(() => {
    hookActions.getSecretWord(setSecretWord);
  }, []);

  if (!state.secretWord) {
    return (
      <div className="container" data-test="spinner">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p>Loading secret word</p>
      </div>
    );
  }

  return (
    <div data-test="component-app" className="container">
      <h1>JOTTO</h1>
      <p>Secret Word: {state.secretWord}</p>
      <languageContext.Provider value={state.language}>
        <LanguagePicker setLanguage={setLanguage} />
        <guessedWordsContext.GuessedWordsProvider>
          <successContext.SuccessProvider>
            {!state.givenUp ? (
              <Congrats />
            ) : (
              <SecretWordReveal secretWord={state.secretWord} />
            )}
            <NewWordButton
              setSecretWord={setSecretWord}
              setGivenUp={setGivenUp}
            />
            <Input secretWord={state.secretWord} />
            {!state.givenUp && <GiveUpButton setGivenUp={setGivenUp} />}
          </successContext.SuccessProvider>
          <GuessedWords />
        </guessedWordsContext.GuessedWordsProvider>
      </languageContext.Provider>
    </div>
  );
}

export default App;
