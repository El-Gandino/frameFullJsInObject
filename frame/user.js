class user{
    constructor(token,email){
		this.token = token;
		this.email = email;
		let script = constructDomElement('script','',{parent:document.head,extraAttributes:{type:'text/javascript',src:'app/authstructure.js'}});	
		delete(stream.activityManager.structure);
		delete(stream.builder.structure);
		delete(stream.builder.shapeActivity);
		setTimeout(function() {
			stream.activityManager.clearBody();
			stream.activityManager.structure = new authstructure();
			stream.builder.structure = new authstructure();
			stream.activityManager.changeActivity();
		}, 800);
		document.cookie = JSON.stringify({'user':{'token': this.token ,'email': this.email }});
	}
	static getInstance(token,email){
		console.log(token,email);
		if(!this.instance)
		{
			this.instance = new user(token,email);
		}
		return this.instance;
	}
}


