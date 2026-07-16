import {
    RESOURCE_RADIUS,
    RESOURCE_PICKUP_DISTANCE
} from "./constants.js";


export class Resource {

    constructor(x, y, type) {

        this.x = x;
        this.y = y;

        this.baseY = y;

        this.radius = RESOURCE_RADIUS;

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

        const pulse = Math.sin(this.time * 3) * 2;
const glowRadius = this.radius + 8 + pulse;

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

        // Outer glow
ctx.beginPath();
ctx.arc(
    this.x,
    this.y,
    glowRadius,
    0,
    Math.PI * 2
);

ctx.fillStyle = color + "22";
ctx.fill();

// Inner glow
ctx.beginPath();
ctx.arc(
    this.x,
    this.y,
    this.radius + pulse * 0.4,
    0,
    Math.PI * 2
);

ctx.fillStyle = color + "66";
ctx.fill();

        // Main body
       ctx.fillStyle = color;

switch (this.type) {

    case "biomass":

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();

        break;

    case "crystal":

        ctx.beginPath();

        ctx.moveTo(this.x, this.y - this.radius);

        ctx.lineTo(this.x + this.radius * 0.8, this.y);

        ctx.lineTo(this.x, this.y + this.radius);

        ctx.lineTo(this.x - this.radius * 0.8, this.y);

        ctx.closePath();

        ctx.fill();

        break;

    case "energy":

        ctx.beginPath();
        ctx.arc(
            this.x,
            this.y,
            this.radius * 0.8 + pulse,
            0,
            Math.PI * 2
        );

        ctx.fill();

        break;

}
ctx.beginPath();

ctx.arc(
    this.x,
    this.y,
    5,
    0,
    Math.PI * 2
);

ctx.fillStyle = "#ffffff";

ctx.fill();

    }

    isNear(player){

        const dx = player.x - this.x;
        const dy = player.y - this.y;

        return Math.sqrt(dx * dx + dy * dy) < RESOURCE_PICKUP_DISTANCE;

    }

    collect(){

        this.collected = true;

    }

}