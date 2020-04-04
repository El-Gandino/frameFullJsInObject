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
                windowCreat:{

                },
				userTable:{
					type:'div',
					options:{
						callBack:{
							action:'/person/get',
							query:{
								parent:stream.user.token
							}
						}
					}
                },
                callWindow :{
                    type:'callBackWindow',
                    options:{
                        link:'windowCreat'
                    }
                }
            }
        },
    }
    getActivityStructure(activityId){
        return this.activity[activityId];

	}
}