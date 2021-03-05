import React from "react";
import { mount } from "enzyme";
import hooksAction from "./actions/actionHooks";

import App from "./App";
import { findByTestAttr } from "../test/testUtils";

const setup = () => {
  // mock getSecretWord so that it sets the secret word without network calls
  hooksAction.getSecretWord = jest.fn((setSecretWord) =>
    setSecretWord("party")
  );
  return mount(<App />);
};
describe("simulate guesses with App component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
    const inputBox = findByTestAttr(wrapper, "input-box");
    const submitButton = findByTestAttr(wrapper, "submit-button");

    // eslint-disable-next-line array-callback-return
    const mockEvent = {
      target: {
        value: "party",
      },
    };
    inputBox.simulate("change", mockEvent);
    submitButton.simulate("click");

    const newWordButtonComponent = findByTestAttr(wrapper, "new-word-button");
    newWordButtonComponent.simulate("click");
  });
  test("input appears", () => {
    const inputComponent = findByTestAttr(wrapper, "component-input");
    expect(inputComponent.length).toBe(1);
  });
  test("guessed words table is empty", () => {
    const guessedTableComponent = findByTestAttr(wrapper, "guess-instructions");
    expect(guessedTableComponent.length).toBe(1);
  });
  test("Congrats component no longer shows", () => {
    const congratsComponent = findByTestAttr(wrapper, "component-congrats");
    expect(congratsComponent.text().length).toBe(0);
  });
  test("New Word Button button no longer shows", () => {
    const newWordButtonComponent = findByTestAttr(
      wrapper,
      "component-new-word-button"
    );
    expect(newWordButtonComponent.length).toBe(0);
  });
});
