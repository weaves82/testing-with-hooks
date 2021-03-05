import React from "react";
import { mount, shallow } from "enzyme";

import guessedWordsContext from "./guessedWordsContext";

const FunctionalComponent = () => {
  guessedWordsContext.useGuessedWords();
  return <div />;
};

test("useGuessedWords is only called in ocntext", () => {
  expect(() => {
    shallow(<FunctionalComponent />);
  }).toThrow("called function outside of guessedWordsContext");
});

test("useGuessedWords is called in guessedWordsProvider", () => {
  expect(() => {
    mount(
      <guessedWordsContext.GuessedWordsProvider>
        <FunctionalComponent />
      </guessedWordsContext.GuessedWordsProvider>
    );
  }).not.toThrow("called function outside of guessedWordsContext");
});
