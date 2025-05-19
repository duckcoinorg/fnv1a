# FNV-1a Hash Library

A minimalistic TypeScript implementation of the FNV-1a hash function, providing both raw hash generation and range-based number generation

## Installation

```bash
yarn add fnv1a
```

## Usage

```typescript
import { fnv1aHash, stringToNumberInRange } from 'fnv1a';

// Generate a 32-bit FNV-1a hash
const hash = fnv1aHash('hello world');
console.log(hash); // 0x7b9c3b7d

// Generate a number in a specific range
const number = stringToNumberInRange('hello world', 100);
console.log(number); // A number between 0 and 100
```

## API

### `fnv1aHash(str: string): number`

Generates a 32-bit FNV-1a hash of the input string.

- `str`: The input string to hash
- Returns: A 32-bit unsigned integer hash value

### `stringToNumberInRange(str: string, maxValue: number): number`

Generates a number in the range [0, maxValue] based on the hash of the input string.

- `str`: The input string to hash
- `maxValue`: The maximum value (inclusive) for the generated number
- Returns: A number between 0 and maxValue (inclusive)

## Features

- Full Unicode support (including emoji and surrogate pairs)
- Consistent hashing (same input always produces same output)
- TypeScript support with type definitions
- Well-tested with comprehensive test suite

## License

MIT 