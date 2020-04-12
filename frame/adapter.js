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
	rootConstruct(result,shape){
		console.log(result,shape);
		for(let i in result){
			this[shape.options.callBack.responcetrue](result[i],shape.structure.dom,shape);
		}
	}
	constructLineUser(element ,container,shape){
		console.log(element,container);
		let lineElement = constructDomElement('div','lineUser',{parent:container});
		let logoUser = constructDomElement('div','logoUser',{parent:lineElement});
		let userName = constructDomElement('div','textUser nameUser',{parent:lineElement,content:element.name});
		let userSurname = constructDomElement('div','textUser surnameUser',{parent:lineElement,content:element.surname});
		let deletContainer = constructDomElement('div','deletContainer',{parent:lineElement,content:'supression'});
		deletContainer.addEventListener('click', function (e) {
			let options = {action:'/' + element.type + '/delete',enpoint:'delet'};
			let queryArray = [{label:'parent',value:element.token}];
			stream.requestManager.sendQuery(queryArray,options,shape);
		});
		let updateContainer = constructDomElement('div','updateContainer',{parent:lineElement,content:'modification'});
		updateContainer.addEventListener('click', function (e) {

		});
	}
}