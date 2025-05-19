import { fnv1aHash, stringToNumberInRange } from './fnv1a';

describe('fnv1aHash', () => {
  it('should generate consistent hash for the same input', () => {
    const input = 'test string';
    expect(fnv1aHash(input)).toBe(fnv1aHash(input));
  });

  it('should generate different hashes for different inputs', () => {
    expect(fnv1aHash('test1')).not.toBe(fnv1aHash('test2'));
  });

  it('should handle empty string', () => {
    expect(fnv1aHash('')).toBe(0x811c9dc5);
  });

  it('should handle Unicode characters', () => {
    const hash1 = fnv1aHash('🌍');
    const hash2 = fnv1aHash('🌎');
    expect(hash1).not.toBe(hash2);
  });

  it('should handle surrogate pairs correctly', () => {
    const emoji = '👨‍👩‍👧‍👦';
    expect(fnv1aHash(emoji)).toBe(fnv1aHash(emoji));
  });

  it('should handle invalid Unicode sequences', () => {
    // Create a string with an invalid surrogate pair
    const invalidString = 'a\uD800b'; // \uD800 is a high surrogate without a low surrogate
    const hash1 = fnv1aHash(invalidString);
    const hash2 = fnv1aHash(invalidString);
    expect(hash1).toBe(hash2);
    
    // Test with a string that has an undefined codePoint
    const str = 'test';
    const mockStr = {
      length: 5,
      codePointAt: (i: number) => i === 4 ? undefined : str.codePointAt(i)
    } as string;
    expect(fnv1aHash(mockStr)).toBe(fnv1aHash(mockStr));
  });
});

describe('stringToNumberInRange', () => {
  it('should return a number within the specified range', () => {
    const maxValue = 10;
    const result = stringToNumberInRange('test', maxValue);
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(maxValue);
  });

  it('should return consistent results for the same input', () => {
    const input = 'test string';
    const maxValue = 100;
    expect(stringToNumberInRange(input, maxValue))
      .toBe(stringToNumberInRange(input, maxValue));
  });

  it('should handle edge cases', () => {
    expect(stringToNumberInRange('test', 0)).toBe(0);
    expect(stringToNumberInRange('test', 1)).toBeGreaterThanOrEqual(0);
    expect(stringToNumberInRange('test', 1)).toBeLessThanOrEqual(1);
  });

  it('should distribute values relatively evenly', () => {
    const maxValue = 9;
    const results = new Set();
    for (let i = 0; i < 100; i++) {
      results.add(stringToNumberInRange(`test${i}`, maxValue));
    }
    // We expect at least 5 different values out of 10 possible values
    expect(results.size).toBeGreaterThanOrEqual(5);
  });
}); 