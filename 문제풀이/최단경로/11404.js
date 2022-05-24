let fs = require('fs');
let input = fs.readFileSync('./inputs/11404.txt').toString().split('\n');

const n = Number(input[0]);
const m = Number(input[1]);

const edges = Array.from(Array(n + 1), () => new Array(n + 1).fill(Infinity));
const dist = Array.from(Array(n + 1), () => new Array(n + 1).fill(Infinity));

for (let i = 2; i < m + 2; i++) {
  const [a, b, c] = input[i].split(' ');
  edges[a][b] = Math.min(edges[a][b], Number(c));
  dist[a][b] = Math.min(dist[a][b], Number(c));
}

const floydWarshall = () => {
  for (let k = 1; k <= n; k++) {
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= n; j++) {
        dist[i][j] = Math.min(dist[i][k] + dist[k][j], dist[i][j]);
      }
    }
  }
};

floydWarshall();

for (let i = 1; i <= n; i++) {
  dist[i][i] = 0;
  let temp = [];
  for (let j = 1; j <= n; j++) {
    if (dist[i][j] === Infinity) temp.push(0);
    else temp.push(dist[i][j]);
  }
  console.log(temp.join(' '));
}
