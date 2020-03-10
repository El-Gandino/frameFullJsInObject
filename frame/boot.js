"use strict"
var stream = new Stream();
if (typeof(extraData) !== 'undefined'
	&& typeof(organizations) !== 'undefined') {
	extraData.organizations = organizations;
}
getValuesUrl();
stream.activityManager = new activityManager();
var newActivityId = 'home';
if(window.location.href.split("?")[1]){
    newActivityId = window.location.href.split("?")[1];
}
var pathName = getPathName();
if(pathName && pathName.length>0){
	newActivityId = pathName[0];
}
//FIX FIRST LOAD PUSH STATE
/*
if (stream.stringGetValues) {
	url += stream.stringGetValues;
}
if (window.location.hash) {
	url += window.location.hash;
}
*/
//activityManager.changeActivity(newActivityId,true, true);