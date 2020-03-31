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
        let form = constructDomElement('form',className,{parent:container,extraAtributes:{action:'javascript:void(0);'}})

        console.log(form,container);
        return {
            dom:form
        }
    }
    constructInput(shape,container){
    }
}