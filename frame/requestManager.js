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
			key = query['password'];
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
						stream.bubbleNotify.setBubble(dataSet.message,{liveTime:1000000000});
					}
				}
				console.warn(dataSet.message);
				return;
			}
			if(response.parameters.enpoint && response.parameters.enpoint == 'user'){
				if(!stream.user && !this.script){
					this.script = constructDomElement('script','',{parent:document.head,extraAttributes:{type:'text/javascript',src:'frame/user.js'}});
				}
				setTimeout(function() {
					stream.user = user.getInstance(dataSet.query.token,dataSet.query.email
						);
					}, 200);
			
				return;
			}
			if(response.parameters.shape){
				let currentshape = response.parameters.shape;
				if(currentshape.options.callBack.responsetrue){
					stream.adapter.rootConstruct(dataSet.query,currentshape)
				}
			}
	
		}

	
	}
}