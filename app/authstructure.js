class authstructure {
    interface = {
        topMenu: {
            logo:{
                icon: 'app/img/logos/logo_192.jpg',
                text: 'test',
            },
            links: {
                home:{activity: 'home', text: 'home',  href: ' /home/'},
				
            },
        },
    };
    activity = {
        home:{
            shapes:{

            }
        },
    }
    getActivityStructure(activityId){
        console.log(this.activity[activityId]);
        return this.activity[activityId];

	}


}