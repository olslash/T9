(function() {
  window.dict = new Trie();

  // $.ajax({
  //   type: "GET",
  //   url: "dict/freq_Dictionary.txt",
  //   dataType: "text",
  //   success: function(data) {
  //     processData(data);
  //   }
  // });
  var r = new XMLHttpRequest(); 

  r.open("GET", "dict/freq_Dictionary.txt", true);
  
  r.onload = function () {
    if (r.readyState != 4 || r.status != 200) {
      console.log('Error loading dictionary!');
    }
    console.log('Loaded dictionary.');
    processData(r.responseText);
  };
  r.send();

  function processData(allText) {
    lines = allText.split('\n');

    lines.forEach(function(word) {
      word = word.split('\t');
      if(word[1] !== '' && Number(word[0]) > 0) {
        window.dict.insert(word[1], Number(word[0]));
      }
    });
    
    console.log("Done parsing dictionary");
  }
})();