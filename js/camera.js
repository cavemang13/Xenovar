export class Camera {

    constructor(canvas){

        this.canvas = canvas;

        this.x = 0;
        this.y = 0;

    }

    update(player){

        this.x = player.x - this.canvas.width / 2;
        this.y = player.y - this.canvas.height / 2;

    }

}