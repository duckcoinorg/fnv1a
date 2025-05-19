function fnv1aHash(str: string): number {
  let hash = 0x811c9dc5; // Initial value for FNV-1a (2166136261)
  let i = 0;
  while (i < str.length) {
    const codePoint = str.codePointAt(i);
    if (codePoint === undefined) {
      i++;
      continue;
    }
    hash ^= codePoint;
    hash = Math.imul(hash, 0x01000193); // FNV-1a multiplier (16777619)
    // If surrogate pair, then increase index by 2
    i += codePoint > 0xffff ? 2 : 1;
  }
  return hash >>> 0;
}

function stringToNumberInRange(str: string, maxValue: number) {
  const hash = fnv1aHash(str);
  return hash % (maxValue + 1);
}

export { fnv1aHash, stringToNumberInRange };
