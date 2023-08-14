export const wait = async (ms = 200) =>
  new Promise((resolve) => setTimeout(resolve, ms));
