class builder{
    constructor(){
        if (!this.builder) {
            this.builder = this;
        }
        return this;
    }
    constructActivity(activityId,currentBody){
        console.log(activityId,currentBody);
        if(!this.structure){
            this.structure = new structure; 
        }
        if(!this.shapeActivity){
            this.shapeActivity = {};
		}
        this.body = currentBody.container;
        if(!this.shapeActivity[activityId]){
            this.shapeActivity[activityId] = this.structure.getActivityStructure(activityId);
        }
        console.log(this.shapeActivity);
        for(let i in this.shapeActivity[activityId].shapes){
            if(!this.shapeActivity[activityId].shapes[i].name){
                this.shapeActivity[activityId].shapes[i].name = i;
            }
            this.constructShape(this.shapeActivity[activityId].shapes[i]);
        }
    }   
    constructShape(shape){
        if(typeof(shape) === 'undefined' || !shape.type || !shape.name){
			console.log('some parameters not provided.', shape);
			return false;
        }
        let className = shape.type + shape.name;
        if(!this['construct'+shape.type[0].toUpperCase() + shape.type.slice(1)]){
            console.warn('shape : construct'+shape.type[0].toUpperCase() + shape.type.slice(1)+ ' not exist');
            return false;
        }
        /*parent*/
        let container = constructDomElement('div',className);
        if(shape.options && typeof(shape.options.include) != 'undefined'){ 
            if(this.shapeActivity[stream.activityManager.currentActivity].shapes){
                let shapesActivty = this.shapeActivity[stream.activityManager.currentActivity].shapes;
                if(shapesActivty[shape.options.include]){
                    shapesActivty[shape.options.include].structure.dom.appendChild(container);
                }else{
                    console.warn('erro on parent :' + shape.options.include);
                }
            }else{
                console.warn('erro on parent :' + shape.options.include);
            }
        } else {
            this.body.appendChild(container);
        }
        shape.structure = this['construct' + shape.type[0].toUpperCase() + shape.type.slice(1)](shape,container);
    }
    /*constructor*/
    constructSlider(shape,container){
        let listImages = [];
        if(shape.options.listImages){
            let currentImages = {};
            for(let i in shape.options.listImages){
                currentImages = {};
                currentImages.source = shape.options.listImages[i];
                currentImages.container = constructDomElement('div','containerImageSlider displayNone',{parent:container});
                currentImages.image = constructDomElement('div','imageSlider',{parent: currentImages.container,styles: {'background-image':'url('+currentImages.source.href+')'}});
                listImages.push(currentImages);
            }
        }
        listImages[0].container.classList.remove('displayNone');
        return {
            dom:container
        }
    }
    constructForm(shape,container){
        let className = 'form form'+stream.activityManager.currentActivity;
        if(shape.options && shape.options.className){
            className += ' '.shape.options.className;
        }
        let form = constructDomElement('form',className,{parent:container,extraAttributes:{action:'javascript:void(0);'}})

        console.log(form,container);
        return {
            dom:form
        }
    }
    constructInput(shape,container){
        let classname = '';
        let input;
        if(shape.options){
            if(shape.options.className){
                classname = shape.options.className;
            }
            if(shape.options.type){
                switch(shape.options.type){
                    case'text':
                        input  = constructDomElement('input',classname + 'input input'+shape.options.type,{parent:container,extraAttributes:{type:'text'}});
						break;
					case'email':
						input  = constructDomElement('input',classname + 'input input'+shape.options.type,{parent:container,extraAttributes:{type:'email'}});
						break;
					case'password':
						input  = constructDomElement('input',classname + 'input input'+shape.options.type,{parent:container,extraAttributes:{type:'password'}});
						break;
					default:
						console.warn('input : '+shape.options.type+'unkonw');
                
                
                }
            }
            if(shape.options.placeholder){
                input.placeholder = shape.options.placeholder;
			}
		}
        let getValue = function(shape){
			shape.structure.dom.classList.remove('borderRed')
        	if(shape.options.notNull){
				if(shape.structure.dom.value == ''){
					shape.structure.dom.classList.add('borderRed');
					return false;
				}
			}
			return {
				label:shape.options.queryLabel,
				value:shape.structure.dom.value,
			}
		}
        return{
			dom:input,
			getValue:getValue,
        }
	}
	constructSubmit(shape,container){
		let buttonSubmit = constructDomElement('div','buttonsubmit',{parent:container});
		buttonSubmit.addEventListener('click',function(){
			console.log(stream);
			let shapesActivty = stream.builder.shapeActivity[stream.activityManager.currentActivity].shapes;
			let queryArray = [];
			for(let i in shape.options.listInput){
				let currentValue = shapesActivty[shape.options.listInput[i]].structure.getValue(shapesActivty[shape.options.listInput[i]]);
				if(currentValue == false){
					return false;
				}
				queryArray.push(currentValue);
            }
            let options = {action:shape.options.action};
            console.log(shape.options.endpoint);
            if(shape.options.endpoint){
                options.endpoint = shape.options.endpoint;
            }
			stream.requestManager.sendQuery(queryArray,options);
        })
        window.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                console.log(stream);
                let shapesActivty = stream.builder.shapeActivity[stream.activityManager.currentActivity].shapes;
                let queryArray = [];
                for(let i in shape.options.listInput){
                    let currentValue = shapesActivty[shape.options.listInput[i]].structure.getValue(shapesActivty[shape.options.listInput[i]]);
                    if(currentValue == false){
                        return false;
                    }
                    queryArray.push(currentValue);
                }
                let options = {action:shape.options.action};
                console.log(shape.options.endpoint);
                if(shape.options.endpoint){
                    options.endpoint = shape.options.endpoint;
                }
                stream.requestManager.sendQuery(queryArray,options);
            }
        });
		return{
			dom:container,
			button:buttonSubmit
		}
		
    }
    constructDiv(shape,container){
        if(shape.options){
            if(shape.options.callBack){
                let options = {action:shape.options.callBack.action};
                let query = shape.options.callBack.query;
                stream.requestManager.sendQuery(query,options,shape)
            }
        }
        return{
            dom:container,
            
		}
    }
    constructCallBackWindow(shape,container){
		let options = {};
		if(shape.options){
			options = shape.options;
		}
		container.classList.add('displayNone');
		let containerWindow = constructDomElement('div','windowContainer ', {parent:container});
		let top = constructDomElement('div','windowTop ',{parent:containerWindow});
		let title = constructDomElement('div','windowTitle ',{parent:top});
		let close =  constructDomElement('div','windowClose ',{parent:top});
		let body =constructDomElement('div','windowBody ',{parent:containerWindow});
		if(options){
			if(options.title){
				title.innerText = options.title;
			}
		}
		let closeFunc = function (){
			container.classList.add('displayNone');
		}
		let showFunc = function (){
			container.classList.remove('displayNone');
		}
		close.addEventListener('click',function(){
			closeFunc();
		});
		return{
			dom:body,
			structure:{
				window:containerWindow,
				topWindow:top,
				parent:container, 
				body:body
			},
			event:{
				show:showFunc,
				close:closeFunc,
			}
		}
	}
	constructCallWindow(shape,container){
		var target = shape.options.target;
		let buton = constructDomElement('div','buttonCallBackWindow',{parent:container});
		buton.innerText = shape.options.content;
		let shapesActivty = this.shapeActivity[stream.activityManager.currentActivity].shapes;
		buton.addEventListener('click',function(){shapesActivty[shape.options.taget].structure.event.show()});
		return{
			dom:container,
			button:buton
		}
		
	}
}