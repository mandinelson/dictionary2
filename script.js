var app = new Vue({
  el: "#app",
  data: {
    word: "hired",
    title: "Dictionary",
    response: null,
  },
  methods: {
    lookup: function(){
      //this.response = null
      fetch(`https://wordsapiv1.p.rapidapi.com/words/${this.word}`, {
         headers: {
           "X-Mashape-Key": "8e6f8fc299msh13e8d23b8f55198p162977jsn81718b8a04fb"
         }
      })
        .then(function(response) {
        return response.json();
      })
        .then(function(myJson) {
        app.response = myJson
      });
    },
    synonymLookup: function(synonym){
      this.word = synonym
      this.lookup()
    },
    isOneWord: function(synonym){
      return synonym.split(" ").length == 1
    },
  },
  computed: {
    syllables: function(){
      return this.response == null ? [] : this.response.syllables.list.join("•")
    },
    pronunciation: function(){
      return this.response == null ? [] : `/${this.response.pronunciation.all}/`
    },
    nouns: function(){
      return this.response == null ? [] :    this.response.results.filter(function(result){
        return result.partOfSpeech == 'noun'
      })
    },
    verbs: function(){
      return this.response == null ? [] :    this.response.results.filter(function(result){
        return result.partOfSpeech == 'verb'
      })
    },
    adjectives: function(){
      return this.response == null ? [] :    this.response.results.filter(function(result){
        return result.partOfSpeech == 'adjective'
      })
    }
  }
})