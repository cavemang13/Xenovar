export class Player {

    constructor() {

        this.x = 300;
        this.y = 300;

        this.radius = 15;
        this.speed = 4;

        // Resource currently being carried
        this.carrying = null;

    }

    update(keys) {

        if (keys["w"]) this.y -= this.speed;
        if (keys["s"]) this.y += this.speed;
        if (keys["a"]) this.x -= this.speed;
        if (keys["d"]) this.x += this.speed;

    }

    draw(ctx) {

        // Player
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#b45cff";
        ctx.fill();

        // Draw carried resource above the player
        if (this.carrying) {

            let color = "#ffffff";

            switch (this.carrying) {

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

            ctx.beginPath();
            ctx.arc(this.x, this.y - 28, 8, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();

        }

    }

}