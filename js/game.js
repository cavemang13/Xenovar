import { Player } from "./player.js";
import { Camera } from "./camera.js";
import { World } from "./world.js";
import { ResourceManager } from "./resourceManager.js";
import { Inventory } from "./inventory.js";
import { Xenovar } from "./xenovar.js";

export class Game {

    constructor(canvas, ctx) {

        this.canvas = canvas;
        this.ctx = ctx;

        this.player = new Player();
        this.camera = new Camera(canvas);
        this.world = new World();
        this.xenovar = new Xenovar();

        this.inventory = new Inventory();
        this.resourceManager = new ResourceManager(this.inventory);

    }

    update(keys) {

        this.player.update(keys);
        this.camera.update(this.player);
        this.xenovar.update();

        this.resourceManager.update(this.player, keys);

        // Deposit carried resource into the Xenovar
        if (this.player.carrying && this.xenovar.isNear(this.player)) {

            this.inventory.add(this.player.carrying);
            this.xenovar.addXP(1);
            this.player.carrying = null;

        }

    }

    draw() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.save();

        this.ctx.translate(
            -this.camera.x,
            -this.camera.y
        );

        this.world.draw(this.ctx);
        this.xenovar.draw(this.ctx);
        this.resourceManager.draw(this.ctx);
        this.player.draw(this.ctx);

        this.ctx.restore();

        this.drawUI();

    }

    drawUI() {

        this.ctx.fillStyle = "white";
        this.ctx.font = "20px Arial";

        // HUD
        this.ctx.fillText("XENOVAR", 20, 30);

        this.ctx.fillText(`Biomass: ${this.inventory.biomass}`, 20, 70);
        this.ctx.fillText(`Crystal: ${this.inventory.crystal}`, 20, 100);
        this.ctx.fillText(`Energy: ${this.inventory.energy}`, 20, 130);

        this.ctx.fillText(`Hive Level: ${this.xenovar.level}`, 20, 170);
        this.ctx.fillText(`Hive XP: ${this.xenovar.xp}/${this.xenovar.maxXP}`, 20, 200);

        // Collect prompt
        for (const resource of this.resourceManager.resources) {

            if (resource.collected) continue;

            if (resource.isNear(this.player)) {

                this.ctx.fillStyle = "white";
                this.ctx.font = "24px Arial";

                this.ctx.fillText(
                    "Press E to Collect",
                    this.canvas.width / 2 - 110,
                    this.canvas.height - 40
                );

                break;
            }
        }

        // Deposit prompt
        if (this.player.carrying && this.xenovar.isNear(this.player)) {

            this.ctx.fillStyle = "#8bffb4";
            this.ctx.font = "24px Arial";

            this.ctx.fillText(
                "Depositing...",
                this.canvas.width / 2 - 70,
                this.canvas.height - 70
            );

        }

    }

}