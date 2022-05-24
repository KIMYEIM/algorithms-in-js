let fs = require('fs');
let input = fs.readFileSync('./inputs/11657.txt').toString().split('\n');

const [n, m] = input[0].split(' ').map(Number);

const edges = [];
const dist = new Array(n + 1).fill(Infinity);

for (let i = 1; i < m + 1; i++) {
  const [a, b, c] = input[i].split(' ').map(Number);
  edges.push([a, b, c]);
}

const bellmanFord = (start) => {
  dist[start] = 0;
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < edges.length; j++) {
      const currNode = edges[j][0];
      const nextNode = edges[j][1];
      const cost = edges[j][2];
      if (
        dist[currNode] !== Infinity &&
        dist[nextNode] > dist[currNode] + cost
      ) {
        dist[nextNode] = dist[currNode] + cost;
        if (i === n) return true;
      }
    }
  }
  return false;
};

const cycle = bellmanFord(1);

if (cycle) console.log(-1);
else {
  for (let i = 2; i <= n; i++) {
    if (dist[i] === Infinity) console.log(-1);
    else console.log(dist[i]);
  }
}
