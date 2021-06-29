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
	let getCookie = cookie.checkCookie();
	if(getCookie ){
		let checkUser = JSON.parse(getCookie).user;
		console.log(checkUser);
		let aut = [
				{
					"label": "email",
					"value": checkUser.email
				},
				{
					"label": "password",
					"value": checkUser.token
				},
				{
					"label": "token",
					"value":true
				}
			];

		let options = {action: "auth",endpoint:"user"};
		
		if(!stream.user && !this.script){
			//importScripts('frame/user.js');
			let script = document.createElement("script");
			script.type = "text/javascript";
			script.src = 'frame/user.js';  // set its src to the provided URL
			
			document.head.appendChild(script);
		}
		setTimeout(function() {
			stream.user = user.getInstance(checkUser.token, checkUser.email
				);
		}, 100);
		//stream.requestManager.sendQuery(aut,options);
	}
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