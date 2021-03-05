import React from "react";
import { shallow } from "enzyme";
import { checkProps, findByTestAttr } from "../test/testUtils";

import TotalGuesses from "./TotalGuesses";

describe("Total Guesses", () => {
  const setup = (totalGuesses) => {
    return shallow(<TotalGuesses totalGuesses={totalGuesses} />);
  };

  test("props are rendering as expected", () => {
    checkProps(TotalGuesses, { totalGuesses: 2 });
  });
  test("not rendered if no guesses", () => {
    const wrapper = setup(0);
    const component = findByTestAttr(wrapper, "component-total-guesses");
    //expect(component.length).toBe(0);
    expect(wrapper.isEmptyRender()).toBe(true);
  });
  test("language is updated", () => {});
});
