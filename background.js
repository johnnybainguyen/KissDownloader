chrome.runtime.onMessage.addListener(function(response, sender, sendResponse) {	
	
	chrome.downloads.download({
		url: response.url,
		filename: response.seriesName + " - " + response.episodeName + ".mp4" 
	});
	
	chrome.storage.local.get("kissShows", function(kissRepository) {
		
		var updatedSeriesArray = kissRepository.kissShows ? kissRepository.kissShows : {"kisscartoon": {}, "kissanime": {}, "kissasian" : {}};
		if(updatedSeriesArray[response.domainName][response.seriesName]) {
			var duplicateFound = false;
			for(var i in updatedSeriesArray[response.domainName][response.seriesName]) {
				if(updatedSeriesArray[response.domainName][response.seriesName][i].episodeName == response.episodeName) {
					duplicateFound = true;
					break;
				}
			}
			if(!duplicateFound) {
				updatedSeriesArray[response.domainName][response.seriesName].push({"episodeName":response.episodeName, "url" : response.url});
			}
		} else {
			updatedSeriesArray[response.domainName][response.seriesName] = [{"episodeName":response.episodeName, "url" : response.url}];
		}
		updatedSeriesArray[response.domainName][response.seriesName].sort(function(a, b) {return (a.episodeName > b.episodeName) ? 1 : ((b.episodeName > a.episodeName) ? -1 :0);});
		chrome.storage.local.set({"kissShows": updatedSeriesArray}, function() {
	
		});
	});
});

chrome.browserAction.onClicked.addListener(function() {
	chrome.storage.local.get("kissShows", function(fileData) {
		chrome.tabs.create({url:chrome.extension.getURL('filemanager.html')}, function() {});
	});
});
