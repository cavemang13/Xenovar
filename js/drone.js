import {
    DRONE_SPEED,
    DRONE_ORBIT_RADIUS,
    DRONE_ORBIT_SPEED
} from "./constants.js";
export class Drone {

    constructor(x, y) {

        this.homeX = x;
        this.homeY = y;

        this.x = x;
        this.y = y;

        this.angle = Math.random() * Math.PI * 2;

       this.orbitRadius = DRONE_ORBIT_RADIUS;
        this.speed = DRONE_ORBIT_SPEED;
        this.moveSpeed = DRONE_SPEED;

        this.state = "orbit";
        this.target = null;
        this.carrying = null;

    }

    update(resourceManager, xenovar, inventory) {

        // Keep Xenovar position updated
        this.homeX = xenovar.x;
        this.homeY = xenovar.y;

        // ======================
        // ORBIT
        // ======================
        if (this.state === "orbit") {

            this.angle += this.speed;

            this.x =
                this.homeX +
                Math.cos(this.angle) * this.orbitRadius;

            this.y =
                this.homeY +
                Math.sin(this.angle) * this.orbitRadius;

            // Find a resource
            for (const resource of resourceManager.resources) {

                if (!resource.collected) {

                    this.target = resource;
                    this.state = "moving";
                    break;

                }

            }

        }

        // ======================
        // MOVE TO RESOURCE
        // ======================
        else if (this.state === "moving") {

            // Resource disappeared
            if (!this.target || this.target.collected) {

                this.target = null;
                this.state = "orbit";
                return;

            }

            const dx = this.target.x - this.x;
            const dy = this.target.y - this.y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > this.moveSpeed) {

                this.x += (dx / distance) * this.moveSpeed;
                this.y += (dy / distance) * this.moveSpeed;

            } else {

                // Pick up resource
                this.target.collect();

                this.carrying = this.target.type;

                this.state = "returning";

            }

        }

        // ======================
        // RETURN TO XENOVAR
        // ======================
        else if (this.state === "returning") {

            const dx = this.homeX - this.x;
            const dy = this.homeY - this.y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > this.moveSpeed) {

                this.x += (dx / distance) * this.moveSpeed;
                this.y += (dy / distance) * this.moveSpeed;

            } else {

                // Deposit resource
                if (this.carrying) {

                    inventory.add(this.carrying);

                    this.carrying = null;

                }

                this.target = null;
                this.state = "orbit";

            }

        }

    }

    draw(ctx) {

        // Glow
        ctx.beginPath();
        ctx.arc(
            this.x,
            this.y,
            12,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "rgba(100,255,255,0.3)";
        ctx.fill();

        // Body
        ctx.beginPath();
        ctx.arc(
            this.x,
            this.y,
            7,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "#6fffff";
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(
            this.x,
            this.y,
            3,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "#ffffff";
        ctx.fill();

    }

}