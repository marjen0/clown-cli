expect.extend({
  toBeDistinct(received) {
    const pass =
      Array.isArray(received) && new Set(received).size === received.length;
    if (pass) {
      return {
        message: () => `expected [${received}] array is unique`,
        pass: true,
      };
    }
    return {
      message: () => `expected [${received}] array is not to unique`,
      pass: false,
    };
  },
});
