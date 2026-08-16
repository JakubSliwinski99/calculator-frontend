import { MAX_DISPLAY_LENGTH } from "./constants";

const DISALLOWED_CHARACTERS = /[^0-9.]/g;

export function limitDisplayLength(value: string) {
  return value.slice(0, MAX_DISPLAY_LENGTH);
}

function sanitizeDisplayValue(value: string) {
  return value.replace(DISALLOWED_CHARACTERS, "");
}

export function normalizeDisplayValue(value: string) {
  const sanitized = sanitizeDisplayValue(value);

  let normalized = sanitized;

  if (sanitized === ".") {
    normalized = "0.";
  } else {
    const dotIndex = sanitized.indexOf(".");
    if (dotIndex !== -1) {
      normalized =
        sanitized.slice(0, dotIndex + 1) +
        sanitized.slice(dotIndex + 1).replace(/\./g, "");
    }
  }

  return limitDisplayLength(normalized);
}

export function appendCharacter(current: string, character: string) {
  if (current.length >= MAX_DISPLAY_LENGTH) {
    return current;
  }

  if (character === ".") {
    if (current === "") {
      return "0.";
    }

    if (current.includes(".")) {
      return current;
    }

    return limitDisplayLength(`${current}.`);
  }

  return normalizeDisplayValue(current + character);
}
