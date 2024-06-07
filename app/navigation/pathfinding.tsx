type Coordinates = { top: number; left: number };
type Edge = { node: string; weight: number };

const map1 = new Map<string, Coordinates>([
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

function calculateDistance(point1: Coordinates, point2: Coordinates): number {
  return Math.sqrt(
    Math.pow(point1.top - point2.top, 2) +
      Math.pow(point1.left - point2.left, 2),
  );
}

const graph = new Map<string, Edge[]>();

map1.forEach((coords1, id1) => {
  graph.set(id1, []);
  map1.forEach((coords2, id2) => {
    if (id1 !== id2) {
      const distance = calculateDistance(coords1, coords2);
      graph.get(id1)?.push({ node: id2, weight: distance });
    }
  });
});

export function dijkstra(start: string, end: string): string[] | null {
  const distances = new Map<string, number>();
  const previousNodes = new Map<string, string | null>();
  const queue = new Set<string>();

  map1.forEach((_, id) => {
    distances.set(id, Infinity);
    previousNodes.set(id, null);
    queue.add(id);
  });

  distances.set(start, 0);

  while (queue.size > 0) {
    let minNode: string | null = null;
    queue.forEach((node) => {
      if (
        minNode === null ||
        (distances.get(node) ?? Infinity) < (distances.get(minNode) ?? Infinity)
      ) {
        minNode = node;
      }
    });

    if (minNode === end) break;

    queue.delete(minNode);
    const edges = graph.get(minNode);
    if (edges) {
      edges.forEach((neighbor) => {
        const alt = (distances.get(minNode) ?? Infinity) + neighbor.weight;
        if (alt < (distances.get(neighbor.node) ?? Infinity)) {
          distances.set(neighbor.node, alt);
          previousNodes.set(neighbor.node, minNode);
        }
      });
    }
  }

  const path: string[] = [];
  let currentNode: string | null = end;
  while (currentNode) {
    path.unshift(currentNode);
    currentNode = previousNodes.get(currentNode);
  }

  return path.length > 1 ? path : null;
}

const start = "stair1";
const end = "02.D2";
const shortestPath = dijkstra(start, end);
