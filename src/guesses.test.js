//test simulating a guess

//add input, add in some words, submit and then check to make sure input disappears and
//populates the guessed words table

import React from "react";
import { mount } from "enzyme";

import { findByTestAttr } from "../test/testUtils";

import guessedWordsContext from "./contexts/guessedWordsContext";
import successContext from "./contexts/successContext";

import Input from "./Input";
import GuessedWords from "./GuessedWords";

const setup = (secretWord = "party", guessedWordsStrings = []) => {
  const wrapper = mount(
    <guessedWordsContext.GuessedWordsProvider>
      <successContext.SuccessProvider>
        <Input secretWord={secretWord} />
        <GuessedWords />
      </successContext.SuccessProvider>
    </guessedWordsContext.GuessedWordsProvider>
  );

  const inputBox = findByTestAttr(wrapper, "input-box");
  const submitButton = findByTestAttr(wrapper, "submit-button");

  // eslint-disable-next-line array-callback-return
  guessedWordsStrings.map((word) => {
    const mockEvent = {
      target: {
        value: word,
      },
    };
    inputBox.simulate("change", mockEvent);
    submitButton.simulate("click");
  });

  return [wrapper, inputBox, submitButton];
};

describe("test guess words", () => {
  let wrapper;
  let inputBox;
  let submitButton;
  describe("non-empty guesswords", () => {
    beforeEach(() => {
      [wrapper, inputBox, submitButton] = setup("party", ["agile"]);
    });
    describe("Successful guess", () => {
      beforeEach(() => {
        const mockEvent = {
          target: {
            value: "party",
          },
        };
        inputBox.simulate("change", mockEvent);
        submitButton.simulate("click");
      });
      test("congrats message is shown/input component is not shown", () => {
        const inputComponent = findByTestAttr(wrapper, "component-input");
        expect(inputComponent.children().length).toBe(0);
      });
      test("guessword table is updated", () => {
        const guessedTableRows = findByTestAttr(wrapper, "guessed-word");
        expect(guessedTableRows.length).toBe(2);
      });
    });
    describe("Unsuccessful guess", () => {
      beforeEach(() => {
        const mockEvent = {
          target: {
            value: "train",
          },
        };
        inputBox.simulate("change", mockEvent);
        submitButton.simulate("click");
      });
      test("input is still shown", () => {
        expect(inputBox.exists()).toBe(true);
      });
      test("guessword table is updated", () => {
        const guessedTableRows = findByTestAttr(wrapper, "guessed-word");
        expect(guessedTableRows.length).toBe(2);
      });
    });
  });
  describe("empty guesswords", () => {
    beforeEach(() => {
      [wrapper, inputBox, submitButton] = setup("party", []);
    });
    describe("Unsuccessful guess", () => {
      beforeEach(() => {
        const mockEvent = {
          target: {
            value: "train",
          },
        };
        inputBox.simulate("change", mockEvent);
        submitButton.simulate("click");
      });
      test("guessword table is updated", () => {
        const guessedTableRows = findByTestAttr(wrapper, "guessed-word");
        expect(guessedTableRows.length).toBe(1);
      });
    });
  });
});
