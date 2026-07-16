export class World{

    constructor(){

        this.size = 8000;

        this.objects=[];

        for(let i=0;i<500;i++){

            this.objects.push({

                x:(Math.random()-0.5)*this.size*2,
                y:(Math.random()-0.5)*this.size*2,
                radius:10+Math.random()*20,
                type:Math.floor(Math.random()*3)

            });

        }

    }

    draw(ctx){

        ctx.fillStyle="#19341d";

        ctx.fillRect(-this.size,-this.size,this.size*2,this.size*2);

        for(const obj of this.objects){

            if(obj.type==0)
                ctx.fillStyle="#69ff89";

            if(obj.type==1)
                ctx.fillStyle="#7d7bff";

            if(obj.type==2)
                ctx.fillStyle="#ff4cff";

            ctx.beginPath();
            ctx.arc(obj.x,obj.y,obj.radius,0,Math.PI*2);
            ctx.fill();

        }

    }

}