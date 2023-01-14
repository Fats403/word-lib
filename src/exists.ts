const dictionary = require("./dictionary");

module.exports = (text: string): boolean => {
  if (typeof text !== "string") {
    throw new TypeError("Text must be of type string.");
  }

  const cleanedText = text.trim().toLowerCase();

  if (cleanedText.length === 0) {
    return false;
  }

  if (cleanedText.length === 1) {
    return cleanedText === "i" || cleanedText === "a";
  }

  const wordPrefixGroup = dictionary[cleanedText.slice(0, 2)];

  return Boolean(wordPrefixGroup?.includes(cleanedText));
};

export {};
