class user{
    constructor(query){
		this.token = query.token;
		this.email = query.email;
		this.rank = query.rank;
		this.userLevel = query.userLevel;
		let script = constructDomElement('script','',{parent:document.head,extraAttributes:{type:'text/javascript',src:'app/authstructure.js'}});	
		delete(stream.activityManager.structure);
		delete(stream.builder.structure);
		delete(stream.builder.shapeActivity);
		if (!stream.objectLoaded.userLevel){
			stream.objectLoaded.userLevel =[
				{
					"id": "1",
					"rank": "utilisateur",
				  },
				  {
					"id": "2",
					"rank": "admin",
				  },
				  {
					"id": "3",
					"rank": "superAdmin",
				  },
			
			
			];
		}
		setTimeout(function() {
			stream.activityManager.clearBody();
			stream.activityManager.structure = new authstructure();
			stream.builder.structure = new authstructure();
			if(stream.activityManager.currentActivity != 'login'){
				stream.activityManager.changeActivity(stream.activityManager.currentActivity );
			}
			else stream.activityManager.changeActivity();
		}, 800);
		stream.cookie = new cookie('user',JSON.stringify({user:{'token':this.token,'email': this.email,'rank':this.rank,'userLevel':this.userLevel 
	}}));
	}
	static getInstance(query){
		if(!this.instance)
		{
			this.instance = new user(query);
		}
		return this.instance;
	}
	delete(){
		delete(this);
	}
}


