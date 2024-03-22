# natural number parsing
 A javascript package to parse numbers in natural language. Supports a wide variety of number formats.

## Installation
`npm install natural-number-parsing`
or
`yarn add natural-number-parsing`

## Usage

### parseNumber

Parses a number from a string.

Returns `NaN` if the string does not contain a well-formed number.

```javascript
import { parseNumber } from 'natural-number-parsing';

console.log(parseNumber('one hundred')); // 100
console.log(parseNumber('one hundred and fifty')); // 150
console.log(parseNumber('150')); // 150
console.log(parseNumber('three point one four one five nine')); // 3.14159
console.log(parseNumber('three point five two million')); // 3 520 000
console.log(parseNumber('3.52 million')); // 3 520 000
console.log(parseNumber('three million five hundred twenty thousand')); // 3 520 000
console.log(parseNumber('zero point five')); // 0.5
console.log(parseNumber('not a number')); // NaN
```

### numberToWords

Converts a number to words.

```javascript

import { numberToWords } from 'natural-number-parsing';

console.log(numberToWords(100)); // one hundred
console.log(numberToWords(150)); // one hundred and fifty
console.log(numberToWords(3.14159)); // three point one four one five nine

```

### wordsToNumbers

Converts all numbers in a string to digit format.

```javascript

import { wordsToNumbers } from 'natural-number-parsing';

console.log(wordsToNumbers('one hundred')); // 100
console.log(wordsToNumbers('one hundred and fifty')); // 150
console.log(wordsToNumbers('I have one hundred and fifty apples')); // I have 150 apples
console.log(wordsToNumbers('I have 150 apples')); // I have 150 apples
```

For more information on supported number formats, see the [tests]().

## Contributing

Contributions are welcome! Please feel free to submit a PR.

Please make sure to add tests for any new features or bug fixes.

## License

MIT


