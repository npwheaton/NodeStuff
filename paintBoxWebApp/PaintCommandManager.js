 class PaintCommandManager{
    constructor(){
        this.commandlist = [];
        this.redolist = [];

    }
    addNewCommand(paintobj){
        let array = []
        array.push(paintobj);
        let newCommand = {
            type: paintobj.type,
            author: paintobj.author,
            list: array,
            timestamp: 100000000000
        }
        this.commandlist.push(newCommand);
        

    }
    updateTimeStamp(command){
        let index = this.commandlist.indexOf(command);
        if(index>=0){
            this.commandlist[index].timestamp = command.timestamp;
        }
        
    }
    
    updateLastCommand(paintobj){
        let command = this.getLast(paintobj.author);
        let array = command.list;
       array.push(paintobj);
       let index = this.commandlist.indexOf(command);
       if(index>=0){
           this.commandlist[index].list = array;
       }
        
    }
    undo(author){
        this.commandlist = this.commandlist.sort((a, b)=>{return a.timestamp- b.timestamp;});
        let poppedCommand = this.getLast(author);
        let index = this.commandlist.indexOf(poppedCommand);
        this.commandlist.splice(index, 1);
        this.redolist.push(poppedCommand);
    }
    redo(author){
        this.redolist = this.redolist.sort((a, b)=>{return a.timestamp- b.timestamp;});
        let rlist = this.redolist.filter(element=>{return element.author ==author});
        let poppedCommand = rlist[rlist.length-1];
        //let poppedCommand = this.getLast(author);
        let index = this.redolist.indexOf(poppedCommand);
        this.redolist.splice(index, 1);
        this.commandlist.push(poppedCommand);
    }
    getCommandList(){
        return JSON.parse(JSON.stringify(this.commandlist));
    }
    getLast(author){
        let comlist = this.commandlist.filter(element=>{return element.author ==author});
        let command = comlist[comlist.length-1];
        return command;
    }
    updateList(command){
        this.commandlist.push(command);
    }
}
module.exports = PaintCommandManager;