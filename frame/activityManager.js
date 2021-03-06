"use strict"
class activityManager {
	/*
	* singleton
	*/
	constructor(activityId = 'home') {
		if (typeof (this.structure) == 'undefined') {
			this.setStructure();
		}
		if (!this.ActivityManager) {
			this.activityManager = this;
		}
		return this;
	}
	setStructure() {
		if(!stream.user){
			this.structure = new structure;
			return;
		}
		this.structure = new authstructure;
		console.log('setStructure',this.structure);
	}
	changeActivity(activityId) {
		console.log('changeActivity',activityId);
		if (!activityId) {
			activityId = 'home';
		}
		this.currentActivity = activityId;

		if (typeof (this.structure) == 'undefined') {
			this.setStructure();
		}
		if(!this.topMenu){
			this.topMenu = this.setTopMenu(activityId);
		}
		if(typeof(this.structure.activity[activityId]) != 'undefined'){
			if(this.structure.activity[activityId].options){
				let options = this.structure.activity[activityId].options;
				for(let i in options){
					switch(i){
						case 'required':
							for(let a in options[i]){
								console.log(options[i][a]);
								if(!stream.objectLoaded[a]){
								if(options[i][a].methode == 'getApi'){
									let queryArray = {
										//parent:stream.user.token,
										endpoint:a,
									};
									let options = {action:'get',endpoint:a};
									let shape ={
										name:'rank',
										options:{
											callBack:{
												responseFunction:function(name,query){
													stream.objectLoaded[name]=query;
												}
											}
										}
									}
									stream.requestManager.sendQuery(queryArray,options,shape);
								}
							}
							}
							break;
					}
				}
				
			}
		}
		this.checkActivityBody(activityId);
		if (!this.activityBodyList[activityId].contruct) {
			this.setupActivity(activityId);
		}
		this.displayActivity();
	}
	setupActivity(activityId) {
		if (!stream.builder) {
			stream.builder = new builder();
		}
		stream.builder.constructActivity(activityId, this.activityBodyList[activityId]);
		this.activityBodyList[activityId].contruct = true;
	}
	checkActivityBody(activityId) {
		if (!this.body) {
			this.body = constructDomElement('div', 'activityBodyContainer');
		}
		if (!this.activityBodyList) {
			this.activityBodyList = {};
		}
		if (!this.activityBodyList[activityId]) {
			this.activityBodyList[activityId] = this.constructActivityBody(activityId);
		}
	}
	constructActivityBody(activityId) {
		var structure = {};
		structure.container = constructDomElement('div', 'displayNone activityBody activityBody' + activityId, { parent: this.body });
		return structure;
	}
	/**
	 * function for construct topMenu
	 * @param {string} activityId 
	 */
	setTopMenu(activityId) {
		var topMenu = {
			container: {
				leftContainer: {},
				rightContainer: {}
			},
		};
		/* to opti */
		topMenu.container.dom = constructDomElement('div', 'topMenu topMenuFull');
		topMenu.container.leftContainer.dom = constructDomElement('div', 'topMenuLeft', { parent: topMenu.container.dom });
		topMenu.container.rightContainer.dom = constructDomElement('div', 'topMenuRight', { parent: topMenu.container.dom });
		var leftContainer = topMenu.container.leftContainer.dom;
		var rightContainer = topMenu.container.rightContainer.dom
		/*left structure*/
		var logoContainer = constructDomElement('div', 'logoTopMenu logoTopMenuRight', { parent: leftContainer });
		var textLogoContainer = constructDomElement('div', 'logoTextTopMenu logoTextMenuRight', { parent: leftContainer });
		logoContainer.style['background-image'] = this.structure.interface.topMenu.logo.icon;
		logoContainer.setAttribute("style", "background-image:url(" + this.structure.interface.topMenu.logo.icon + ');');
		textLogoContainer.innerText = this.structure.interface.topMenu.logo.text;
		topMenu.container.leftContainer.logo = { dom: logoContainer };
		topMenu.container.leftContainer.text = { dom: textLogoContainer };
		/*right structure*/
		topMenu.container.rightContainer.links = {};
		var resetTopMenu = function (activityId) {
			for (var x in topMenu.container.rightContainer.links) {
				if (topMenu.container.rightContainer.links[x].dom.classList.contains('linkTopMenuSelected')) {
					topMenu.container.rightContainer.links[x].dom.classList.remove('linkTopMenuSelected');
				}
				if (x == activityId) {
					topMenu.container.rightContainer.links[x].dom.classList.add('linkTopMenuSelected');
				}
			}
		}
		for (let i in this.structure.interface.topMenu.links) {
			let link;
			if(this.structure.interface.topMenu.links[i].action){
				console.log(true);
				link = constructDomElement('a', 'activityLink ', {content:this.structure.interface.topMenu.links[i].text, parent: rightContainer ,href:"#"});
				link.addEventListener('click',function(){
					stream.activityManager.structure.interface.topMenu.links[this.text].action();
				});
					
			}else{
				link = constructActivityLink({ text: this.structure.interface.topMenu.links[i].text, activity: this.structure.interface.topMenu.links[i].activity }, rightContainer, { extraRender: resetTopMenu });
			}
			if (this.currentActivity == this.structure.interface.topMenu.links[i].activity) {
				link.classList.add('linkTopMenuSelected');
			}
			topMenu.container.rightContainer.links[this.structure.interface.topMenu.links[i].activity] = { dom: link };
		}
		return topMenu;
	}
	displayActivity() {
		if(document.readyState === 'complete'){
			document.body.appendChild(this.topMenu.container.dom);
			document.body.appendChild(this.body);
		}else {
			window.onload = function(){
				stream.activityManager.displayActivity();
			}
		}
		console.log('displayActivirty',this.currentActivity);
		for(let i in this.activityBodyList){
			if(i == this.currentActivity){
				this.activityBodyList[i].container.classList.remove('displayNone');
				continue;
			}
			this.activityBodyList[i].container.classList.add('displayNone');
		}
		//this.activityBodyList[this.currentActivity].container.classList.remove('displayNone');
		/**/
		window.history.pushState({},"",this.currentActivity);

	}
	clearBody(){
		for(let i in this.activityBodyList){
			this.activityBodyList[i].container.remove();
			delete(this.activityBodyList[i]);
		}
		this.topMenu.container.dom.remove();
		delete(this.topMenu);
	}
}