import { getDictionary, IDictionary } from "./dictionary";

export interface IOption {
  allowOneLetterWords?: boolean;
}

const defualtOptions: IOption = {
  allowOneLetterWords: false,
};

const exists = (text: string, options: IOption = defualtOptions): boolean => {
  if (typeof text !== "string") {
    throw new TypeError("Text must be of type string.");
  }

  const cleanedText: string = text.trim().toLowerCase();

  if (cleanedText.length === 0) {
    return false;
  }

  if (cleanedText.length === 1) {
    if (options.allowOneLetterWords) {
      return cleanedText === "i" || cleanedText === "a";
    }
    return false;
  }

  const dictionary: IDictionary = getDictionary();
  const wordPrefixGroup: string[] = dictionary[cleanedText.slice(0, 2)];
  const wordExists = Boolean(wordPrefixGroup?.includes(cleanedText));

  return wordExists;
};

export { exists };
