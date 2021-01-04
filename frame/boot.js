"use strict"
var stream = new Stream();
getValuesUrl();
stream.activityManager = new activityManager();
var newActivityId = 'home';
if(document.cookie){
	stream.requestManager.script = constructDomElement('script','',{parent:document.head,extraAttributes:{type:'text/javascript',src:'frame/cookie.js'}});
	let cookie = JSON.parse(document.cookie);
	if(cookie.user &&  cookie.user.token){
		if(!stream.user && !stream.requestManager.script){
			stream.requestManager.script = constructDomElement('script','',{parent:document.head,extraAttributes:{type:'text/javascript',src:'frame/user.js'}});
		}
		setTimeout(function() {
			stream.user = user.getInstance(cookie.user.token,cookie.user.email);
		}, 200);
}
}
var pathName = getPathName();
if(pathName && pathName.length>0){
	newActivityId = pathName[0];
}

stream.activityManager.changeActivity(newActivityId,true, true);