let fs = require('fs');
let input = fs
  .readFileSync('문제풀이/inputs/1991.txt')
  .toString()
  .trim()
  .split('\n');

const N = Number(input[0]);

const tree = {};

for (let i = 1; i <= N; i++) {
  const [curr, left, right] = input[i].split(' ');
  tree[curr] = { left, right };
}

const preAns = [];
const inAns = [];
const postAns = [];

const preOrder = (node = 'A') => {
  preAns.push(node);
  if (tree[node].left && tree[node].left !== '.') preOrder(tree[node].left);
  if (tree[node].right && tree[node].right !== '.') preOrder(tree[node].right);
};

const inOrder = (node = 'A') => {
  if (tree[node].left && tree[node].left !== '.') inOrder(tree[node].left);
  inAns.push(node);
  if (tree[node].right && tree[node].right !== '.') inOrder(tree[node].right);
};

const postOrder = (node = 'A') => {
  if (tree[node].left && tree[node].left !== '.') postOrder(tree[node].left);
  if (tree[node].right && tree[node].right !== '.') postOrder(tree[node].right);
  postAns.push(node);
};

preOrder();
inOrder();
postOrder();

console.log(preAns.join('') + '\n' + inAns.join('') + '\n' + postAns.join(''));
