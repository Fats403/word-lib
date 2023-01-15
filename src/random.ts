import { getDictionary, IDictionary } from "./dictionary";

export const random = (maxLength?: number): string => {
  if (maxLength) {
    if (typeof maxLength !== "number") {
      throw new TypeError("Max length must be of type string.");
    }

    maxLength = Math.floor(maxLength);

    if (maxLength < 3) {
      throw new Error("Maximum length of random word must be atlesat 3.");
    }
  }

  let _word: string = "";

  const dictionary: IDictionary = getDictionary();
  const shuffledWordSet: string[][] = shuffle(Object.values(dictionary));

  exit_loop: for (let i = 0; i < shuffledWordSet.length; i++) {
    const set: string[] = shuffle(shuffledWordSet[i]);
    for (let j = 0; j < set.length; j++) {
      const word: string = set[j];
      if (word.length >= 3) {
        if (!maxLength || (maxLength && word.length <= maxLength)) {
          _word = word;
          break exit_loop;
        }
      }
    }
  }

  return _word;
};

function shuffle(array: any[]) {
  let currentIndex: number = array.length;
  let randomIndex: number;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
