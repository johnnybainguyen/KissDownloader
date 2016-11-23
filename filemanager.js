var app = angular.module("fileManagerApp", []);

app.controller("fileManagerController", function($scope, kissService) {
		// Button for Episode Download
		$scope.downloadEpisode = function(seriesName, episodeName, url) {
			chrome.downloads.download({
				url: url,
				filename: seriesName + " - " + episodeName + ".mp4"
			});
		}
		
		$scope.refresh = function() {
			window.location.reload();
		}
		
		$scope.clear = function() {
			chrome.storage.local.set({"kissShows": ""}, function(){});
			window.location.reload();
		}
		
		kissService.getData().then(function(data) {
			$scope.kissShows = data.kissShows;
		});
}).factory("kissService", function($q) {
	// Receive KissShows From Chrome Asynchronous chrome.storage
	var dataout = $q.defer();
	chrome.storage.local.get("kissShows", function(data) {
		dataout.resolve(data);
	});
	return {
			getData: function() {
				return dataout.promise;
			}
	}
});

app.directive("downloadButton", function() {
	alert("button pushed");
	return function(scope, element, attrs) {
		var clickingCallBack = function() {
			alert("clicked");
		};
		element.bind("click", clickingCallBack);
	}
});

/*
$(document).ready(function() {
	$("#refresh").click(function() {
		location.reload();
	});
	
	$("#clear").click(function() {
		chrome.storage.local.set({"kissShows":""}, function() {});
		location.reload();
	});

	//});
});

*/