class authstructure {
    interface = {
        topMenu: {
            logo:{
                icon: 'app/img/logos/logo_192.jpg',
                text: 'test',
            },
            links: {
                home:{activity: 'home', text: 'home',  href: ' /home/'},
                users:{activity: 'users', text: 'users',  href: ' /users/'},
				logout:{activity: 'logout', text: 'logout',  href: ' /logout/',action: function()
                {

                    stream.cookie.__destruct('user');
                    delete(stream.activityManager.structure);
                    delete(stream.builder.structure);
                    delete(stream.builder.shapeActivity);
                    delete(stream.user);
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
        //rename user
        home:{
            shapes:{     
				userTable:{
					type:'div',
					options:{
						callBack:{
							action:'get',
							query:{
								parent:stream.user.token,
                                enpoint:'person',
                            },
                            endpoint:'person',
                            responcetrue:'constructLineUser',
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
                        content:'send',
                        listInput:['name','surname'],
                        action:'put',
                        endpoint:'person',
                        error:{
                            bubble:'msg'
                        },
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
        users:{
            shapes:{
                windowCreat:{
                    type:'callWindow',
                    options:{
                        taget:'window',
                        content:'ajouter un JSP'
                    }
                },
                window :{
                    type:'callBackWindow',
                    options:{
                        link:'windowCreat',
                        title:'ajout d\'un membre a la famille',
                        listeStatement:['put','update'],
                    }
                },
                userTable:{
					type:'div',
					options:{
                        updateWindow:'window',
						callBack:{
							action:'get',
							query:{
								parent:stream.user.token,
                                enpoint:'user',
                            },
                            endpoint:'user',
                            responsetrue:'constructLineUser',
                           
                        },
					}
                },
                form:{
                    type:'form',
                    options:{
                        include:'window',
                    }
                },
                rank:{
                    type:'input',
                    options:{
                        queryLabel:'rank',
                        include:'form',
                        type:'select',
                        //placeholder:'Nom',
                        notNull:true,
                        parentObject:'window',
                        values:'rank',
                        defaultValue:4,
                    }
                },
                userLevel:{
                    type:'input',
                    options:{
                        queryLabel:'userLevel',
                        include:'form',
                        type:'select',
                        //placeholder:'Nom',
                        notNull:true,
                        parentObject:'window',
                        values:'userLevel',
                        defaultValue:0,
                    }
                },
                name:{
                    type:'input',
                    options:{
                        queryLabel:'name',
                        include:'form',
                        type:'text',
                        placeholder:'Nom',
                        notNull:true,
                        parentObject:'window'
                    }
                },
                surname:{
                    type:'input',
                    options:{
                        queryLabel:'surname',
                        include:'form',
                        type:'text',
                        placeholder:'Prénom',
                        notNull:true,
                        parentObject:'window'
                    }
                },
                email:{
                    type:'input',
                    options:{
                        queryLabel:'email',
                        include:'form',
                        type:'email',
                        placeholder:'email',
                        notNull:true,
                        parentObject:'window'
                    }
                },
                password:{
                    type:'input',
                    options:{
                        include:'form',
                        type:'password',
                        placeholder:'mot de passe',
                        queryLabel:'password',
                        notNull:true,
                        parentObject:'window'
                    }
                },
                submit:{
                    type:'submit',
                    options:{
                        queryLabel:'',
                        include:'form',
                        listInput:[
                                {input:'rank',options:false},
                                {input:'userLevel',options:false},
                                {input:'name',options:false},
                                {input:'surname',options:false},
                                {input:'email',options:false},
                                {input:'password',options:true},
                            ],
                        getAction:'byParent',
                        endpoint:'user',
                        error:{
                            bubble:'msg'
                        },
                        parentObject:'window'
                    }
                }
                /**window */
            },
            options:{
                /*
                required:{
                    rank:{value:true,methode:'getApi'},
                }
                */
            },
        }
    }
    getActivityStructure(activityId){
        return this.activity[activityId];

	}
}