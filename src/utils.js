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
