// Test case 1: Check if the "minHeight" style property is set correctly
test("Check if minHeight style property is set correctly", () => {
  const wrapper = shallow(<Home />);
  const section = wrapper.find("section.hero");
  const minHeight = section.prop("style").minHeight;
  expect(minHeight).toEqual("var(--min-height)");
});

// Test case 2: Check if the "heroHeading" text is rendered correctly
test("Check if heroHeading text is rendered correctly", () => {
  const wrapper = shallow(<Home />);
  const heroHeading = wrapper.find(".heroHeading");
  const text = heroHeading.text();
  expect(text).toEqual("BitMemoir for Education");
});

// Test case 3: Check if the "heroSubheading" text is rendered correctly
test("Check if heroSubheading text is rendered correctly", () => {
  const wrapper = shallow(<Home />);
  const heroSubheading = wrapper.find(".heroSubheading");
  const text = heroSubheading.text();
  expect(text).toEqual("Revolutionizing Certification with Blockchain");
});

// Test case 4: Check if the "freeTrialButton" is hidden
test("Check if freeTrialButton is hidden", () => {
  const wrapper = shallow(<Home />);
  const freeTrialButton = wrapper.find(".freeTrialButton");
  const display = freeTrialButton.prop("style").display;
  expect(display).toEqual("none");
});

// Test case 5: Check if the "heroDiamondMobile" image is rendered correctly
test("Check if heroDiamondMobile image is rendered correctly", () => {
  const wrapper = shallow(<Home />);
  const heroDiamondMobile = wrapper.find(".heroDiamondMobile");
  expect(heroDiamondMobile.exists()).toBe(true);
});