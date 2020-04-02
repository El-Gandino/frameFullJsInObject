class user{
    constructor(token){
		this.token = token;
		let script = constructDomElement('script','',{parent:document.head,extraAttributes:{type:'text/javascript',src:'app/authstructure.js'}});	
		delete(stream.activityManager.structure);
		delete(stream.builder.structure);
		delete(stream.builder.shapeActivity);
		setTimeout(function() {
			stream.activityManager.clearBody();
			stream.activityManager.structure = new authstructure();
			stream.builder.structure = new authstructure();
			stream.activityManager.changeActivity();
		}, 200);
		
		//stream.activityManager.
	}
	static getInstance(token){
		if(!this.instance)
		{
			this.instance = new user(token);
		}
		return this.instance;
	}
}


