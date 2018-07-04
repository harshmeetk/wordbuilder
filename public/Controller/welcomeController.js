/**
 * Created by Amardeep on 02/07/17.
 */
(function () {
    angular
        .module("TwitterSearch")
        .controller("WController", WController)

    function WController($location,SearchService) {
        var vm = this;
        vm.checkConnection = checkConnection;

        function init() {
            
        }
        init();
        function checkConnection() {
            SearchService.checkConnection()
                .success(function (result) {
                    console.log(result);
                    console.log("Done");
                })
                .error(function (err) {
                    console.log(err);
                })
        }
    }
})();
