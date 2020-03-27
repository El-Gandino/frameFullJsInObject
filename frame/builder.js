class builder{
    constructor(){
        if (!this.builder) {
            this.builder = this;
        }
        return this;
    }
    constructActivity(activityId,currentBody){
        if(!this.structure){
            this.structure = new structure; 
        }
        if(!this.shapeActivity){
            this.shapeActivity = {};
		}
        this.body = currentBody.container;
		console.log(this.shapeActivity);
		//if(!this.activityBodyList[activityId]){
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
        console.log(shape);
        if(typeof(shape) === 'undefined' || !shape.type || !shape.name){
			console.log('some parameters not provided.', shape);
			return false;
        }
        /*if(!this.body){}*/
        console.log(shape.type[0].toUpperCase() + shape.type.slice(1));
        let className = shape.type + shape.name;
        if(!this['construct'+shape.type[0].toUpperCase() + shape.type.slice(1)]){
            console.warn('shape : construct'+shape.type[0].toUpperCase() + shape.type.slice(1)+ ' not exist');
            return false;
        }
        /*parent*/
        let container =  constructDomElement('div',className,{parent:this.body})
        this['construct'+shape.type[0].toUpperCase() + shape.type.slice(1)](shape,container);
    }
    /*constructor*/
    constructSlider(shape,container){
        console.log(shape,container);
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

        console.log(listImages);
    }
    constructForm(shape,container){
        console.log(shape,container);
    }
}