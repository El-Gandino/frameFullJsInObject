class structure {
    interface = {
        topMenu: {
            logo:{
                icon: 'app/img/logos/logo_192.jpg',
                text: 'test',
            },
            links: {
                home:{activity: 'home', text: 'home',  href: ' /home/'},
                signup:{activity: 'signup', text: 'Inscription', href: '/signup/',classSuffix:'signup'},
                login:{activity: 'login', text: 'Connexion', href: '/login/',classSuffix:'login'},
            },
        },
    };
    activity = {
        home:{
            shapes:{
                slider:{
                    type:'slider',
                    options:{
                        className:'sliderFullHeight',
                        listImages:[
                            {href:'app/img/extra/slider/01.jpg'},
                            {href:'app/img/extra/slider/02.jpg'},
                            {href:'app/img/extra/slider/03.jpg'},
                            {href:'app/img/extra/slider/04.jpg'},
                        ]
                    }
                },
            }
        },
        signup:{
            shapes:{
                form:{
                    type:'form',
                },
                name:{
                    type:'input',
                    options:{
                        queryLabel:'name',
                        include:'form',
                        type:'text',
                        placeholder:'Nom',
                        notNull:true
                    }
                },
                surname:{
                    type:'input',
                    options:{
                        queryLabel:'surname',
                        include:'form',
                        type:'text',
                        placeholder:'Prénom',
                        notNull:true
                    }
                },
                email:{
                    type:'input',
                    options:{
                        queryLabel:'email',
                        include:'form',
                        type:'email',
                        placeholder:'email',
                        notNull:true
                    }
                },
                password:{
                    type:'input',
                    options:{
                        include:'form',
                        type:'password',
                        placeholder:'mot de passe',
                        queryLabel:'password',
                        notNull:true
                    }
                },
                submit:{
                    type:'submit',
                    options:{
                        queryLabel:'',
                        include:'form',
                        listInput:['name','surname','email','password'],
                        action:'/user/put?',
                        endpoint:'user'   
                    }
                }
            }
        },
        login:{
            shapes:{
                form:{
                    type:'form',
                },
                email:{
                    type:'input',
                    options:{
                        queryLabel:'login',
                        include:'form',
                        type:'email',
                        placeholder:'email',
                        notNull:true
                    }
                },
                password:{
                    type:'input',
                    options:{
                        include:'form',
                        type:'password',
                        placeholder:'mot de passe',
                        queryLabel:'password',
                        notNull:true
                    }
                },
                submit:{
                    type:'submit',
                    options:{
                        queryLabel:'',
                        include:'form',
                        listInput:['email','password'],
                        action:'/user/auth?',
                        endpoint:'user'
                    }
                }
            }
        }
    }
    getActivityStructure(activityId){
        console.log(this.activity[activityId]);
        return this.activity[activityId];

    }
    destroy(){
		delete(this);
	}
}