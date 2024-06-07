const map1 = new Map([
  ["stair1", { top: 400, left: 360 }],
  ["02.01", { top: 525, left: 200 }],
  ["02.02", { top: 470, left: 210 }],
  ["02.03", { top: 415, left: 230 }],
  ["02.04", { top: 340, left: 270 }],
  ["02.05", { top: 280, left: 310 }],
  ["02.06", { top: 220, left: 360 }],

  ["stair2", { top: 395, left: 660 }],
  ["02.21", { top: 550, left: 840 }],
  ["02.22", { top: 550, left: 800 }],
  ["02.C1", { top: 220, left: 650 }],
  ["02.C2", { top: 300, left: 590 }],
  ["02.C3", { top: 500, left: 700 }],
  ["02.C4", { top: 490, left: 800 }],

  ["stair3", { top: 650, left: 510 }],
  ["02.29", { top: 700, left: 700 }],
  ["02.36", { top: 735, left: 345 }],
  ["02.23", { top: 570, left: 800 }],
  ["02.37", { top: 730, left: 380 }],
  ["02.38", { top: 760, left: 375 }],
  ["02.C5", { top: 695, left: 780 }],
  ["02.C6", { top: 650, left: 610 }],
  ["02.C7", { top: 740, left: 620 }],
  ["02.C8", { top: 750, left: 500 }],
  ["02.C9", { top: 740, left: 405 }],
  ["02.C10", { top: 650, left: 400 }],
]);

export function navigationIdToCoords(id: string) {
  return map1.get(id);
}

export function getCorrespondingStair(id: string): string | null {
  const stairs = [
    {
      id: "stair1",
      ids: ["02.01", "02.02", "02.03", "02.04", "02.05", "02.06"],
    },
    {
      id: "stair2",
      ids: ["02.21", "02.22", "02.C1", "02.C2", "02.C3", "02.C4"],
    },
    {
      id: "stair3",
      ids: [
        "02.29",
        "02.36",
        "02.23",
        "02.37",
        "02.38",
        "02.C5",
        "02.C6",
        "02.C7",
        "02.C8",
        "02.C9",
        "02.C10",
      ],
    },
  ];

  for (const stair of stairs) {
    if (stair.ids.includes(id)) {
      return stair.id;
    }
  }

  return null;
}
