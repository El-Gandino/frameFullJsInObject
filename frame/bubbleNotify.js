class bubbleNotify{
	constructor(){
		this.container = constructDomElement('div','bubbleNotifyContainer displayNone');
		this.content = constructDomElement('div','bubbleNotifyContent',{parent:this.container});
		this.close = constructDomElement('div','bubbleNotifyClose',{parent:this.container});
	}
	setBubble(content,options){
		if(!this.container.parentElement){
			document.body.appendChild(this.container);
		} 
		if(options){
            if(!options.liveTime || typeof(options.liveTime) != 'number'){
                options.liveTime = 900;
			}
			if(options.error){
				this.container.classList.add('bubbleError');
			}
        }else{
            options = {
                liveTime : 900,
            };
        }
        if(typeof(content) != 'string'){
            console.ware('ereur dans le contenue de la bulle');
		} 
		this.content.innerText = content;
		this.showBubble(options.liveTime);
	}
	showBubble(time){
		console.log(time);
        this.container.classList.remove('displayNone');
        setTimeout(this.destructContent, time);
	}
	destructContent(){
		stream.bubbleNotify.container.classList.add('displayNone');
		
		this.container.classList.remove('bubbleError');    
	}
}