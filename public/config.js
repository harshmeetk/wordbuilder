/**
 * Created by Amardeep
 */
//iffy statement to protect the namespace
(function() {
    angular
        .module("TwitterSearch")
        .config(Config);
    function Config($routeProvider) {
        $routeProvider
            .when("/welcome", {
                templateUrl: "views/welcome.view.client.html",
                controller:"WController",
                controllerAs :"model"
            })
            .when("/search", {
                templateUrl: "views/search.view.client.html",
                controller:"searchController",
                controllerAs :"model"
            })
            .otherwise({
                redirectTo: "/welcome"
            })

    }
})();
