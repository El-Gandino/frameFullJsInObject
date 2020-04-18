class bubbleNotify{
	constructor(){
		this.dom = constructDomElement('div','bubbleNotifyContainer displayNone');
		this.content = constructDomElement('div','bubbleNotifyContent',{parent:this.dom});
		this.close = constructDomElement('div','bubbleNotifyClose',{parent:this.dom});
	}
	setBubble(content,options){
		if(!this.dom.parentElement){
			document.body.appendChild(this.dom);
		} 
		if(options){
            if(!options.liveTime || typeof(options.liveTime) != 'number'){
                options.liveTime = 900;
            }
        }else{
            options = {
                liveTime : 900,
            };
        }
        if(typeof(content) != 'string'){
            console.ware('ereur dans le contenue de la bubbule');
		} 
		this.content.innerText = content;
		this.showBubble(options.liveTime);
	}
	showBubble(time){
		console.log(time);
        this.dom.classList.remove('displayNone');
        setTimeout(this.destructContent, time);
	}
	destructContent(){
		stream.bubbleNotify.dom.classList.add('displayNone');        
	}
}