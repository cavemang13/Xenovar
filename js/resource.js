export class Resource {

    constructor(x, y, type) {

        this.x = x;
        this.y = y;

        this.baseY = y;

        this.radius = 18;

        this.type = type;

        this.collected = false;

        this.time = Math.random() * 100;

    }

    update() {

        if (this.collected) return;

        this.time += 0.05;

        this.y = this.baseY + Math.sin(this.time) * 4;

    }

    draw(ctx) {

        if (this.collected) return;

        let color;

        switch(this.type){

            case "biomass":
                color = "#5cff84";
                break;

            case "crystal":
                color = "#8a7dff";
                break;

            case "energy":
                color = "#ffd447";
                break;

        }

        // Glow
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius + 8, 0, Math.PI * 2);
        ctx.fillStyle = color + "33";
        ctx.fill();

        // Main body
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

    }

    isNear(player){

        const dx = player.x - this.x;
        const dy = player.y - this.y;

        return Math.sqrt(dx*dx + dy*dy) < 45;

    }

    collect(){

        this.collected = true;

    }

}