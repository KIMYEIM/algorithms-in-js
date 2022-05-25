let fs = require('fs');
let input = fs.readFileSync('../inputs/1916.txt').toString().split('\n');

const N = Number(input[0]);
const M = Number(input[1]);

const visited = new Array(N + 1).fill(false);
const distance = new Array(N + 1).fill(0);
const edges = Array.from(Array(N + 1), () => new Array(N + 1).fill(Infinity));

const [start, end] = input[M + 2].split(' ');

for (let i = 2; i < M + 2; i++) {
  const [s, d, c] = input[i].split(' ');
  edges[s][d] = Math.min(Number(c), edges[s][d]); // 다른 비용을 갖는 같은 노선이 주어졌을 때 최소값으로 저장한다
}

const getMinDistNode = () => {
  let min = Infinity;
  let idx = 0;
  for (let i = 1; i <= N; i++) {
    if (distance[i] < min && !visited[i]) {
      min = distance[i];
      idx = i;
    }
  }
  return idx;
};

const dijkstra = (start) => {
  for (let i = 1; i <= N; i++) {
    distance[i] = edges[start][i];
  }
  visited[start] = true;
  for (let i = 1; i < N - 1; i++) {
    const curr = getMinDistNode();
    visited[curr] = true;
    for (let j = 1; j <= N; j++) {
      if (!visited[j]) {
        distance[j] = Math.min(distance[j], distance[curr] + edges[curr][j]);
      }
    }
  }
};

dijkstra(start);
console.log(distance[end]);
