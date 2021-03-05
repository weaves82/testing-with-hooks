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

    const gaveUpButtonComponent = findByTestAttr(
      wrapper,
      "component-give-up-button"
    );
    gaveUpButtonComponent.simulate("click");
  });
  test("new word button appears", () => {
    const inputComponent = findByTestAttr(wrapper, "new-word-button");
    expect(inputComponent.length).toBe(1);
  });
  test("reset text appears", () => {
    const guessedTableComponent = findByTestAttr(
      wrapper,
      "component-secret-word-reveal"
    );
    expect(guessedTableComponent.text()).toContain("Better luck next time");
  });
  test("Congrats component no longer shows", () => {
    const congratsComponent = findByTestAttr(wrapper, "component-congrats");
    expect(congratsComponent.length).toBe(0);
  });
});
