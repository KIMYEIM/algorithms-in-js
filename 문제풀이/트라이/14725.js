let fs = require('fs');
let input = fs.readFileSync('../inputs/14725.txt').toString().split('\n');

const N = Number(input[0]);

const Trie = new Map();

const findAndSave = (depth, array, Trie, idx) => {
  if (idx === depth) return;

  const currFood = array[idx];
  if (Trie.has(currFood)) {
    findAndSave(depth, array, Trie.get(currFood), idx + 1);
  } else {
    Trie.set(currFood, new Map());
    findAndSave(depth, array, Trie.get(currFood), idx + 1);
  }
};

for (let i = 1; i < N + 1; i++) {
  const splitted = input[i].split(' ');
  const K = Number(splitted.shift());
  findAndSave(K, splitted, Trie, 0);
}

const printTrie = (map, depth = 0) => {
  const temp = Array.from(map).sort();
  for (let [key, value] of temp) {
    console.log('--'.repeat(depth) + key);
    if (!value.size) continue;
    else printTrie(value, depth + 1);
  }
};

printTrie(Trie);
