/**
 * Created by Amardeep on 02/07/17.
 */
(function () {
    angular
        .module("TwitterSearch")
        .factory("SearchService",SearchService);

    function SearchService($http) {
        var api={
            startSearch:startSearch,
            search:search
        };
        return api;
        function startSearch() {
            return $http.get("/api/pre");
        }
        function search(wordsToSearch) {
            return $http.post("/api/search",wordsToSearch);
        }
    }
})();
