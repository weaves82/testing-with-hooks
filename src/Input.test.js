import React from "react";
import { mount } from "enzyme";
import Input from "./Input";
import { findByTestAttr, checkProps } from "../test/testUtils";

import guessedWordsContext from "./contexts/guessedWordsContext";
import successContext from "./contexts/successContext";
import languageContext from "./contexts/languageContext";

const setup = ({ language, secretWord, success }) => {
  language = language || "en";
  secretWord = secretWord || "party";
  success = success || false;

  return mount(
    <languageContext.Provider value={language}>
      <guessedWordsContext.GuessedWordsProvider>
        <successContext.SuccessProvider value={[success, jest.fn()]}>
          <Input secretWord={secretWord} />
        </successContext.SuccessProvider>
      </guessedWordsContext.GuessedWordsProvider>
    </languageContext.Provider>
  );
};

describe("languagePicker", () => {
  test("submit button is english", () => {
    const wrapper = setup({});
    const submitButton = findByTestAttr(wrapper, "submit-button");
    expect(submitButton.text()).toBe("Submit");
  });
  test("submit button is emoji when language switched", () => {
    const wrapper = setup({ language: "emoji" });
    const submitButton = findByTestAttr(wrapper, "submit-button");
    expect(submitButton.text()).toBe("🚀");
  });
});

test("Input renders ok", () => {
  const wrapper = setup({});
  const component = findByTestAttr(wrapper, "component-input");
  expect(component.length).toBe(1);
});

test("correct props", () => {
  const secretWord = "party";
  const props = { secretWord };
  checkProps(Input, props);
});

describe("state controlled input field", () => {
  let mockSetCurrentGuess = jest.fn();
  let wrapper;
  beforeEach(() => {
    mockSetCurrentGuess.mockClear();
    React.useState = jest.fn(() => ["", mockSetCurrentGuess]);
    wrapper = setup({});
  });
  test("state updates with value of input box upon change", () => {
    const inputBox = findByTestAttr(wrapper, "input-box");
    const mockEvent = { target: { value: "train" } };
    inputBox.simulate("change", mockEvent);
    expect(mockSetCurrentGuess).toHaveBeenCalledWith("train");
  });
  test("state updates to empty string when guess submitted", () => {
    const submitButton = findByTestAttr(wrapper, "submit-button");
    submitButton.simulate("click", { preventDefault() {} });
    expect(mockSetCurrentGuess).toHaveBeenCalledWith("");
  });
});

test("input renders when success is true", () => {
  const wrapper = setup({ success: true, secretWord: "party" });
  expect(wrapper.isEmptyRender()).toBe(true);
});
