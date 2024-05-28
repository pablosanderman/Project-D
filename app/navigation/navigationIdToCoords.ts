const map1 = new Map([
  ["02.01", "TEST VALUE"],
  ["02.02", "TEST VALUE"],
]);

export function navigationIdToCoords(id: string) {
  return map1.get(id);
}
