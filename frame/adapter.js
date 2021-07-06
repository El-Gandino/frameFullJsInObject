class adapter{
	constructor(){

	}
	static getInstance(){
		if(!this.instance)
		{
			this.instance = new adapter();
		}
		return this.instance;
	}
	rootConstruct(shape,result){
		for(let i in result){
			this[shape.options.callBack.responsetrue](result[i],shape.structure.dom,shape);
		}
	}

	constructLineUser(element ,container,shape){
		let lineElement = constructDomElement('div','lineUser',{parent:container});
		/*get mark*/
		let logoUser = constructDomElement('div','logoUser',{parent:lineElement});//to dev
		let userRank = constructDomElement('div','textUser userRank',{parent:lineElement,content:stream.objectLoaded.rank[element.rank-1].rank});
	
		let userName = constructDomElement('div','textUser nameUser',{parent:lineElement,content:element.name});
		let userSurname = constructDomElement('div','textUser surnameUser',{parent:lineElement,content:element.surname});
		
		let userLevel = constructDomElement('div','textUser userLevel',{parent:lineElement,content:stream.objectLoaded.userLevel[element.userLevel-1].rank});
		
		let updateContainer = constructDomElement('div','textUser updateContainer',{parent:lineElement,content:'modification'});
		
		let deletContainer = constructDomElement('div','textUser deletContainer',{parent:lineElement,content:'supression'});
		updateContainer.addEventListener('click', function (e) {
			let window = stream.builder.shapeActivity[stream.activityManager.currentActivity].shapes[shape.options.updateWindow].structure;
			window.structure.content.email.dom.value = element.email  ;
			window.structure.content.name.dom.value = element.name  ;
			window.structure.content.surname.dom.value = element.surname  ;
			window.structure.content.rank.dom.value = element.rank  ;
			window.structure.content.userLevel.dom.value = element.userLevel  ;
			window.structure.statement.currentStatement = window.structure.statement.listeStatement[1];
			window.structure.element = element;
			window.structure.content.password.dom.classList.add('displayNone');
			window.event.show();
		});
		deletContainer.addEventListener('click', function (e) {
			
			let options = {action: 'delete',endpoint:element.type};
			let queryArray = [{label:'parent',value:element.token}];
			
			stream.requestManager.sendQuery(queryArray,options,shape);
			
		});
	};
}