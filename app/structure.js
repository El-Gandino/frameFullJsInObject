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
            highlightCurrentActivity: true,
            language: ['fr', 'en', 'de'],
            search:{
                searchengine:{
                    target:"publicCardCourse",
                    type:["name","nameCreator"]
                },
                discover:{
                    redirect:'searchengine'
                }
            },
        },
        /*
        footer:{
            infos:{
                name: 'WorkStreams',
                street: 'Rue Jacques Dalphin 14',
                zip: 1227,
                city: 'Carouge',
                canton: 'Genève',
                country: 'switzerland',
                phone: '+41 22 301 20 14',
                email: 'contact@workstreams.ch',
            },
            language: ['fr', 'en', 'de']
        },
         */
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
                }
            }
        },
        login:{
            shapes:{

            }
        }
    }
    getActivityStructure(activityId){
        console.log(this.activity[activityId]);
        return this.activity[activityId];

    }

}