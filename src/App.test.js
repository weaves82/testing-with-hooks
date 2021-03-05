import React from "react";
import { mount } from "enzyme";
import { findByTestAttr } from "../test/testUtils";
import App from "./App";
import Actions from "./actions/actionHooks";

const mockGetSecretWord = jest.fn();

/**
 * Setup function for app component
 * @param {string} secretWord - desited secretWord state for test
 * @returns {ReactWrapper}
 */
const setup = (secretWord = "party") => {
  mockGetSecretWord.mockClear();
  Actions.getSecretWord = mockGetSecretWord;

  const mockUseReducer = jest
    .fn()
    .mockReturnValue([{ secretWord, language: "en" }, jest.fn()]);
  React.useReducer = mockUseReducer;

  return mount(<App />);
};

test("App renders without error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "component-app");
  expect(component.length).toBe(1);
});

describe("getSecretWord calls", () => {
  test("called on mount", () => {
    setup();
    expect(mockGetSecretWord).toHaveBeenCalled();
  });
  test("not called on update", () => {
    const wrapper = setup();
    mockGetSecretWord.mockClear();
    wrapper.setProps();
    expect(mockGetSecretWord).not.toHaveBeenCalled();
  });
});

describe("secret word is not null", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });
  test("does render app when secretWord is not null", () => {
    const component = findByTestAttr(wrapper, "component-app");
    expect(component.exists()).toBe(true);
  });
  test("does not render spinner when secretWord is not null", () => {
    const component = findByTestAttr(wrapper, "spinner");
    expect(component.exists()).toBe(false);
  });
});

describe("secret word is null", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup(null);
  });
  test("does not render app when secretWord is null", () => {
    const component = findByTestAttr(wrapper, "component-app");
    expect(component.exists()).toBe(false);
  });
  test("does render spinner when secretWord is null", () => {
    const component = findByTestAttr(wrapper, "spinner");
    expect(component.exists()).toBe(true);
  });
});
