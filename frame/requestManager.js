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
		if(typeof(options) == 'undefined'){
			let options = {};
		}
		let login = 'nobody';
		let key = '';
		let query = {};
		let rootQuery= 'http://apijsp.test';
		
		if(options.action){
			rootQuery += options.action;
		}
		for(let i in queryArray){
			query[queryArray[i].label] = queryArray[i].value;
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
	setResponce(responce){
		console.log(responce);
		let action = responce.parameters.action;
		if(action.split('/')[2] == 'delete'){
			let shapesActivty = stream.builder.shapeActivity[stream.activityManager.currentActivity].shapes;
			stream.reloadContent(responce.parameters.shape)
		}
		if(responce.parameters){
			if(responce.parameters.enpoint && responce.parameters.enpoint == 'user'){
				if(!stream.user && !this.script){
					this.script = constructDomElement('script','',{parent:document.head,extraAttributes:{type:'text/javascript',src:'frame/user.js'}});
				}
				if(responce.result.dataSet.status == true){
					setTimeout(function() {
						stream.user = user.getInstance(responce.result.dataSet.query.token,responce.result.dataSet.query.email
							);
					  }, 200);
				}	
				return;
			}
			if(responce.parameters.shape){
				let currentshape = responce.parameters.shape;
				if(currentshape.options.callBack.responcetrue){
					stream.adapter.rootConstruct(responce.result.dataSet.query,currentshape)
				}
			}
	
		}

	
	}
}