import React from "react";
import PropTypes from "prop-types";
import { mount } from "enzyme";
import { checkProps, findByTestAttr } from "../test/testUtils";

import languageContext from "./contexts/languageContext";
import successContext from "./contexts/successContext";
import GiveUpButton from "./GiveUpButton";

const mockSetSuccess = jest.fn();
const setGivenUp = jest.fn();
const setup = ({ success, language }) => {
  success = success || false;
  language = language || "en";

  return mount(
    <languageContext.Provider value={language}>
      <successContext.SuccessProvider value={[success, mockSetSuccess]}>
        <GiveUpButton setGivenUp={setGivenUp} />
      </successContext.SuccessProvider>
    </languageContext.Provider>
  );
};

test("correct prop used", () => {
  checkProps(GiveUpButton, { setGivenUp: jest.fn() });
});

describe("GiveUpButton", () => {
  test("renders ok", () => {
    const wrapper = setup({ success: true });
    const component = findByTestAttr(wrapper, "component-give-up-button");
    expect(component.length).toBe(1);
  });
  test("renders if success is false or giveup is false", () => {
    const wrapper = setup({ success: false });
    const giveUpButton = findByTestAttr(wrapper, "component-give-up-button");
    expect(giveUpButton.text().length).toBeGreaterThan(0);
  });
  test("doesn't renders if success is true or giveup is true", () => {
    const wrapper = setup({ success: true });
    const giveUpButton = findByTestAttr(wrapper, "component-give-up-button");
    expect(giveUpButton.text().length).toBe(0);
  });
  test("button calls success as true", () => {
    const wrapper = setup({ success: false });
    wrapper.simulate("click");
    expect(mockSetSuccess).toHaveBeenCalledWith(true);
    expect(setGivenUp).toHaveBeenCalledWith(true);
  });
});

describe("languagePicker", () => {
  test("submit button is english", () => {
    const wrapper = setup({ success: false, language: "en" });
    const newWordButtonComponent = findByTestAttr(
      wrapper,
      "component-give-up-button"
    );
    expect(newWordButtonComponent.text()).toBe("Give Up");
  });
  test("submit button is emoji when language switched", () => {
    const wrapper = setup({ success: false, language: "emoji" });
    const newWordButtonComponent = findByTestAttr(
      wrapper,
      "component-give-up-button"
    );
    expect(newWordButtonComponent.text()).toBe("😩");
  });
});
