// Mitch Robb
// 6/8/14

var TrieNode = function(letter) {
    this.letter = letter;
    this.children = {}; // {char: TrieNode}
    this.parent = null;
    this.fullword = false;
};

TrieNode.prototype.insert = function(word) {
    var root = this;
    var c = 0; // current character
    var thisChar;

    while (c < word.length) {
        thisChar = word.charAt(c);

        if (root.children[thisChar]) { // if there's a node for the char
            root = root.children[thisChar];
            c++;
        } else {
            break; // the point where we no longer have prefix nodes
        }
    }

    //start adding nodes for successive characters
    while (c < word.length) {
        thisChar = word.charAt(c);

        root.children[thisChar] = new TrieNode(thisChar);
        root.children[thisChar].parent = root; 

        root = root.children[thisChar];
        c++;
    }
    
    //flag fullword on the last character
    root.fullword = true;
};

TrieNode.prototype.find = function(word, full) {
    var root = this;

    for (var c = 0, len = word.length; c < len; c++) {
        if (!root.children[word.charAt(c)]) {
            return false;
        } else {
            root = root.children[word.charAt(c)];
        }
    }

    return full ? root.fullword : true;
};

TrieNode.prototype.getClosestFullWords = function(partialWord, numResults) {
    var root = this;
    numResults = numResults || Infinity;

    for (var c = 0, len = partialWord.length; c < len; c++) {
        if (!root.children[partialWord.charAt(c)]) {
            return false;
        } else {
            root = root.children[partialWord.charAt(c)];
        }
    }

    // root is starting point, now dig for full words
    // with a breadth-first traversal of tree

    var closestFull = [];
    var queue = [];

    queue.push(root);

    while(queue.length > 0 && closestFull.length < numResults) {
        var node = queue.shift();

        if(node.fullword){
            // this node is the end of a full word. 
            // traverse back up to build the word
            var word = [];
            var endNode = node;

            while(endNode.letter) {
                word.unshift(endNode.letter);
                endNode = endNode.parent;
            }

            closestFull.push(word.join(''));
        }

        for(var char in node.children) {
            queue.push(node.children[char]);    
        }
    }
    
    return closestFull;
};