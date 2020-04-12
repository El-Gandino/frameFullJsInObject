"use strict"
class Stream {
    constructor (){
        this.cacheParameters = {};
        this.requestManager = requestManager.getInstance();
        this.adapter = adapter.getInstance();
    }
    reloadContent(shape) {
        while (shape.structure.dom.firstChild){
            delete shape.structure.dom.removeChild(shape.structure.dom.firstChild);
        };
        if(shape.options.callBack){
            let options = {action:shape.options.callBack.action};
            let query = shape.options.callBack.query;
            stream.requestManager.sendQuery(query,options,shape)
        }

    }
}