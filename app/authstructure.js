class authstructure {
    interface = {
        topMenu: {
            logo:{
                icon: 'app/img/logos/logo_192.jpg',
                text: 'test',
            },
            links: {
                home:{activity: 'home', text: 'home',  href: ' /home/'},
				logout:{activity: 'logout', text: 'logout',  href: ' /logout/',action: function()
                {

                    stream.cookie.__destruct('user');
                    delete(stream.activityManager.structure);
                    delete(stream.builder.structure);
                    delete(stream.builder.shapeActivity);
		            setTimeout(function() {
                        stream.activityManager.structure = new structure();
                        stream.builder.structure = new structure();
                        stream.activityManager.clearBody();
                        stream.activityManager.changeActivity();
                    },100);
                }, 
            },
        },
        },
    };
    activity = {
        home:{
            shapes:{     
				userTable:{
					type:'div',
					options:{
						callBack:{
							action:'/person/get',
							query:{
								parent:stream.user.token
                            },
                            enpoint:'person',
                            responcetrue:'constructLineUser',
                            //responceEmpty:'constructTableUser',
						},
					}
                },
                window :{
                    type:'callBackWindow',
                    options:{
                        link:'windowCreat',
                        title:'ajout d\'un membre a la famille' 
                    }
                },
                form:{
                    type:'form',
                    options:{
                        include:'window'
                    }
                },
                name:{
                    type:'input',
                    options:{
                        queryLabel:'name',
                        include:'form',
                        type:'text',
                        placeholder:'prénom',
                        notNull:true
                    }
                },
                surname:{
                    type:'input',
                    options:{
                        queryLabel:'surname',
                        include:'form',
                        type:'text',
                        placeholder:'nom de famille',
                        notNull:true
                    }
                },
                submit:{
                    type:'submit',
                    options:{
                        queryLabel:'',
                        include:'form',
                        listInput:['name','surname'],
                        action:'/person/put',
                    }
                },
                windowCreat:{
                    type:'callWindow',
                    options:{
                        taget:'window',
                        content:'ajouter d\'un membre à la famille'
                    }
                },

            }
        },
        logout:{}
    }
    getActivityStructure(activityId){
        return this.activity[activityId];

	}
}