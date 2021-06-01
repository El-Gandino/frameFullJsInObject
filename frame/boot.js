"use strict"
var stream = new Stream();
getValuesUrl();
stream.activityManager = new activityManager();
stream.netWorker = new Worker('frame/netWorker.js');
var newActivityId = 'home';
if(document.cookie){
	if(!stream.cookie){
		stream.cookie = cookie.getInstance('user');
	}	
	/*let cookie = JSON.parse(document.cookie);
	if(cookie.user &&  cookie.user.token){
		if(!stream.user && !stream.requestManager.script){
			stream.requestManager.script = constructDomElement('script','',{parent:document.head,extraAttributes:{type:'text/javascript',src:'frame/user.js'}});
		}
		
	}
	*/
}
var pathName = getPathName();
if(pathName && pathName.length>0){
	newActivityId = pathName[0];
}

stream.activityManager.changeActivity(newActivityId,true, true);