let defaultLanguage: string = "en";
const allowedLanguages: string[] = [defaultLanguage];

export let currentLanguage: string = defaultLanguage;

export interface IDictionary {
  [key: string]: string[];
}

export interface IDictionaries {
  [key: string]: IDictionary;
}

export const dictionaries: IDictionaries = {
  [defaultLanguage]: require(`./${defaultLanguage}/${defaultLanguage}.json`),
};

export const getDictionary = (): IDictionary => {
  return dictionaries[currentLanguage];
};

export const setLanguage = (language: string): void => {
  if (typeof language !== "string") {
    throw new TypeError("Language must be of type string.");
  }

  if (language.length !== 2) {
    throw new Error("Language code must be two letters.");
  }

  if (!allowedLanguages.includes(language)) {
    throw new Error(`Language '${language}' is not yet supported.`);
  }

  if (!dictionaries[language]) {
    dictionaries[
      language
    ] = require(`./${currentLanguage}/${currentLanguage}.json`);
  }

  currentLanguage = language;
};
