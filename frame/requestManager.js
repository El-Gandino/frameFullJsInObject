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
    sendQuery(queryArray,options){
		if(typeof(options) == 'undefined'){
			let options = {};
		}
		let login = 'nobody';
		let key = '';
		let query = {};
		let requestObject = {
			action:'',
			data:{
				login: 'nobody',
				queryArray:{},
			}
		};
		let rootQuery= 'http://apijsp.test';
		
		if(options.action){
			rootQuery += options.action;
		}
		for(let i in queryArray){
			query[queryArray[i].label] = queryArray[i].value;
		}
		
		
		//let path = requestObject.action;
		if(options.typeQuery){
			
			return;
		
		}
		let fullRequest = {
			key: key,
			login: login,
			rootQuery: rootQuery,
			query: query,
			parameters: {
				status: 'pending',
				requestId: generateUuId(),
				//activityId: activityId
			}
		}
		console.log(true);
		onmessage({data:fullRequest});

	}
	setResponce(responce){
		console.log(responce);
	}
}