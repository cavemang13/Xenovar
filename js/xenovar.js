export class Xenovar {

    constructor() {

        this.x = 0;
        this.y = 0;

        this.radius = 60;

        this.level = 1;
        this.xp = 0;
        this.maxXP = 10;

        this.time = 0;

    }

    update() {

        this.time += 0.03;

    }

    draw(ctx) {

        const pulse = Math.sin(this.time) * 5;

        // Outer glow
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius + 15 + pulse, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(150,0,255,0.25)";
        ctx.fill();

        // Main core
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius + pulse, 0, Math.PI * 2);
        ctx.fillStyle = "#8b3dff";
        ctx.fill();

        // Center
        ctx.beginPath();
        ctx.arc(this.x, this.y, 18, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();

    }

    addXP(amount) {

        this.xp += amount;

        if (this.xp >= this.maxXP) {

            this.level++;
            this.xp = 0;
            this.maxXP += 10;

        }

    }

    isNear(player) {

        const dx = player.x - this.x;
        const dy = player.y - this.y;

        return Math.sqrt(dx * dx + dy * dy) < this.radius + 30;

    }

}