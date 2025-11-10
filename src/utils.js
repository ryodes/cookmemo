import {
  red,
  blue,
  cyan,
  teal,
  yellow,
  orange,
  grey,
  brown,
  green,
} from "@mui/material/colors";

const NUM_WORDS = {
  un: 1,
  une: 1,
  deu: 2,
  deux: 2,
  troi: 3,
  trois: 3,
  quatre: 4,
  cinq: 5,
  six: 6,
  sept: 7,
  huit: 8,
  huits: 8,
  neuf: 9,
  dix: 10,
  onze: 11,
  douze: 12,
};

const colors = [red, blue, cyan, teal, yellow, orange, grey, brown, green];

function isLetter(char) {
  return /^[a-zA-Z]$/.test(char);
}

export function formatMailBadge(email) {
  const emailSplit = email.split("@");

  if (!isLetter(emailSplit[0].charAt(emailSplit[0].length - 1)))
    return formatMailBadge(emailSplit[0].substring(0, email.length - 1));
  else
    return (
      emailSplit[0].charAt(0) + emailSplit[0].charAt(emailSplit[0].length - 1)
    );
}

function letterToNumber(letter) {
  const num = letter.toUpperCase().charCodeAt(0) - 64;
  return ((num - 1) % 9) + 1;
}

export function colorBadge(email) {
  const initial = formatMailBadge(email);
  const firstLetter = initial.charAt(0);
  const secondLetter = initial.charAt(1);
  const num1 = letterToNumber(firstLetter);
  const num2 = letterToNumber(secondLetter);
  const color = colors[num1 - 1];
  return color[num2 * 100];
}

export function adjustIngredientQuantity(ingredient, ratio) {
  const text = ingredient.trim();

  // --- Cas 1 : nombre numérique (ex: "2 tomates", "1.5 cuillère")
  const numericMatch = text.match(/(\d+(\.\d+)?)/);
  if (numericMatch) {
    const number = parseFloat(numericMatch[1]);
    const newNumber = Math.round(number * ratio);
    return text.replace(
      numericMatch[1],
      newNumber.toString().replace(/\.0$/, "")
    );
  }

  // --- Cas 2 : nombre écrit en lettres (ex: "trois œufs")
  const words = text.split(/\s+/);
  for (let i = 0; i < words.length; i++) {
    const lower = words[i].toLowerCase();
    if (NUM_WORDS[lower]) {
      const number = NUM_WORDS[lower];
      const newNumber = Math.round(number * ratio);
      words[i] = newNumber.toString();
      return words.join(" ");
    }
  }

  // --- Cas 3 : aucun nombre trouvé
  return text;
}
