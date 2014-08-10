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
  var nodeToAddWord = traverseAddingNodes(this);
  insertWordIntoListByFrequency(nodeToAddWord.words, word, useFrequency);

  function traverseAddingNodes(node) {
    var i = 0, len = word.length;
    for(i, len; i < len; i++) {
      var thisLetter = word[i];
      var thisKey = keys[thisLetter];
      if(node.children.hasOwnProperty(thisKey)) {
        node = node.children[thisKey];
      } else { break; }
    }
    
    // if i is still less than len when we reach this point, continue, adding
    // nodes as we go.
    for(i, len; i < len; i++) {
      thisLetter = word[i];
      thisKey = keys[thisLetter];
      node.children[thisKey] = new Trie();
      node = node.children[thisKey];
    }

    return node;
  }

  function insertWordIntoListByFrequency(list, word, useFrequency) {
    var wordToInsert = [word, useFrequency];
    var wordsLength = list.length;
    if(wordsLength === 0) {
      //handle case where this node has no words yet
      list.push(wordToInsert);
    } else {
      // otherwise, find where to insert based on useFrequency
      for(var i = 0; i < wordsLength; i++) {
        var comparedFrequency = list[i][1];
        var insertFrequency = wordToInsert[1];

        if(insertFrequency >= comparedFrequency) {
          // if i see a word with lower useFrequency than me, insert before it.
          list.splice(i, 0, wordToInsert);
          return;
        }
      }
      // if i've reached here, i've looked at the last letter and i'm less than it,
      // so put me at the end of the list.
      list.splice(i + 1, 0, wordToInsert);
    }
  }
};

Trie.prototype.getSuggestions = function(keyString, results, suggestionDepth) {
    // if suggestionDeth is >0 we should traverse down that many levels and 
    // suggest longer words.
    

};
