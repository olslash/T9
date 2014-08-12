(function() {
  var keyboard = document.getElementById('keyboard');
  var resultsDiv = document.getElementById('results');
  keyboard.addEventListener('input', function(e) {
    // console.log(e.target.value);
    resultsDiv.innerHTML = dict.getSuggestions(e.target.value, 2);
  });  

})();
