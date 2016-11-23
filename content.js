// Selects the Highest Quality on the Kiss Page
document.getElementById("selectQuality")[0].selected = "selected";
var event = new Event("change");
document.getElementById("selectQuality").dispatchEvent(event);

// Gets the page information and video and sends it to the KissDownloader
var cleanPathname = location.pathname.replace(/-/g, " ");
var pathArray = cleanPathname.split("/");
var videoURL = document.getElementsByTagName("video")[0].getAttribute("src");
var domainName = document.domain.split(".")[0];

// Sends Episode information to the backend
chrome.runtime.sendMessage({"domainName": domainName, "seriesName" : pathArray[2], "episodeName" : pathArray[3], "url": videoURL});

// Auto Click the next anime episode
document.getElementById("btnNext").parentNode.click(); // Auto click next episode til end
