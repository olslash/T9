//todo: if the parent is a full word, we should show it first 
trie = new TrieNode(null);

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
    var allCasesOfRest = allPossibleCases(arr.slice(1)); 
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
