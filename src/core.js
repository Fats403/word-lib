"use strict";

function createWordLib(dictionary) {
  function exists(text, options = { allowOneLetterWords: false }) {
    if (typeof text !== "string") {
      throw new TypeError("Text must be of type string.");
    }

    const cleanedText = text.trim().toLowerCase();

    if (cleanedText.length === 0) {
      return false;
    }

    if (cleanedText.length === 1) {
      if (options && options.allowOneLetterWords) {
        return cleanedText === "i" || cleanedText === "a";
      }
      return false;
    }

    const prefix = cleanedText.slice(0, 2);
    const bucket = dictionary[prefix];
    return Boolean(bucket && bucket.includes(cleanedText));
  }

  function random(options) {
    const opts = options || {};
    if (typeof opts !== "object" || Array.isArray(opts)) {
      throw new TypeError("Options must be an object.");
    }

    let { minLength, maxLength, seed } = opts;

    if (typeof minLength !== "undefined") {
      if (typeof minLength !== "number" || Number.isNaN(minLength)) {
        throw new TypeError("minLength must be of type number.");
      }
      minLength = Math.floor(minLength);
    }

    if (typeof maxLength !== "undefined") {
      if (typeof maxLength !== "number" || Number.isNaN(maxLength)) {
        throw new TypeError("maxLength must be of type number.");
      }
      maxLength = Math.floor(maxLength);
    }

    const effectiveMin = typeof minLength === "number" ? minLength : 3;

    if (effectiveMin < 3) {
      throw new Error("Minimum length of random word must be at least 3.");
    }
    if (typeof maxLength === "number" && maxLength < 3) {
      throw new Error("Maximum length of random word must be at least 3.");
    }
    if (
      typeof maxLength === "number" &&
      typeof effectiveMin === "number" &&
      maxLength < effectiveMin
    ) {
      throw new Error("maxLength must be greater than or equal to minLength.");
    }

    const rng = createRng(seed);
    const shuffledBuckets = shuffle(Object.values(dictionary), rng);

    for (let i = 0; i < shuffledBuckets.length; i++) {
      const bucket = shuffle(shuffledBuckets[i], rng);
      for (let j = 0; j < bucket.length; j++) {
        const word = bucket[j];
        if (
          word.length >= effectiveMin &&
          (typeof maxLength !== "number" || word.length <= maxLength)
        ) {
          return word;
        }
      }
    }

    return "";
  }

  function shuffle(array, rng) {
    const rand = rng || Math.random;
    const arr = array.slice();
    let currentIndex = arr.length;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(rand() * currentIndex);
      currentIndex--;
      [arr[currentIndex], arr[randomIndex]] = [
        arr[randomIndex],
        arr[currentIndex],
      ];
    }

    return arr;
  }

  function createRng(seed) {
    if (seed === undefined || seed === null) {
      return Math.random;
    }
    let s = 0;
    if (typeof seed === "number") {
      s = seed | 0;
    } else if (typeof seed === "string") {
      s = hashString(seed);
    } else {
      return Math.random;
    }
    return mulberry32(s);
  }

  function mulberry32(a) {
    let t = a >>> 0;
    return function () {
      t += 0x6d2b79f5;
      let r = Math.imul(t ^ (t >>> 15), t | 1);
      r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
      return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };
  }

  function hashString(str) {
    let hash = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) {
      hash ^= str.charCodeAt(i);
      hash = Math.imul(hash, 0x01000193);
    }
    return hash >>> 0;
  }

  return { exists, random };
}

module.exports = { createWordLib };
