let fs = require('fs');
let input = fs
  .readFileSync('문제풀이/inputs/11725.txt')
  .toString()
  .trim()
  .split('\n');

const N = Number(input[0]);

const Tree = Array.from({ length: N + 1 }, () => []);
const Parent = Array(N + 1).fill(0);

for (let i = 1; i < N; i++) {
  const [left, right] = input[i].split(' ').map(Number);
  Tree[left].push(right);
  Tree[right].push(left);
}

const dfs = (node = 1) => {
  for (let n of Tree[node]) {
    if (n === 1) continue;
    if (Parent[n]) continue;
    Parent[n] = node;
    dfs(n);
  }
  return;
};

dfs();

console.log(Parent.slice(2).join('\n'));
