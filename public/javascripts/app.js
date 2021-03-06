var app = angular.module("flapperNews", ["ui.router"]);

app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state("home", {
			url: "/home",
			templateUrl: "/home.html",
			controller: "MainCtrl"
		})
		.state("posts", {
			url: "/posts/{id}",
			templateUrl: "/posts.html",
			controller: "PostsCtrl"
		});

	$urlRouterProvider.otherwise("home");
}]);

app.factory("posts", [function() {
	var o = {
		posts: []
	}
	return o;
}]);

app.controller("MainCtrl", ["$scope", "posts", function($scope, posts) {
	$scope.posts = posts.posts;

	$scope.addPost = function() {
		$scope.posts.push({
			title: $scope.title,
			link: $scope.link,
			upvotes: 0,
			comments: [
				{author: "Joe", body: "Cool post!", upvotes: 0},
				{author: "Black", body: "I'm the death!", upvotes: 0}
			]
		});
		$scope.title = "";
		$scope.link = "";
	};

	$scope.incUpvotes = function(post) {
		post.upvotes++;
	}
}]);

app.controller("PostsCtrl", ["$scope", "$stateParams", "posts", function($scope, $stateParams, posts) {
	$scope.post = posts.posts[$stateParams.id];

	$scope.addComment = function() {
		$scope.post.comments.push({
			body: $scope.body,
			author: $scope.author,
			upvotes: 0
		});
		$scope.author = "";
		$scope.body = "";
	}

	$scope.incUpvotes = function(comment) {
		comment.upvotes++;
	}
}]);