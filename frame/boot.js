"use strict"
var stream = new Stream();
getValuesUrl();
stream.activityManager = new activityManager();
stream.netWorker = new Worker('frame/netWorker.js');
var newActivityId = 'home';
if(document.cookie){
	/*
	if(!stream.cookie){
		stream.cookie = cookie.getInstance('user');
	}
	*/
	let checkUser = cookie.checkCookie();
	if(checkUser ){
		let user = JSON.parse(checkUser);
		let aut = [
				{
					"label": "email",
					"value": user.email
				},
				{
					"label": "password",
					"value": user.token
				}
			];

		let options = {action: "auth",endpoint:"user"};
		stream.requestManager.sendQuery(aut,options);
		console.log(checkUser,);
		//stream.requestManager.script = constructDomElement('script','',{parent:document.head,extraAttributes:{type:'text/javascript',src:'frame/user.js'}});
	}
	console.log();
	/*
	let cookie = JSON.parse(document.cookie);
	if(cookie.user &&  cookie.user.token){
		if(!stream.user && !stream.requestManager.script){
			
		}
		
	}
	*/
}
var pathName = getPathName();
if(pathName && pathName.length>0){
	newActivityId = pathName[0];
}

stream.activityManager.changeActivity(newActivityId,true, true);