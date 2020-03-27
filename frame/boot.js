"use strict"
var stream = new Stream();
if (typeof(extraData) !== 'undefined'
	&& typeof(organizations) !== 'undefined') {
	extraData.organizations = organizations;
}
getValuesUrl();
stream.activityManager = new activityManager();
var newActivityId = 'home';

var pathName = getPathName();
if(pathName && pathName.length>0){
	newActivityId = pathName[0];
}
stream.activityManager.changeActivity(newActivityId,true, true);