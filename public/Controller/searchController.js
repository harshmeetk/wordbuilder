/**
 * Created by Amardeep on 02/07/17.
 */
(function () {
    angular
        .module("TwitterSearch")
        .controller("searchController", searchController);

    function searchController(SearchService, $sce) {
        var vm = this;
        vm.search = search;
        function search(wordsToSearch) {
            vm.tweets = [];
            //Use of promises here.
            SearchService.search(wordsToSearch)
                .success(function (tweets) {
                    if (tweets.length > 0) {
                        vm.error = undefined;
                        for (var tweet in tweets) {
                            var temp = tweets[tweet].split(" ");
                            var result = "";
                            //Creating Dynamic hyperlinks for Hashtags and Mentions
                            for (var t of temp) {
                                if (t.startsWith("@") || t.startsWith("#")) {
                                    t = '<a id=' + t + ' onclick=tempFunction("'+t+'")>' + t + '</a>';
                                }
                                result = result + " " + t;
                            }
                            //using Angular to make it a trusted HTML for injection.
                            tweets[tweet] = $sce.trustAsHtml(result.substring(1));
                        }
                        vm.tweets = tweets;
                    }
                    //No results found
                    else {
                        vm.error = "No Results found :(";
                    }
                })
                .error(function (error) {
                    console.log("error in searchController");
                })
        }
    }
})();
