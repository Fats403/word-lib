# word-lib <!-- omit in toc -->

> `word-lib` is a lightweight offline English word helper with no external dependencies based off of [@Brandons42's](https://github.com/Brandons42) [word-exists](https://github.com/Brandons42/word-exists).
> Its a tiny JS API for checking if a word exists and has the ability to generate a random word with options for a specified min/max length or a seed value for deterministic generations.
>
> `word-lib` is currently in production use on my game [Word Wurm](https://www.wordwurm.com/).

## Table of contents <!-- omit in toc -->

- [Install](#install)
- [Usage](#usage)
  - [Imports](#imports)
  - [`exists`](#exists)
  - [`random`](#random)
- [API](#api)
- [License](#license)
- [Contribute](#contribute)
  - [Data](#data)

## Install

```console
$ npm install word-lib
```

## Usage

Check if a word exists -- white space is trimmed, compares against lower-case. Hyphenated compound words aren't counted as words.

### Imports

```js
// CommonJS
const wordLib = require("word-lib");
// or cherry-pick
const { exists, random } = require("word-lib");
```

```js
// ES Modules
import wordLib, { exists, random } from "word-lib";
```

Examples

```js
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

Options

```ts
type ExistsOptions = {
  allowOneLetterWords?: boolean; // default false
};
```

Rules

- If `allowOneLetterWords` is true, `a` and `i` are treated as valid one-letter words

---

Get a random word from the dictionary.

```js
const { random } = require("word-lib");

// Any possible word (min defaults to 3)
random();

// Constrain by lengths
random({ maxLength: 5 });
random({ minLength: 6, maxLength: 10 });

// Seeded deterministic random
random({ seed: 42 });
random({ maxLength: 8, seed: "game-seed" });
```

### `random`

Returns a random word from the dictionary.

Options

```ts
type RandomOptions = {
  minLength?: number; // default 3
  maxLength?: number; // optional upper bound
  seed?: number | string; // deterministic RNG when provided
};
```

Rules

- If `minLength` is provided, it must be >= 3
- If `maxLength` is provided, it must be >= 3
- If both are provided, `maxLength` must be >= `minLength`

---

### API

This package exports two functions:

- `exists(word: string, options?: { allowOneLetterWords?: boolean }) => boolean`
- `random(options?: { minLength?: number; maxLength?: number; seed?: number | string }) => string`

---

## License

Licensed under

- MIT ([LICENSE](LICENSE) / <http://opensource.org/licenses/MIT>)

## Contribute

Any PR's for improvements or missing words are welcome.

### Data

The English dictionary is grouped by two-letter prefixes for fast lookups.
