/* global refinedTrie, describe, it, expect, should */

describe('Trie', function () {
  'use strict';

  describe('Trie()', function() {
    var t;
    beforeEach(function() {
      t = new Trie();
    });

    it('exists, with children and fullword properties', function () {
      expect(Trie).to.be.a('function');
      expect(t.words).to.be.instanceof(Array);
      expect(t.children).to.be.an('object');
    });
  });

  describe('insertion and retrieval', function() {
    var t;
    beforeEach(function() {
      t = new Trie();

      t.insert('appox', 10000);
      t.insert('c', 300);
      t.insert('apb', 100);
      t.insert('ap', 100);
      t.insert('appo', 20000);
      t.insert('appoz', 20000);
      t.insert('a', 500);
      t.insert('b', 100);
      t.insert('appa', 10000);
      t.insert('c', 700);
      t.insert('appoy', 1000);
      t.insert('c', 200);
      t.insert('appow', 2000);
      t.insert('apq', 300);
      t.insert('app', 100);
    });


    it('should insert words into the tree', function() {
      expect(t.words.length).to.eql(0);
      expect(t.children['2'].words.length).to.eql(5);
      expect(t.children['2'].children['7'].children['2']
        .words[0]).to.eql(['apb', 100]);
      expect(t.children['2'].children['7'].children['7']
        .words[0]).to.eql(['apq', 300]);
      expect(t.children['2'].children['7'].children['7'].children['6']
        .words[0]).to.eql(['appo', 20000]);
    });

    it('should order words descending by their frequency value', 
      function() {
      expect(t.children['2'].words[0][1]).to.eql(700);
      expect(t.children['2'].words[1][1]).to.eql(500);
      expect(t.children['2'].words[2][1]).to.eql(300);
      expect(t.children['2'].words[3][1]).to.eql(200);
      expect(t.children['2'].words[4][1]).to.eql(100);
      expect(t.children['2'].children['7'].children['7'].words[0])
        .to.eql(['apq', 300]);
      expect(t.children['2'].children['7'].children['7'].words[1])
        .to.eql(['app', 100]);
    });

    xit('should not create duplicate entries for words', function() {
      // todo
      t.insert('a', 750);
      t.insert('app', 100);
      t.insert('app', 1000);

      expect(t.children['2'].words[0]).not.to.eql(['a', 750]);
      expect(t.children['2'].words.length).to.eql(5);
      expect(t.children['2'].children['7'].children['7'].words.length).to.eql(2);
    });
    
    it('should suggest words at various depths`', function() {     
      expect(t.getSuggestions('272')).to.eql(['apb']);
      expect(t.getSuggestions('277')).to.eql(['apq', 'app']);
      expect(t.getSuggestions('277', 1)).to.eql(['apq', 'app', 'appo', 'appa']);
      expect(t.getSuggestions('277', 2)).to.eql(['apq', 'app', 'appo', 'appa', 'appoz', 'appox', 'appow', 'appoy']);
      expect(t.getSuggestions('2776')).to.eql(['appo']);
    });

    xit('should not throw errors if there is no existing path', function() {
      expect(t.getSuggestions('22222')).to.eql([]);
      // right now it's giving a bunch of earlier ones?
    });

    it('should automatically dig to build results if there are no matches', function() {
      t.insert('approximately', 1);
      expect(t.getSuggestions('2777', 2)).to.eql(['approximately']);
    });
  });
});
