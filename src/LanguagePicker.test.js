import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr, checkProps } from "../test/testUtils";

import LanguagePicker from "./LanguagePicker";

const mockSetLanguage = jest.fn();

const setup = () => {
  return shallow(<LanguagePicker setLanguage={mockSetLanguage} />);
};

describe("Language Picker ", () => {
  test("renders without error", () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, "component-language-picker");
    expect(component.exists()).toBe(true);
  });

  test("renders correct props", () => {
    checkProps(LanguagePicker, { setLanguage: jest.fn() });
  });

  test("renders language icons", () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, "language-icons");
    expect(component.length).toBeGreaterThan(0);
  });

  test("calls setLanguage prop upon click", () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, "language-icons");
    const firstIcon = component.first();
    firstIcon.simulate("click");
    expect(mockSetLanguage).toHaveBeenCalled();
  });
});
