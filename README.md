# word-lib <!-- omit in toc -->

> word-lib is type-safe word library based off of [@Brandons42's](https://github.com/Brandons42) [word-exists](https://github.com/Brandons42/word-exists). It can check if a word exists in english or return a random word from the dictionary.

## Table of contents <!-- omit in toc -->

- [Install](#install)
- [Usage](#usage)
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

wordLib.exists("xyz"); // false
wordLib.exists("not-a-word"); // false
```

Get a random word from the dictionary. Minimum 3 letters long.

```ts
import wordLib from "word-lib";

wordLib.random(); // any possible word
wordLib.random(5); // generate a random word with a max length of 5
```

Change current language, defaults to english (`en`). No other languages are currently supported.

```ts
import wordLib from "word-lib";

wordLib.setLanguage("en"); // set current language to english
```

## License

Licensed under

- MIT ([LICENSE-MIT](LICENSE-MIT) / <http://opensource.org/licenses/MIT>)

## Contribute

Any PR's for missing words or other language support are always welcome.

### Adding a new language

To add a new language create a new folder within the `/src/dictionary` directory as the name of the language in [ISO 639-1](https://www.loc.gov/standards/iso639-2/php/code_list.php) format. Then add the language json file under that directory as `${languageCode}.json`. Then add the language code to the `allowedLanguages` to enable it. Look at the `en` example for reference.
