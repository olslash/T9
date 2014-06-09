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

$('.keyboard').change(function(e){
  console.log(e.target.value);
  console.log(trie.getClosestFullWords(e.target.value, 3));
});

// groups of 3 letters per key
// if I press 1 (a,b,c):
// getClosestFullWords(oldword + a)
// getClosestFullWords(oldword + b)
// getClosestFullWords(oldword + c)

//keep a good result from each

// var nodeDia = 50;

// var svg = d3.select('body')
//   .append('svg')
//   .attr('width', 100)
//   .attr('height', 1000);

// var nodes = svg.selectAll('circle')
//   .data(words)
//   .enter()
//   .append('circle');

// nodes.attr({
//   'cy': function(_, i) {
//     return (i * 50) + 25;
//   },
//   cx: nodeDia / 2,
//   r: function(d) {
//     return d.length * 2;
//   },
//   fill: 'lightgrey',
//   stroke: 'orange',
//   'stroke-width': 2
// });

// var lines = svg.selectAll('line')
//   .data(words)
//   .enter()
//   .append('line');
// lines.attr({
//   x1:,
//   x2: ,
//   y1: ,
//   y2: 
// });

// svg.selectAll('text')
//   .data(words)
//   .enter()
//   .append('text')
//   .text(function(d) {
//     return d;
//   })
//   .attr({
//     x: 50,
//     y: function(_, i) {
//       return (i * 50) + 25;
//     }
//   });
// .attr('cy', nodeDia / 2)
// .attr('r', function(d) {
//   return d.length * 2;
// })
// .attr('fill', 'lightgrey')
// .attr('stroke', 'orange')
// .attr('stroke-width', 2);