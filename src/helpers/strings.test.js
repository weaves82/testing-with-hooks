import stringsModule from "./strings";

const { getStringByLanguage } = stringsModule;

const string = {
  en: {
    submit: "submit",
  },
  emoji: {
    submit: "🚀",
  },
  mermish: {},
};

describe("testing Strings", () => {
  const mockWarn = jest.fn();
  let originalWarn;

  beforeEach(() => {
    originalWarn = console.warn;
    console.warn = mockWarn;
  });

  afterEach(() => {
    console.warn = originalWarn;
  });

  test("returns submit for english language", () => {
    const submitString = getStringByLanguage("en", "submit", string);
    expect(submitString).toBe("submit");
    expect(mockWarn).not.toHaveBeenCalled();
  });
  test("returns 🚀 for emoji language", () => {
    const submitString = getStringByLanguage("emoji", "submit", string);
    expect(submitString).toBe("🚀");
    expect(mockWarn).not.toHaveBeenCalled();
  });
  test("returns english submit when submit not available as string", () => {
    const submitString = getStringByLanguage("notreal", "submit", string);
    expect(submitString).toBe("submit");
    expect(mockWarn).toHaveBeenCalledWith(
      "Could not get string [submit] for [notreal]"
    );
  });
  test("returns english submit when submit not avaiable in language", () => {
    const submitString = getStringByLanguage("mermish", "submit", string);
    expect(submitString).toBe("submit");
    expect(mockWarn).toHaveBeenCalledWith(
      "Could not get string [submit] for [mermish]"
    );
  });
});
