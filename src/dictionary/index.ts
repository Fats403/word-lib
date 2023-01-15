let defaultLanguage: string = "en";
let currentLanguage: string = defaultLanguage;

const allowedLanguages: string[] = [defaultLanguage];

export interface IDictionary {
  [key: string]: string[];
}

export interface IDictionaries {
  [key: string]: IDictionary;
}

const dictionaries: IDictionaries = {
  [defaultLanguage]: require(`./${defaultLanguage}/${defaultLanguage}.json`),
};

export const getDictionary = (): IDictionary => {
  return dictionaries[currentLanguage];
};

export const setLanguage = (language: string): void => {
  if (typeof language !== "string") {
    throw new Error("Language must be of type string.");
  }

  if (language.length !== 2) {
    throw new Error("Language code must be two letters.");
  }

  if (!allowedLanguages.includes(language)) {
    throw new Error(`Language '${language}' is not yet suppoted.`);
  }

  if (!dictionaries[language]) {
    dictionaries[
      language
    ] = require(`./${currentLanguage}/${currentLanguage}.json`);
  }

  currentLanguage = language;
};
