const map1 = new Map([
  ["02.01", { top: 525, left: 200 }],
  ["02.02", { top: 470, left: 210 }],
  ["02.03", { top: 415, left: 230 }],
  ["02.04", { top: 340, left: 270 }],
  ["02.05", { top: 280, left: 310 }],
  ["02.06", { top: 220, left: 360 }],
  ["02.21", { top: 550, left: 840 }],
  ["02.22", { top: 550, left: 800 }],
  ["02.29", { top: 700, left: 700 }],
  ["02.36", { top: 735, left: 345 }],
  ["02.23", { top: 570, left: 800 }],
  ["02.37", { top: 730, left: 380 }],
  ["02.38", { top: 760, left: 375 }],
  ["02.D1", { top: 220, left: 650 }],
  ["02.D4", { top: 490, left: 800 }],
  ["02.D2", { top: 300, left: 590 }],
  ["02.D3", { top: 500, left: 700 }],
  ["02.D5", { top: 695, left: 780 }],
  ["02.D6", { top: 650, left: 610 }],
  ["02.D7", { top: 740, left: 620 }],
  ["02.D8", { top: 750, left: 500 }],
  ["02.D9", { top: 740, left: 405 }],
  ["02.D10", { top: 650, left: 400 }],
]);

export function navigationIdToCoords(id: string) {
  return map1.get(id);
}
