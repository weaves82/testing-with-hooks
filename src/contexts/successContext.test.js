import React from "react";
import { shallow, mount } from "enzyme";

import successContext from "./successContext";

const FunctionalComponent = () => {
  successContext.useSuccess();
  return <div />;
};

test("useSuccess isn't called outside of the SuccessProvider", () => {
  expect(() => {
    shallow(<FunctionalComponent />);
  }).toThrow("useSuccess must be used with SuccessProvider");
});

test("useSuccess is called form within a SuccessProvider", () => {
  expect(() => {
    mount(
      <successContext.SuccessProvider>
        <FunctionalComponent />
      </successContext.SuccessProvider>
    );
  }).not.toThrow();
});
