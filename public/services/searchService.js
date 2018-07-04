/**
 * Created by Amardeep on 02/07/17.
 */
(function () {
    angular
        .module("TwitterSearch")
        .factory("SearchService",SearchService);

    function SearchService($http) {
        var api={
            checkConnection: checkConnection
        };
        return api;
        function checkConnection() {
            return $http.get("/api/checkConnection");
        }
    }
})();
