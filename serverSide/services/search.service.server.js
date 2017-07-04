/**
 * Created by Amardeep on 02/07/17.
 */
module.exports = function (app) {
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var stemmer = require('porter-stemmer').stemmer;

    app.get("/api/pre", readTextFile);
    app.post("/api/search", search)

    function PriorityQueue() {
        this.data = []
    }

    PriorityQueue.prototype.push = function (element, priority) {
        priority = +priority
        for (var i = 0; i < this.data.length && this.data[i][1] > priority; i++);
        this.data.splice(i, 0, [element, priority])
    }

    PriorityQueue.prototype.pop = function () {
        return this.data.shift()[0]
    }

    PriorityQueue.prototype.size = function () {
        return this.data.length
    }
    function readTextFile(req, res) {
        var request = require('request-promise');
        //change this link to directly downloaded file to the data set.
        request.get('https://drive.google.com/uc?export=download&id=0B71CDXE-aD6gTS10R2ZvLWpJUVk')
            .then(function (body) {
                var csv = body;
                parseTweets(csv);
                res.send(200);
            });
    }


    function parseTweets(text) {
        var tweets = text.split("\n");
        var id = 0;
        //idMapping-mapping of the tweets and its unique ID.
        //wordToTweetIdMapping-key-word value-tweetID,termFreq.
        //totalCount-keeps the length of each document alongside it's id.
        idMapping = new Map();
        wordToTweetIdMapping = new Map();
        totalCount = new Map();
        for (var i = 2; i < tweets.length; i++) {
            // var temp = tweets[i].split("\t");
            //As size of the tweets is limited to 140 chars.
            var temp = tweets[i];
            //163 is the length of the timestamp + tweet
            while (temp.length < 163) {
                temp = temp + " " + tweets[i + 1];
                i++;
            }
            var result = temp.replace(/.{141}\S*\s+/g, "$&~").split(/\s+~/);
            //unique id for tweet
            id++;

            //Stripping away the timestamp
            var actualTweet = result[0].substring(20);
            idMapping.set(id, actualTweet);

            //split the tweet into words to keep account of which word is in which
            //tweet along with its term frequency. This is similar to what elasticsearch
            //does while indexing.
            var words = actualTweet.split(" ");
            //this is will enable the search of tweets by a user with @
            words.push("@" + result[1]);
            totalCount.set(id, words.length);
            for (var j in words) {
                //using Porter stemmer for stemming the words
                var word = stemmer(words[j].toLowerCase().trim().replace(/[.,\/!$%\^&\*;:{}=\-_`~()]/g, ""));
                var tempMap = new Map();
                if (!wordToTweetIdMapping.has(word)) {
                    tempMap.set(id, 1);
                    wordToTweetIdMapping.set(word, tempMap);
                }
                else {
                    tempMap = wordToTweetIdMapping.get(word);
                    if (!wordToTweetIdMapping.get(word).has(id)) {
                        tempMap.set(id, 1);
                    }
                    else {
                        //if same word is there in a tweet more than once.
                        var a = wordToTweetIdMapping.get(word).get(id) + 1;
                        tempMap.set(id, a);
                    }
                    wordToTweetIdMapping.set(word, tempMap);
                }
            }
        }
        totalnumberofTweets = idMapping.size;
    }

//using the TF-IDF to order the tweets in relevant order.
    function search(req, res) {
        tfMap = new Map();
        searchWords = req.body.searchWord;
        searchWords = searchWords.split(" ");
        var iDF = 0;
        for (var i in searchWords) {
            if (wordToTweetIdMapping.has(stemmer(searchWords[i].toLowerCase()))) {
                iDF = Math.log(totalnumberofTweets / wordToTweetIdMapping.get(stemmer(searchWords[i].toLowerCase())).size);
                var map = wordToTweetIdMapping.get((stemmer(searchWords[i].toLowerCase())));
                for (var w of map.keys()) {
                    //term Freq
                    var tf = iDF * (map.get(w) / totalCount.get(w));
                    if (tfMap.has(w)) {
                        tf = tf + tfMap.get(w);
                    }
                    tfMap.set(w, tf);
                }
            }
            else continue;
        }
        //sort in descending order of TF
        var sortedMap = new PriorityQueue();
        for (var t of tfMap.keys()) {
            //console.log(t);
            sortedMap.push(t, tfMap.get(t));
        }
        var finalSearedTweets = [];
        while (sortedMap.size()) {
            finalSearedTweets.push(idMapping.get(sortedMap.pop()));
        }
        return res.send(finalSearedTweets);
    }
}