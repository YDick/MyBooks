var app = angular.module("app", ["ngRoute"]);

app.run(function () { });

app.config([
    "$routeProvider",
    function ($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "views/login.html",
                controller: "login",
            })
            .when("/list", {
                templateUrl: "views/list.html",
                controller: "list",
            })
            // else 404
            .otherwise({
                redirectTo: "/login",
            });
    },
]);

app.controller("login", function ($scope, $location) {
    console.log("Welcome to login");

    $scope.loginSubmit = () => {
        $location.path('/list');
    };
});

app.controller("list", function ($scope, ApiService) {
    $scope.books = [];
    $scope.searchTerm = '';

    $scope.search = () => {
        $scope.books = ApiService.getSpoofBooks($scope.searchTerm);
    }

    ApiService.getBooks();
});


app.factory('ApiService', function ($http) {
    var service = {};
    var index = 0;

    service.getBooks = (searchTerm) => {

        var config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization"
            }
        };

        $http.get("https://www.googleapis.com/books/v1/volumes?q=" + searchTerm + "&startIndex=" + index + "&maxResults=5",
            config
        ).then(
            function success(data) {
                console.log('data', data)
                return data;
            }
        ).catch(function (error) {
            console.log('sadf', error)
        });
    }

    service.getSpoofBooks = () => {
        const books = [
            {
                id: "1",
                isbn: "9780451463893",
                title: "Flowers",
                author: "Vijaya Khisty Bodach",
            },
            {
                id: "2",
                isbn: "9780743273565",
                title: "The Great Gatsby",
                author: "F. Scott Fitzgerald",
            },
            {
                id: "3",
                isbn: "9780061120084",
                title: "To Kill a Mockingbird",
                author: "Harper Lee",
            },
            {
                id: "4",
                isbn: "9780451524930",
                title: "1984",
                author: "George Orwell",
            },
            {
                id: "5",
                isbn: "9780316769174",
                title: "The Catcher in the Rye",
                author: "J.D. Salinger",
            },
            {
                id: "6",
                isbn: "9780141439518",
                title: "Pride and Prejudice",
                author: "Jane Austen",
            },
            {
                id: "7",
                isbn: "9780345538376",
                title: "The Hobbit",
                author: "J.R.R. Tolkien",
            },
            {
                id: "8",
                isbn: "9780062315007",
                title: "The Alchemist",
                author: "Paulo Coelho",
            },
            {
                id: "9",
                isbn: "9780544003415",
                title: "The Lord of the Rings",
                author: "J.R.R. Tolkien",
            },
            {
                id: "10",
                isbn: "9780486264731",
                title: "Moby-Dick",
                author: "Herman Melville",
            }
        ];

        return books;
    }

    return service;
})


