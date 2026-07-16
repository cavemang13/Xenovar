export class Xenovar {

    constructor() {

        this.x = 0;
        this.y = 0;

        this.radius = 60;

        this.level = 1;
        this.xp = 0;
        this.maxXP = 10;

        this.time = 0;
        this.rotation = 0;

    }

    update() {

        this.time += 0.03;
        this.rotation += 0.01;

    }

    draw(ctx) {

        const pulse = Math.sin(this.time) * 5;

        // Outer aura
        ctx.beginPath();
        ctx.arc(
            this.x,
            this.y,
            this.radius + 22 + pulse,
            0,
            Math.PI * 2
        );
        ctx.fillStyle = "rgba(170,80,255,0.12)";
        ctx.fill();

        // Rotating organic ring
        ctx.save();

        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        ctx.strokeStyle = "#9d5dff";
        ctx.lineWidth = 6;

        ctx.beginPath();
        ctx.ellipse(
            0,
            0,
            this.radius + 12,
            this.radius - 8,
            0,
            0,
            Math.PI * 2
        );

        ctx.stroke();

        ctx.restore();

        // Main body
        ctx.beginPath();
        ctx.arc(
            this.x,
            this.y,
            this.radius + pulse,
            0,
            Math.PI * 2
        );
        ctx.fillStyle = "#6e2eff";
        ctx.fill();

        // Inner membrane
        ctx.beginPath();
        ctx.arc(
            this.x,
            this.y,
            this.radius * 0.65,
            0,
            Math.PI * 2
        );
        ctx.fillStyle = "#9f72ff";
        ctx.fill();

        // Energy core
        ctx.beginPath();
        ctx.arc(
            this.x,
            this.y,
            20 + pulse * 0.3,
            0,
            Math.PI * 2
        );
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