"use strict"
class Stream {
    constructor (){
        this.cacheParameters = {};
        this.requestManager = requestManager.getInstance();
        this.adapter = adapter.getInstance();
        this.bubbleNotify = new bubbleNotify;
        this.objectLoaded={
            rank:[
                {
                  "id": "1",
                  "rank": "JSP",
                  "abv": "JSP",
                  "type": "rank"
                },
                {
                  "id": "2",
                  "rank": "flamme1",
                  "abv": "flamme1",
                  "type": "rank"
                },
                {
                  "id": "3",
                  "rank": "flamme2",
                  "abv": "flamme2",
                  "type": "rank"
                },
                {
                  "id": "4",
                  "rank": "flamme3",
                  "abv": "flamme3",
                  "type": "rank"
                },
                {
                  "id": "5",
                  "rank": "sapeur",
                  "abv": "sp",
                  "type": "rank"
                },
                {
                  "id": "6",
                  "rank": "appointé",
                  "abv": "app",
                  "type": "rank"
                },
                {
                  "id": "7",
                  "rank": "caporal",
                  "abv": "cpl",
                  "type": "rank"
                },
                {
                  "id": "8",
                  "rank": "sergent",
                  "abv": "sgt",
                  "type": "rank"
                },
                {
                  "id": "9",
                  "rank": "sergent chef",
                  "abv": "sgt chef",
                  "type": "rank"
                },
                {
                  "id": "10",
                  "rank": "sergent-major",
                  "abv": "sgtm",
                  "type": "rank"
                },
                {
                  "id": "11",
                  "rank": "fourrier",
                  "abv": "four",
                  "type": "rank"
                },
                {
                  "id": "12",
                  "rank": "sergent-major chef",
                  "abv": "sgtm chef",
                  "type": "rank"
                },
                {
                  "id": "13",
                  "rank": "adjudant sof",
                  "abv": "adj sof",
                  "type": "rank"
                },
                {
                  "id": "14",
                  "rank": "adjudant-chef",
                  "abv": "adj chef",
                  "type": "rank"
                },
                {
                  "id": "15",
                  "rank": "lieutenant",
                  "abv": "lt",
                  "type": "rank"
                },
                {
                  "id": "16",
                  "rank": "premier-lieutenant",
                  "abv": "plt",
                  "type": "rank"
                },
                {
                  "id": "17",
                  "rank": "capitaine",
                  "abv": "cap",
                  "type": "rank"
                },
                {
                  "id": "18",
                  "rank": "major",
                  "abv": "maj",
                  "type": "rank"
                }
              ],

              
        };
    }
    reloadContent(shape) {
        while (shape.structure.dom.firstChild){
            delete shape.structure.dom.removeChild(shape.structure.dom.firstChild);
        };
        if(shape.options.callBack){
            console.log(shape);
            let options = {
              action: shape.options.callBack.action,
              endpoint:shape.options.callBack.endpoint
            };
            let query = shape.options.callBack.query;
            stream.requestManager.sendQuery(query,options,shape)
        }

    }
}