//todo: if the parent is a full word, we should show it first 
var dict = new TrieNode();
var words;

$(document).ready(function() {
  $.ajax({
    type: "GET",
    url: "dict/wordsEN.txt",
    dataType: "text",
    success: function(data) {
      processData(data);
    }
  });
});

function processData(allText) {
  words = allText.split('\n');

  words.forEach(function(word) {
    trie.insert(word);
  });

  console.log("Done parsing dictionary");
}

var resultsNode = $('#results');

trie = new TrieNode(null);

var keys = {
  2: ['a', 'b', 'c'],
  3: ['d', 'e', 'f'],
  4: ['g', 'h', 'i'],
  5: ['j', 'k', 'l'],
  6: ['m', 'n', 'o'],
  7: ['p', 'q', 'r', 's'],
  8: ['t', 'u', 'v'],
  9: ['w', 'x', 'y', 'z']
};

var searchArray = []; //key combos
var finalResult = [];

function allPossibleCases(arr) {
  if (arr.length === 0) {
    return [];
  } else if (arr.length === 1) {
    return arr[0];
  } else {
    var result = [];
    var allCasesOfRest = allPossibleCases(arr.slice(1)); // recur with the rest of array
    for (var c in allCasesOfRest) {
      for (var i = 0; i < arr[0].length; i++) {
        result.push(arr[0][i] + allCasesOfRest[c]);
      }
    }
    return result;
  }
}


$('.keyboard').change(function(e) {
  e.target.value.split('').forEach(function(e) {
    if (e in keys) {
      searchArray.push(keys[e]);
    }
  });

  allPossibleCases(searchArray).forEach(function(thisCase) {
    var closest = trie.getClosestFullWords(thisCase);
    if (closest) {
      var thisResult = closest.reduce(function(accum, word) {
        accum.push(word);
        return accum;
      }, []);

      finalResult.push(thisResult);
    }
  });

  //for each subarray of finalResult, select the first word
  finalResult = finalResult.reduce(function(accum, list) {
    accum.push(list[0]);
    return accum;
  }, []);

  finalResult = finalResult.sort(function(a, b) {
    return a.length > b.length;
  });


  $('#results').html('');
  $('#results').append(finalResult.join(', '));
  searchArray = [];
  finalResult = [];
});


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