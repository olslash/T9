var keys = {
  'a': 2, 'b': 2, 'c': 2,
  'd': 3, 'e': 3, 'f': 3,
  'g': 4, 'h': 4, 'i': 4,
  'j': 5, 'k': 5, 'l': 5,
  'm': 6, 'n': 6, 'o': 6,
  'p': 7, 'q': 7, 'r': 7, 's': 7,
  't': 8, 'u': 8, 'v': 8,
  'w': 9, 'x': 9, 'y': 9, 'z': 9
};

var Trie = function() {
  this.children = {}; // {char: Trie}
  this.words = [];
};

Trie.prototype.insert = function(word, useFrequency) {
  // Traverse the tree to the node where the word should be inserted. If any
  // needed nodes do not exist along the way, they are created.
  var nodeToAddWord = traverseAddingNodes(this);

  // Insert the word into the wordlist of the node returned above. Use the
  // data provided (frequency of use in English text) to place the word in the 
  // correct position, so that we can recommend more common words first.
  insertWordIntoListByFrequency(nodeToAddWord.words, word, useFrequency);

  function traverseAddingNodes(node) {
    var i = 0, len = word.length;
    // Traverse the tree's existing nodes as far as possible.
    for(i, len; i < len; i++) {
      var thisLetter = word[i];
      var thisKey = keys[thisLetter];

      if(node.children.hasOwnProperty(thisKey)) {
        node = node.children[thisKey];
      } else { break; }
    }
    
    // If we reach this point and we still aren't at the node we want, it means
    // that other words matching this key pattern haven't been inserted before.
    // Continue, this time adding the required nodes as we go.
    for(i, len; i < len; i++) {
      thisLetter = word[i];
      thisKey = keys[thisLetter];
      node.children[thisKey] = new Trie();
      node = node.children[thisKey];
    }

    return node;
  }

  function insertWordIntoListByFrequency(list, word, useFrequency) {
    var wordToInsert = [word, useFrequency]; // Store word in a tuple.
    var wordsLength = list.length;

    if(wordsLength === 0) {
      // Handle the case where this node has no words yet
      list.push(wordToInsert);
    } else {
      // Find where to insert this word among others, based on its 
      // frequency property.
      for(var i = 0; i < wordsLength; i++) {
        var comparedFrequency = list[i][1];
        var insertFrequency = wordToInsert[1];

        if(insertFrequency >= comparedFrequency) {
          // If i see a word with lower useFrequency than mine, insert before it.
          list.splice(i, 0, wordToInsert);
          return;
        }
      }
      // if we've reached here, we've looked at the last word on this node and 
      // our word's frequency is less than it. 
      // Put my word at the end of the list.
      list.splice(i + 1, 0, wordToInsert);
    }
  }
};

Trie.prototype.getSuggestions = function(keyString, suggestionDepth) {  
  // Traverse the tree based on the key digits in keyString, to find the node
  // where relevant words are stored.
  var result = [];
  var node = this;

  for(var i = 0; i < keyString.length; i++) {
    var thisKey = keyString[i];
    node = node.children[thisKey];
  }

  // Add all the words to the result.
  result = result.concat(node.words.map(function(wordTuple) {
    return wordTuple[0];
  }));

  // If suggestionDeth is >0, the caller is asking for recommendations of 
  // words longer than the number of keys pressed. 
  return suggestionDepth > 0 ?
    result.concat(getDeeperSuggestions(node, suggestionDepth)) :
    result;

  function getDeeperSuggestions(root, maxDepth) {
    // We traverse down every possible branch from the result node (the node 
    // corresponding to the keypad entry), saving words we see as we go and 
    // stopping when we reach the specified depth.
    
    // deepSuggestions is an array with (maxDepth) subarrays.
    // Each of the subarrays will be one depth level's suggestions.
    var deepSuggestions = [];
    while(deepSuggestions.length < maxDepth) {
      deepSuggestions.push([]);
    }

    // The traverse function (below) fills deepSuggestions with results.
    traverse(root, 0);

    // Each level is sorted individually, because we want shallower results to 
    // always be suggested first.
    deepSuggestions = deepSuggestions.map(function(level) {
      return level.sort(function(a, b) {
        return b[1] - a[1];
      });
    });

    // At this point, deepSuggestions is an array of arrays (one for each level 
    // of depth). Each of those subarrays contains word tuples.
    return deepSuggestions.reduce(function(result, level) {
      // Merge each level into a single flat array.
      return result.concat(level.map(function(wordTuple) {
        // Keep only the word itself, discarding the frequency number
        return wordTuple[0];
      }));
    }, []);
      
    function traverse(root, depth) {
      // Basic tree traversal, collecting results up to the required depth.
      if(depth <= maxDepth && depth !== 0) { // Result already contains depth 0
        var d = depth - 1;
        deepSuggestions[d] = deepSuggestions[d].concat(root.words);
      }
      
      if(depth === maxDepth) { return; }

      for(var childKey in root.children) {
        traverse(root.children[childKey], depth + 1);
      }
    }    
  }
};
