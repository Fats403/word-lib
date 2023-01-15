import { getDictionary, IDictionary } from "./dictionary";

const exists = (text: string): boolean => {
  if (typeof text !== "string") {
    throw new TypeError("Text must be of type string.");
  }

  const cleanedText: string = text.trim().toLowerCase();

  if (cleanedText.length === 0) {
    return false;
  }

  if (cleanedText.length === 1) {
    return cleanedText === "i" || cleanedText === "a";
  }

  const dictionary: IDictionary = getDictionary();
  const wordPrefixGroup: string[] = dictionary[cleanedText.slice(0, 2)];

  return Boolean(wordPrefixGroup?.includes(cleanedText));
};

export { exists };
