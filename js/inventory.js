export class Inventory {

    constructor() {

        this.biomass = 0;
        this.crystal = 0;
        this.energy = 0;

    }

    add(type) {

        switch(type){

            case "biomass":
                this.biomass++;
                break;

            case "crystal":
                this.crystal++;
                break;

            case "energy":
                this.energy++;
                break;

        }

    }

}