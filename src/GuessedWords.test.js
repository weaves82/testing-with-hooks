import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "../test/testUtils";
import GuessedWords from "./GuessedWords";

import guessedWordsContext from "./contexts/guessedWordsContext";

/**
 * Factory function to create a ShallowWrapper for the GuessedWords component.
 * @function setup
 * @param {array} guessedWords - Guessedwords array specific to this setup.
 * @returns {ShallowWrapper}
 */
const setup = (guessWords = []) => {
  const mockUseGuessedWords = jest
    .fn()
    .mockReturnValue([guessWords, jest.fn()]);
  guessedWordsContext.useGuessedWords = mockUseGuessedWords;
  return shallow(<GuessedWords />);
};

describe("if there are no words guessed", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup([]);
  });
  test("renders without error", () => {
    const component = findByTestAttr(wrapper, "component-guessed-words");
    expect(component.length).toBe(1);
  });
  test("renders instructions to guess a word", () => {
    const instructions = findByTestAttr(wrapper, "guess-instructions");
    expect(instructions.text().length).not.toBe(0);
  });
});
describe("if there are words guessed", () => {
  let wrapper;
  const guessedWords = [
    { guessedWord: "train", letterMatchCount: 3 },
    { guessedWord: "agile", letterMatchCount: 1 },
    { guessedWord: "party", letterMatchCount: 5 },
  ];
  beforeEach(() => {
    wrapper = setup(guessedWords);
  });
  test("renders without error", () => {
    const component = findByTestAttr(wrapper, "component-guessed-words");
    expect(component.length).toBe(1);
  });
  test('renders "guessed words" section', () => {
    const guessedWordsNode = findByTestAttr(wrapper, "guessed-words");
    expect(guessedWordsNode.length).toBe(1);
  });
  test("correct number of guessed words", () => {
    const guessedWordNodes = findByTestAttr(wrapper, "guessed-word");
    expect(guessedWordNodes.length).toBe(guessedWords.length);
  });
  test("includes guess word index for each word", () => {
    const guessedWordNodes = findByTestAttr(wrapper, "guessed-word-index");
    const indexNumber = guessedWordNodes.map((value) => value.text());
    const expectedText = guessedWords.map((value, index) =>
      (index + 1).toString()
    );
    expect(indexNumber).toEqual(expectedText);
  });
  test("correct number of total Guesses", () => {
    const guessedWordNodes = findByTestAttr(wrapper, "component-total-guesses");
    expect(guessedWordNodes.text()).toContain(guessedWords.length);
  });
});
describe("languagePicker", () => {
  test("correctly renders guess instructions string in English by default", () => {
    const wrapper = setup([]);
    const guessInstructions = findByTestAttr(wrapper, "guess-instructions");
    expect(guessInstructions.text()).toBe("Try to guess the secret word!");
  });
  test("correctly renders guess instructions string in emoji", () => {
    const mockUseContext = jest.fn().mockReturnValue("emoji");
    React.useContext = mockUseContext;
    const wrapper = setup([]);
    const guessInstructions = findByTestAttr(wrapper, "guess-instructions");
    expect(guessInstructions.text()).toBe("🤔🤫🔤");
  });
});
