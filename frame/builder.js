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
        //to rename please
        let animationDuration = 2000;
		var startIndex = 0;
		var currentIndex = startIndex;

		var animationInProgress = false;
        var animationCooldown = true;
        let subContainer = constructDomElement('div','sliderContainer',{parent:container});
        if(shape.options.listImages){
            let currentImages = {};
            for(let i in shape.options.listImages){
                currentImages = {};
                currentImages.source = shape.options.listImages[i];
                currentImages.container = constructDomElement('div','sliderElementContainerAnimation containerImageSlider displayNone',{parent:subContainer});
                currentImages.image = constructDomElement('div','imageSlider',{parent: currentImages.container,styles: {'background-image':'url('+currentImages.source.href+')'}});
                currentImages.active = false;
                listImages.push(currentImages);
            }
        }
        listImages[0].container.classList.remove('displayNone');
        listImages[0].active = true;
        //let actionContainer
        let prev = constructDomElement('a','sliderPrev', {parent: container,content:'&#10094;'});
        let next = constructDomElement('a','sliderNext', {parent: container,content:'&#10095'});
        
        let containerDot = constructDomElement('div','sliderContainerDot',{parent:container});
        let listDot = [];
        for(let i=0 ; i < listImages.length ;i++){
            listDot.push(constructDomElement('span','sliderDot',{parent:containerDot}));
            listDot[i].addEventListener('click',function(){
                showSlides(i);
            });
        }
        listDot[0].classList.add('active');
        next.addEventListener('click',function(){
            showSlides('right');
        });
        prev.addEventListener('click',function(){
            showSlides('left');
        });
        //autoSlide();
        function autoSlide(){
			setTimeout(function(){
                let sIndex =0;
                showSlides('right');
                autoSlide();
            }, 8000);
          
		}
        function showSlides(action) {
            let newIndex;
            console.log(listImages);
            let i;
           switch(action){
                case 'right':
                    /*for (i = 0; i < listImages.length; i++) {
                        listImages[i].container.classList.add("displayNone");
                        if(listImages[i].active){
                            listImages[i].active = false;
                            if(i == listImages.length-1) i= 0;
                            else i++;
                            console.log(i);
                            listImages[i].active = true;
                            listImages[i].container.classList.remove("displayNone");
                            setDot(i);
                            continue;
                        }
                    }*/
                    newIndex = currentIndex + 1;
                    if(newIndex >= listImages.length){
                        newIndex = 0;
                    }
                    break;
                case 'left':
                        newIndex = currentIndex - 1;
                        if(newIndex == -1){
                            newIndex = listImages.length-1;
                            break;
                        }
                        
                    break;
                default:
                    newIndex = action;
                    
            }
            annimationSlide(newIndex);
        }
        function annimationSlide(index){
            console.log(index);
            if(animationInProgress){
				return;
			}
			if(currentIndex === index){
				return;
			}
            let direction = "right";
            if(currentIndex < index){
                direction = "left";
            }
			animationCooldown = true;
		    animationInProgress = true;
			let oldElement = listImages[currentIndex].container;
			let newElement = listImages[index].container;
			let classOld = "Before";
			let classNew = "After";
			switch(direction){
				case 'right':
					classOld = "sliderElementContainerPositionedBefore";
					classNew = "sliderElementContainerPositionedAfter";
				break;
				case 'left':
					classOld = "sliderElementContainerPositionedAfter";
					classNew = "sliderElementContainerPositionedBefore";
				default:
			}
			newElement.classList.add(classOld);
			newElement.classList.remove('displayNone');
			requestAnimationFrame(function(){
				newElement.style["transition"] = animationDuration + "ms";
				oldElement.style["transition"] = animationDuration + "ms";
				requestAnimationFrame(function(){
					//old
					oldElement.classList.add(classNew);
					oldElement.classList.remove('sliderElementContainerPositionedCurrent');
					//new
					newElement.classList.add('sliderElementContainerPositionedCurrent');
					newElement.classList.remove(classOld);
					setTimeout(function(){
						oldElement.classList.add('displayNone');
						newElement.style["transition"] = "0s";
						oldElement.style["transition"] = "0s";
                        oldElement.classList.remove(classNew);
                        animationInProgress = false;
					}, animationDuration);
				});
			});
			listDot[currentIndex].classList.remove('active');
			listDot[index].classList.add('active');
			currentIndex = index;
		}
        return {
            dom:container,
            subDom:subContainer,
            listImages:listImages,
        }
    }
    constructForm(shape,container){
        let className = 'form form'+stream.activityManager.currentActivity;
        if(shape.options && shape.options.className){
            className += ' '.shape.options.className;
        }
        let form = constructDomElement('form',className,{parent:container,extraAttributes:{action:'javascript:void(0);'}})
        return {
            dom:form
        }
    }
    constructInput(shape,container){
        let classname = '';
        let input;
        let checkValue = function(){return true};
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
                        checkValue = function(){
                            let email = shape.structure.dom.value;
                            let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            return re.test(email);
                        }
						break;
					case'password':
						input  = constructDomElement('input',classname + 'input input'+shape.options.type,{parent:container,extraAttributes:{type:'password'}});
                        break;
                    case'textarea':
						input  = constructDomElement('textarea',classname + 'textarea  '+shape.options.type,{parent:container,extraAttributes:{type:'textarea '}});
						break;
                    case 'select' :
                        input  = constructDomElement('select',classname + 'select input inputselect'+shape.options.type,{parent:container,extraAttributes:{type:'select '}});
                        let listInput = stream.objectLoaded[shape.options.values];
                        let option = [];
						for(let i in listInput){
                            option[i] =  constructDomElement('option',classname + 'option ',{parent:input,content:listInput[i].rank,extraAttributes:{type:'option',value:listInput[i].id}});
                            if(i == shape.options.defaultValue){
                                option[i].selected = true;
                            }
                        }
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
            if(!checkValue()){
                shape.structure.dom.classList.add('borderRed');
                stream.bubbleNotify.setBubble('le format de '+shape.options.queryLabel+' est faut',{error:true});
                return false;
            }
			return {
				label:shape.options.queryLabel,
				value:shape.structure.dom.value,
			}
		}
        if(shape.options.parentObject){
            let currentShape =this.shapeActivity[stream.activityManager.currentActivity].shapes;
            if(currentShape){
                currentShape[shape.options.parentObject].structure.structure.content[shape.options.queryLabel] = {dom:input,shape:shape};
            }
        }
        return{
			dom:input,
			getValue:getValue,
        }
	}
	constructSubmit(shape,container){
		let buttonSubmit = constructDomElement('div','buttonsubmit',{parent:container});
        console.log(shape.options);
        if(shape.options.content){
            buttonSubmit.innerText = shape.options.content;
        }
		let sendElement = function(){
            let shapesActivty = stream.builder.shapeActivity[stream.activityManager.currentActivity].shapes;
			let queryArray = [];
			for(let i in shape.options.listInput){
                /*type of */
                let currentValue;
               switch(typeof(shape.options.listInput[i])){
                    case 'object':
                        let currentInput = shapesActivty[shape.options.listInput[i].input];
                        currentValue = currentInput.structure.getValue(currentInput);
                        if(currentValue == false && !shape.options.listInput[i].options){
                            return false;
                        }
                        queryArray.push(currentValue);
                        break;
                    case 'string':
                        currentValue = shapesActivty[shape.options.listInput[i]].structure.getValue(shapesActivty[shape.options.listInput[i]]);
                        if(currentValue == false){
                            return false;
                        }
                        queryArray.push(currentValue);
                        break;
                    default:
                        return false;
                }
            }
            let options = {action:shape.options.action};
            if(shape.options.endpoint){
                options.endpoint = shape.options.endpoint;
            }
            if(shape.options.getAction){
                switch(shape.options.getAction){
                    case 'byParent':
                        options.action = shapesActivty[shape.options.parentObject].structure.structure.statement.currentStatement;
                        break;
                }
                if(options.action == 'update'){
                    queryArray.push( {'label':'parent','value':shapesActivty[shape.options.parentObject].structure.structure.element.token});
                }
                console.warn(shapesActivty[shape.options.parentObject] )
            }
			stream.requestManager.sendQuery(queryArray,options,shape);
        };

        buttonSubmit.addEventListener('click',function(){
			sendElement();
        });
        window.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                sendElement();
            }
        });
        if(shape.options.parentObject){
            let currentShape =this.shapeActivity[stream.activityManager.currentActivity].shapes;
            if(currentShape){
                currentShape[shape.options.parentObject].structure.structure.content[shape.options.queryLabel] = buttonSubmit;
            }
        }
		return{
			dom:container,
			button:buttonSubmit
		}
		
    }
    constructDiv(shape,container){
        if(shape.options){
            if(shape.options.callBack){
                let options = {action:shape.options.callBack.action,endpoint:shape.options.callBack.endpoint};
                let query = shape.options.callBack.query;
                stream.requestManager.sendQuery(query,options,shape);
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
        let listeStatement = options.listeStatement;
		if(options){
			if(options.title){
				title.innerText = options.title;
			}
		}
		let closeFunc = function (test){
			container.classList.add('displayNone');
            for(let i in shape.structure.structure.content){
                if(typeof(shape.structure.structure.content[i].dom)=='object'){
                    shape.structure.structure.content[i].dom.classList.remove('displayNone');
                    shape.structure.structure.content[i].dom.value = '';
                    if(typeof(shape.structure.structure.content[i].shape.options.defaultValue)!='undefined'){
                        shape.structure.structure.content[i].dom.value = shape.structure.structure.content[i].shape.options.defaultValue+1;
                    }
                }
            }
            if(typeof(shape.structure.structure.statement)!='undefined'){
                shape.structure.structure.statement.currentStatement =  shape.structure.structure.statement.listeStatement[0];
            }
		}
		let showFunc = function (){
			container.classList.remove('displayNone');
		}
		close.addEventListener('click',function(){
			closeFunc(this);
		});
		return{
			dom:body,
			structure:{
				window:containerWindow,
				topWindow:top,
				parent:container, 
				body:body,
                content:{},
                statement:{currentStatement:listeStatement[0],listeStatement:listeStatement},
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