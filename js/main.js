import { Game } from "./game.js";
import { keys } from "./input.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();

const game = new Game(canvas, ctx);

function gameLoop() {

    game.update(keys);

    game.draw();

    requestAnimationFrame(gameLoop);

}

gameLoop();