import { Resource } from "./resource.js";

export class ResourceManager {

    constructor(inventory) {

        this.inventory = inventory;
        this.resources = [];

        this.interactPressed = false;

        this.spawnResources();

    }

    spawnResources(){

        for(let i=0;i<60;i++){

            this.resources.push(
                new Resource(
                    (Math.random()-0.5)*2000,
                    (Math.random()-0.5)*2000,
                    "biomass"
                )
            );

        }

        for(let i=0;i<40;i++){

            this.resources.push(
                new Resource(
                    (Math.random()-0.5)*7000,
                    (Math.random()-0.5)*7000,
                    "crystal"
                )
            );

        }

        for(let i=0;i<20;i++){

            this.resources.push(
                new Resource(
                    (Math.random()-0.5)*7000,
                    (Math.random()-0.5)*7000,
                    "energy"
                )
            );

        }

    }

    update(player, keys){

        const interact = keys["e"];

        for(const resource of this.resources){

    resource.update();

    if(resource.collected)
        continue;

            if(resource.isNear(player)){

                if(interact && !this.interactPressed){

                    if (player.carrying === null) {

    player.carrying = resource.type;
    resource.collect();

}

                }

            }

        }

        this.interactPressed = interact;

    }

    draw(ctx){

        for(const resource of this.resources){

            resource.draw(ctx);

        }

    }

}