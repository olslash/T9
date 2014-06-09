// I input some letters (a partial word)
// program outputs the first <=3 words below my partial

// populate a prefix tree

var dict = new TrieNode();
var words = ['an', 'ant', 'all', 'alex', 'along', 'aloof', 'animal', 'animate',
  'allot', 'alloy', 'aloe', 'align', 'alight', 'and',
  'are', 'ate', 'bare', 'be', 'bear', 'bee', 'beard', 'berry', 'being'
];

trie = new TrieNode(null);

words.forEach(function(word) {
  trie.insert(word);
});

// groups of 3 letters per key
// if I press 1 (a,b,c):
// getClosestFullWords(oldword + a)
// getClosestFullWords(oldword + b)
// getClosestFullWords(oldword + c)

//keep a good result from each