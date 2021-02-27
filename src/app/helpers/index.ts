// uncategorized helper methods

import { Layer } from "app/types";
import { Layers } from "app/constants";

export function forEachLayer(cb: (layer: Layer) => void) {
  [0, 1, 2, 3, 4, 5, 6, 7, 8].forEach((layerIndex) => {
    const layer = Layers[layerIndex];
    cb(layer);
  });
}

// https://stackoverflow.com/a/54931396/9449426
export function stringifyOneLineArray(obj: object) {
  return JSON.stringify(
    obj,
    (k, v) => {
      if (v instanceof Array) return JSON.stringify(v);
      return v;
    },
    2
  )
    .replace(/\\/g, "")
    .replace(/\"\[/g, "[")
    .replace(/\]\"/g, "]")
    .replace(/\"\{/g, "{")
    .replace(/\}\"/g, "}");
}

// Array.filter(Boolean) still return (any | undefined)[] in typescript
// https://stackoverflow.com/a/58110124/9449426
export function nonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

export function isArrayEqual<T>(arr1: T[], arr2: T[]) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}

function removeUniqueIdentifier(name: string) {
  return name.replace(/\((.*)\)$/, "").trim();
}

/**
 * ```
 * ('a', ['b']) => 'a'
 * ('a', ['a']) => 'a (1)'
 * ('a', ['a', 'a (1)']) => 'a (2)'
 * ('a', ['a', 'a (3)']) => 'a (2)'
 * ('a', ['a (1)', 'a (2)']) => 'a'
 * ```
 */
export function getUniqueName(name: string, names: string[]) {
  const baseName = removeUniqueIdentifier(name);
  const duplicatedNumbers = names
    .map((n) => {
      if (removeUniqueIdentifier(n) === baseName) {
        const [, dupNumber] = n.match(/\((.*)\)$/) || [undefined, "0"];
        return Number(dupNumber);
      } else {
        return -1;
      }
    })
    .filter((n) => n >= 0)
    .sort((a, b) => a - b);
  let dupNumber = -1;

  for (let i = 0; i < duplicatedNumbers.length; i++) {
    if (i !== duplicatedNumbers[i]) {
      dupNumber = i;
      break;
    }
  }

  if (dupNumber === -1) {
    dupNumber = duplicatedNumbers.length;
  }

  return dupNumber === 0 ? baseName : baseName + ` (${dupNumber})`;
}
