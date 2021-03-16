expect.extend({
  toHaveDistinctPropertyValue(received, property) {
    const seen = new Set();
    const hasDuplicates = received.some(
      (currentObject) => seen.size === seen.add(currentObject[property]).size
    );
    if (!hasDuplicates) {
      return {
        message: () =>
          `expected [${received}] property ${property} value is unique`,
        pass: true,
      };
    }
    return {
      message: () =>
        `expected [${received}] property ${property} value is not unique`,
      pass: false,
    };
  },
});
