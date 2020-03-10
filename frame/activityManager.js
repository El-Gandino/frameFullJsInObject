"use strict"
class activityManager {
    constructor (activityId = 'home' ){
        if(typeof(activityId) != 'string'){
            activityId='home' 
        }
        if(typeof(this.structure) == 'undefined'){
            this.setStructure();
        }
		
		
        if(!this.ActivityManager){
            this.activityManager = this;
		}
		this.currentActivity = activityId;
        this.changeActivity(activityId);
        return this;

	}
	setStructure(){
		this.structure = new structure;
    }
    changeActivity(activityId){
		if(!activityId){
			activityId = 'home';
		}
		if(typeof(this.structure) == 'undefined'){
            this.setStructure();
        }
		this.topMenu = this.setTopMenu(activityId);
		this.checkActivityBody(activityId);
		this.setupActivity(activityId);

		window.onload = function() {
			stream.activityManager.displayActivity();
			console.log('windowLoad');
		};
	}
	setupActivity(activityId){
		if(!stream.builder){
			stream.builder = new builder();
		}
		stream.builder.constructActivity(activityId,this.activityBodyList[activityId]);
	}
	checkActivityBody(activityId){
		if(!this.body){
			this.body = constructDomElement('div','activityBodyContainer');
		}
		if(!this.activityBodyList){
			this.activityBodyList = {};
		}
		console.log(this.activityBodyList)
		if(!this.activityBodyList[activityId]){
			this.activityBodyList[activityId] = this.constructActivityBody(activityId);
		}
	}
    constructActivityBody(activityId){
		var structure = {};
		structure.container = constructDomElement('div','displayNone activityBody activityBody'+activityId,{parent:this.body});
		
		return structure;
	}

	/**
	 * function for construct topMenu
	 * @param {string} activityId 
	 */
    setTopMenu (activityId){
		var topMenu = {
			container:{
				leftContainer:{},
				rightContainer:{}
			},
		};
		topMenu.container.dom = constructDomElement('div','topMenu topMenuFull');
		topMenu.container.leftContainer.dom = constructDomElement('div','topMenuLeft',{parent:topMenu.container.dom});
		topMenu.container.rightContainer.dom = constructDomElement('div','topMenuRight',{parent:topMenu.container.dom});
		var leftContainer =  topMenu.container.leftContainer.dom;
		var rightContainer = topMenu.container.rightContainer.dom
		/*left structure*/
		var logoContainer = constructDomElement('div','logoTopMenu logoTopMenuRight',{parent:leftContainer});
		var textLogoContainer = constructDomElement('div','logoTextTopMenu logoTextMenuRight',{parent:leftContainer});
		logoContainer.style['background-image'] = this.structure.interface.topMenu.logo.icon;
		logoContainer.setAttribute("style", "background-image:url("+this.structure.interface.topMenu.logo.icon+');');
		textLogoContainer.innerText =  this.structure.interface.topMenu.logo.text;
		topMenu.container.leftContainer.logo = {dom:logoContainer};
		topMenu.container.leftContainer.text = {dom:textLogoContainer};
		/*right structure*/
		topMenu.container.rightContainer.links = {};
		var resetTopMenu = function(activityId){
			for(var x in topMenu.container.rightContainer.links){
				if(topMenu.container.rightContainer.links[x].dom.classList.contains('linkTopMenuSelected')){
					topMenu.container.rightContainer.links[x].dom.classList.remove('linkTopMenuSelected');
				}
				if(x == activityId){
					topMenu.container.rightContainer.links[x].dom.classList.add('linkTopMenuSelected');
				}
			}
		}
		for(var i in this.structure.interface.topMenu.links){
			var link = constructActivityLink({text:this.structure.interface.topMenu.links[i].text,activity:this.structure.interface.topMenu.links[i].activity},rightContainer,{extraRender:resetTopMenu}
			);
			if(this.currentActivity ==  this.structure.interface.topMenu.links[i].activity){
				link.classList.add('linkTopMenuSelected');
			}
			topMenu.container.rightContainer.links[this.structure.interface.topMenu.links[i].activity]={dom:link};
		}
		return topMenu;
	}
	displayActivity(){
		console.log('displayActivity',);
		document.body.appendChild(this.topMenu.container.dom);
		document.body.appendChild(this.body);
		this.activityBodyList[this.currentActivity].container.classList.remove('displayNone');

	}
}