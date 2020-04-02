"use strict"
	var onmessage = function (event) {
        dataServiceWorker(event.data);
	};
	var dataServiceWorker = function (settings, failCount) {
        var xhr = false;
		if (XMLHttpRequest) {
			xhr = new XMLHttpRequest();
        }
		xhr.open("POST", settings.rootQuery, true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.send('login=' + encodeURIComponent(settings.login) + '&key=' + encodeURIComponent(settings.key) + '&signature=1&query=' + encodeURIComponent(JSON.stringify(settings.query)));        
        xhr.onreadystatechange = function () {
			console.log('onreadystatechange',xhr);
			if (xhr.status == 200 && xhr.readyState == 4) {
				if(xhr.responseText){
					let results = xhr.responseText;
                	let resultsObject = JSON.parse(results);
                	settings.parameters.status = "ok";
                	stream.requestManager.setResponce({result: resultsObject, parameters:settings.parameters});
				}
			}
		}
		xhr.onerror = function(error){
			console.log('xhrerror', error);
			if(typeof failCount === 'undefined'){
				var failCount = 0;
			}
			
			if(failCount >= 10){
				console.warn("request failed too much. aborting");
				return false;
			}
			
			setTimeout(function(evt){
				dataServiceWorker(settings, failCount + 1);
				},400
			);
		}
	};