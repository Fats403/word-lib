# word-lib <!-- omit in toc -->

> `word-lib` is a type-safe word library that can be used offline and is based off of [@Brandons42's](https://github.com/Brandons42) [word-exists](https://github.com/Brandons42/word-exists).
> This was built with the intent of adding typesafety, making it easier to add new languages, and allowing for different ways to query for words in `js` or `ts` based applications.
>
> `word-lib` is currently in production use on my game [Word Wurm](https://www.wordwurm.com/).

## Table of contents <!-- omit in toc -->

- [Install](#install)
- [Usage](#usage)
  - [`exists`](#exists)
    - [`word: string`](#word-string)
    - [`options?: IOption`](#options-ioption)
      - [`allowOneLetterWords: boolean`](#allowoneletterwords-boolean)
  - [`random`](#random)
    - [`maxLength?: number`](#maxlength-number)
  - [`setLanguage`](#setlanguage)
    - [`languageCode: string`](#languagecode-string)
- [License](#license)
- [Contribute](#contribute)
  - [Adding a new language](#adding-a-new-language)

## Install

```console
$ npm install word-lib --save
```

or

```console
$ yarn add word-lib
```

## Usage

Check if a word exists -- white space is trimmed, compares against lower-case. Hyphenated compound words aren't counted as words.

```ts
import wordLib from "word-lib";

wordLib.exists("word"); // true
wordLib.exists("library"); // true
wordLib.exists(" space "); // true

wordLib.exists("xyz"); // false
wordLib.exists("not-a-word"); // false
wordLib.exists("two words"); // false

wordLib.exists("a"); // false
wordLib.exists("a", { allowOneLetterWords: true }); // true
```

### `exists`

#### `word: string`

The word that is being checked to exist

#### `options?: IOption`

<details>
  <summary><code>IOption</code></summary>
  
  ##### `allowOneLetterWords: boolean`

If true, will treat `a` and `i` as one letter words. (defaults to `false`)

</details>

---

Get a random word from the dictionary. Minimum 3 letters long.

```ts
import wordLib from "word-lib";

wordLib.random(); // any possible word
wordLib.random(5); // generate a random word with a max length of 5
```

### `random`

#### `maxLength?: number`

Sets the max length of the random word that can be found

---

Change current language, defaults to english (`en`). No other languages are currently supported.

```ts
import wordLib from "word-lib";

wordLib.setLanguage("en"); // set current language to english
```

### `setLanguage`

#### `languageCode: string`

The language code the dictionary should be set to

---

## License

Licensed under

- MIT ([LICENSE](LICENSE) / <http://opensource.org/licenses/MIT>)

## Contribute

Any PR's for improvements, missing words or other language support are always welcome.

### Adding a new language

To add a new language create a new folder within the `/src/dictionary` directory as the name of the language in [ISO 639-1](https://www.loc.gov/standards/iso639-2/php/code_list.php) format. Then add the language json file under that directory as `{languageCode}.json` and add the language code to the `allowedLanguages` to enable it. Look at the current [dictionary](https://github.com/Fats403/word-lib/tree/main/src/dictionary) example for reference.
