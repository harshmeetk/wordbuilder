/**
 * Created by Amardeep on 02/07/17.
 */
(function () {
    angular
        .module("TwitterSearch")
        .controller("WController", WController)

    function WController($location,SearchService) {
        var vm = this;
        vm.startSearch = startSearch;
        //This creates the index of the data to enable search
        function startSearch() {
            //slick loading animation
            $('#loader').show();
            SearchService.startSearch()
                .success(function (result) {
                    $location.url("/search");
                })
                .error(function (error) {
                    console.log("Error in WelcomeController");
                })
        }
    }
})();
