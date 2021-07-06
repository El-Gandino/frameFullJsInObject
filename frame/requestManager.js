class requestManager{
    constructor(){
    
        
	}
	static getInstance(){
		if(!this.instance)
		{
			this.instance = new requestManager();
		}
		return this.instance;
	}
	sendQuery(queryArray,options,shape){
		console.log(queryArray,options,shape);
		if(typeof(options) == 'undefined'){
			let options = {};
		}
		if(!options.action){
			console.error('erro no action for query');
			return;
		}
		if(!options.endpoint){
			console.error('erro no endpoint for query');
			return;
		}
		let login = 'nobody';
		let key = '';
		let query = {};
		let rootQuery= 'http://API.test';
		rootQuery += '/'+options.endpoint+'/'+options.action;
		for(let i in queryArray){
			query[queryArray[i].label] = queryArray[i].value;
		}
		if(options.action == 'auth'){
			console.log(query);
			key = query['password'];
			login = query['email'];
			query['action'] = 'get';
		}
		if(stream.user){
			login = stream.user.email;
			key = stream.user.token;
		}
		let fullRequest = {
			key: key,
			login: login,
			rootQuery: rootQuery,
			query: query,
			parameters: {
				status: 'pending',
				requestId: generateUuId(),
				action:  options.action
			}
		};
		if(options.endpoint){
			fullRequest.parameters.enpoint = options.endpoint;
		}
		if(shape){
			fullRequest.parameters.shape = shape;
		}
		console.log(fullRequest,options);
		onmessage({data:fullRequest});
	}
	setResponce(response){
		console.log(response);
		let action = response.parameters.action;		
		if(action == 'delete'){
			stream.reloadContent(response.parameters.shape);
		}
		if(response.parameters){
			let parameters = response.parameters;
			let dataSet = response.result.dataSet;
			if(dataSet.status =='error' || !dataSet.status ){
				if(parameters.shape && parameters.shape.options.error){
					let error = parameters.shape.options.error;
					if(error.bubble == 'msg'){
						stream.bubbleNotify.setBubble(dataSet.message,{liveTime:6500,error:true});
					}
				}
				console.warn(dataSet.message);
				return;
			}
			if(response.parameters.enpoint && response.parameters.enpoint == 'user' && response.parameters.action == 'auth'){
				//Cache.add(response);
				if(!stream.user && !this.script){
					//importScripts('frame/user.js');
					let script = document.createElement("script");
					script.src = 'frame/user.js';  // set its src to the provided URL
					document.head.appendChild(script);
				}
				setTimeout(function() {
					stream.user = user.getInstance(dataSet.query);
					}, 200);
			
				return;
			}
			if(response.parameters.shape){
				let currentshape = response.parameters.shape;
				if(currentshape.options.callBack.responsetrue){
					stream.adapter.rootConstruct(currentshape,dataSet.query); 
					return;
				}
				if(currentshape.options.callBack.responseFunction){
					currentshape.options.callBack.responseFunction(currentshape.name,dataSet.query);
					return;
				}
			}
		}
	}
}