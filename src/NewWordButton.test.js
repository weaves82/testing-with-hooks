import React from "react";
import { shallow, mount } from "enzyme";
import { checkProps, findByTestAttr } from "../test/testUtils";

import guessedWordsContext from "./contexts/guessedWordsContext";
import languageContext from "./contexts/languageContext";
import successContext from "./contexts/successContext";
import NewWordButton from "./NewWordButton";
import actionHooks from "./actions/actionHooks";

test("props work ok", () => {
  checkProps(NewWordButton, {
    setSecretWord: jest.fn(),
    setGivenUp: jest.fn(),
  });
});
const mockSetSuccess = jest.fn();
describe("NewWordButton component", () => {
  let mockSetSecretWord, mockSetGivenUp;
  const setup = ({ success, language }) => {
    success = success || false;
    language = language || "en";
    mockSetSecretWord = jest.fn();
    mockSetGivenUp = jest.fn();
    const wrapper = mount(
      <guessedWordsContext.GuessedWordsProvider>
        <languageContext.Provider value={language}>
          <successContext.SuccessProvider value={[success, mockSetSuccess]}>
            <NewWordButton
              setSecretWord={mockSetSecretWord}
              setGivenUp={mockSetGivenUp}
            />
          </successContext.SuccessProvider>
        </languageContext.Provider>
      </guessedWordsContext.GuessedWordsProvider>
    );
    return wrapper;
  };
  describe("languagePicker", () => {
    test("submit button is english", () => {
      const wrapper = setup({ success: true });
      const newWordButtonComponent = findByTestAttr(wrapper, "new-word-button");
      expect(newWordButtonComponent.text()).toBe("New Word");
    });
    test("submit button is emoji when language switched", () => {
      const wrapper = setup({ success: true, language: "emoji" });
      const newWordButtonComponent = findByTestAttr(wrapper, "new-word-button");
      expect(newWordButtonComponent.text()).toBe("✨🔤");
    });
  });
  test("renders ok if success", () => {
    const wrapper = setup({ success: false });
    const newWordButtonComponent = findByTestAttr(wrapper, "new-word-button");
    expect(newWordButtonComponent.length).toBe(0);
  });
  test("when button is pressed to make sure new word is generated", () => {
    const wrapper = setup({ success: true });
    const mockGetSecretWord = jest.fn();
    actionHooks.getSecretWord = mockGetSecretWord;
    const newWordButtonComponent = findByTestAttr(wrapper, "new-word-button");
    newWordButtonComponent.simulate("click");
    expect(mockGetSecretWord).toHaveBeenCalledTimes(1);
    expect(mockSetSuccess).toHaveBeenCalledWith(false);
  });
});
