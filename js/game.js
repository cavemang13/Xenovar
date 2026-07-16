import { Player } from "./player.js";
import { Camera } from "./camera.js";
import { World } from "./world.js";
import { ResourceManager } from "./resourceManager.js";
import { Inventory } from "./inventory.js";
import { Xenovar } from "./xenovar.js";
import { Shop } from "./shop.js";
import { Drone } from "./drone.js";

import {
    SHOP_WIDTH,
    SHOP_HEIGHT
} from "./constants.js";

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

        this.shop = new Shop();

        // Drone system
        this.harvesterDrones = 0;
        this.drones = [];

        // Prevent holding key
        this.buyPressed = false;

    }

 update(keys) {

    // Update player and world
    this.player.update(keys);
    this.camera.update(this.player);
    this.xenovar.update();

    this.resourceManager.update(
        this.player,
        keys
    );

    this.shop.update(
        keys,
        this.player,
        this.xenovar
    );

    // Buy Harvester Drone
    const buyDrone = keys["1"];

    if (
        this.shop.open &&
        buyDrone &&
        !this.buyPressed &&
        this.inventory.biomass >= 20
    ) {

        this.inventory.biomass -= 20;

        this.harvesterDrones++;

        this.drones.push(
            new Drone(
                this.xenovar.x,
                this.xenovar.y
            )
        );

    }

    this.buyPressed = buyDrone;

    // Update drones
    for (const drone of this.drones) {

        drone.update(
            this.resourceManager,
            this.xenovar,
            this.inventory
        );

    }

    // Deposit carried resource
    if (
        this.player.carrying &&
        this.xenovar.isNear(this.player)
    ) {

        this.inventory.add(this.player.carrying);
        this.xenovar.addXP(1);
        this.player.carrying = null;

    }

}
    draw() {

        this.ctx.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );

        this.ctx.save();

        this.ctx.translate(
            -this.camera.x,
            -this.camera.y
        );

        this.world.draw(this.ctx);
        this.xenovar.draw(this.ctx);
        this.resourceManager.draw(this.ctx);

        // Draw drones
        for (const drone of this.drones) {

            drone.draw(this.ctx);

        }

        this.player.draw(this.ctx);

        this.ctx.restore();

        this.drawUI();

    }

    drawUI() {

        this.ctx.fillStyle = "white";
        this.ctx.font = "20px Arial";

        this.ctx.fillText("XENOVAR", 20, 30);
        this.ctx.fillText(`Biomass: ${this.inventory.biomass}`, 20, 70);
        this.ctx.fillText(`Crystal: ${this.inventory.crystal}`, 20, 100);
        this.ctx.fillText(`Energy: ${this.inventory.energy}`, 20, 130);

        this.ctx.fillText(`Hive Level: ${this.xenovar.level}`, 20, 170);
        this.ctx.fillText(`Hive XP: ${this.xenovar.xp}/${this.xenovar.maxXP}`, 20, 200);

        this.ctx.fillText(`Harvester Drones: ${this.harvesterDrones}`, 20, 240);

        // Collect prompt
        if (!this.shop.open) {

            for (const resource of this.resourceManager.resources) {

                if (resource.collected) continue;

                if (resource.isNear(this.player)) {

                    this.ctx.font = "24px Arial";

                    this.ctx.fillText(
                        "Press E to Collect",
                        this.canvas.width / 2 - 110,
                        this.canvas.height - 40
                    );

                    break;
                }
            }
        }

        // Xenovar prompt
        if (
            !this.shop.open &&
            this.xenovar.isNear(this.player)
        ) {

            this.ctx.font = "24px Arial";
            this.ctx.fillStyle = "#8bffb4";

            this.ctx.fillText(
                "Press F to Access Xenovar",
                this.canvas.width / 2 - 150,
                this.canvas.height - 80
            );

        }

        // Shop
        if (this.shop.open) {

            this.ctx.fillStyle = "rgba(0,0,0,0.8)";
           this.ctx.fillRect(
    180,
    80,
    SHOP_WIDTH,
    SHOP_HEIGHT
);;

            this.ctx.strokeStyle = "#8b3dff";
            this.ctx.lineWidth = 3;
           this.ctx.strokeRect(
    180,
    80,
    SHOP_WIDTH,
    SHOP_HEIGHT
);

            this.ctx.fillStyle = "#ffffff";
            this.ctx.font = "30px Arial";
            this.ctx.fillText("XENOVAR CORE", 280, 130);

            this.ctx.font = "22px Arial";

            this.ctx.fillText("1 - Buy Harvester Drone", 220, 190);
            this.ctx.fillText("Cost: 20 Biomass", 240, 225);

            this.ctx.fillText("2 - Drone Speed", 220, 290);
            this.ctx.fillText("Cost: 15 Crystal", 240, 325);

            this.ctx.fillText("3 - Storage Upgrade", 220, 390);
            this.ctx.fillText("Cost: 10 Energy", 240, 425);

            this.ctx.fillStyle = "#8bffb4";
            this.ctx.fillText("ESC - Close", 220, 470);

        }

        // Deposit prompt
        if (
            !this.shop.open &&
            this.player.carrying &&
            this.xenovar.isNear(this.player)
        ) {

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