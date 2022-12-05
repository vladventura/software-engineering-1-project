export const lightOrDark = (color) => {
  // Variables for red, green, blue values
  let r, g, b, hsp;

  // Check the format of the color, HEX or RGB?
  if (color.match(/^rgb/)) {
    // If RGB --> store the red, green, blue values in separate variables
    color = color.match(
      /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
    );

    r = color[1];
    g = color[2];
    b = color[3];
  } else {
    // If hex --> Convert it to RGB: http://gist.github.com/983661
    color = +("0x" + color.slice(1).replace(color.length < 5 && /./g, "$&$&"));

    r = color >> 16;
    g = (color >> 8) & 255;
    b = color & 255;
  }

  // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
  hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

  // Using the HSP value, determine whether the color is light or dark
  if (hsp > 127.5) {
    return "light";
  } else {
    return "dark";
  }
};

export const getTextForColor = (color) => {
  return lightOrDark(color) === "light" ? "#000" : "#fff";
};

export const areEventsSimilar = (e1, e2) => {
  if (e1.name !== e2.name) return false;
  if (e1.date !== e2.date) return false;
  if (e1.description !== e2.description) return false;
  if (e1.dueTime !== e2.dueTime) return false;
  return true;
};

// https://www.geeksforgeeks.org/calculate-current-week-number-in-javascript/
export const getWeekNumber = (date = new Date()) => {
  const startDate = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
  return Math.ceil(days / 7);
};
