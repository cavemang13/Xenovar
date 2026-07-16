export class Shop {

    constructor() {

        this.open = false;

        this.fPressed = false;
        this.escPressed = false;

    }

    update(keys, player, xenovar) {

        // Toggle with F when near the Xenovar
        if (
            keys["f"] &&
            !this.fPressed &&
            xenovar.isNear(player)
        ) {

            this.open = !this.open;

        }

        this.fPressed = keys["f"];

        // Close with Escape
        if (
            keys["escape"] &&
            !this.escPressed
        ) {

            this.open = false;

        }

        this.escPressed = keys["escape"];

    }

}