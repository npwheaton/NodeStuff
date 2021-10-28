export default class Drawer{
    constructor(ctx){
        this.ctx = ctx;
        this.primarycolor = "black";
        this.secondarycolor = "white";
        this.height = "1";
        this.width = "1";
        this.opacity = "1";
        this.drawing = false;

        

    }
    render(command){
        /*  Command = {
                type: paintobj.type,
                author: paintobj.author,
                list: [],
                timestamp: 100000000000
            }
            paintobj={
                type: "type",
                author: "author",
                prevx: 1,
                prevy: 1,
                nowx: 1,
                nowy: 1,
                style: "N/A"
                color: "#hex",
                opacity: 1,
                width: 1
            }
        */
        if(command.length>0){
            command.forEach(cmd=>{
                
                switch (cmd.type) {
                    case "paint":
                        if(cmd.list){
                            cmd.list.forEach(element => {
                                this.draw(element);
                                
                            });
                        }
                        else{
                            this.draw(cmd);
                            
        
                        }
                        
                        break;
                
                    default:
                        break;
                }

            })
        }
        else{
            switch (command.type) {
                case "paint":
                    if(command.list>0){
                        command.list.forEach(element => {
                            this.draw(element);
                        });
                    }
                    else{
                        this.draw(command);
                        
    
                    }
                    
                    break;
            
                default:
                    break;
            }
        }
        
    }
    hexToRgb(hex){
        return hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,(m, r, g, b) => '#' + r + r + g + g + b + b)
       .substring(1).match(/.{2}/g)
       .map(x => parseInt(x, 16));
   }
   draw(paint){
        this.primarycolor = paint.color;
        this.width = paint.width;
        this.opacity = paint.opacity;
        this.ctx.lineWidth = this.width;
        this.ctx.lineCap = "round";
        this.ctx.beginPath();
        this.ctx.moveTo(paint.prevx, paint.prevy);
        this.ctx.lineTo(paint.nowx, paint.nowy);
        let rgb = this.hexToRgb(this.primarycolor);
        this.ctx.strokeStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]}, ${this.opacity}`;
                    //ctx.arc(mouse.x,mouse.y, Number(sizeslider.value),0, 2*Math.PI);
                    //ctx.fill();
         this.ctx.shadowColor = `rgb(${rgb[0]},${rgb[1]},${rgb[2]}`;
        this.ctx.shadowBlur = 2;
        this.ctx.stroke();
        this.ctx.closePath();
         
   }
   reRender(command, width, height){
       this.ctx.clearRect(0,0, width, height);
       this.render(command);
   }
}