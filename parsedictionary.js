$(document).ready(function() {
  window.dict = new TrieNode(null);

  $.ajax({
    type: "GET",
    url: "dict/wordsEN.txt",
    dataType: "text",
    success: function(data) {
      processData(data);
    }
  });

  function processData(allText) {
    words = allText.split('\n');

    words.forEach(function(word) {
      dict.insert(word);
    });

    console.log("Done parsing dictionary");
  }
});