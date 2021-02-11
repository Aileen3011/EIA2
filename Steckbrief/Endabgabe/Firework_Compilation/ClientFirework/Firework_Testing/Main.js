"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Firework_Testing = void 0;
var Firework_Testing;
(function (Firework_Testing) {
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        console.log("starting");
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        Firework_Testing.crc2 = canvas.getContext("2d");
        canvas.height = innerHeight;
        canvas.width = innerWidth;
        Firework_Testing.crc2.fillStyle = '#000033';
        Firework_Testing.crc2.fillRect(0, 0, canvas.width, canvas.height);
    }
    Firework_Testing.handleLoad = handleLoad;
    const mouse = {
        x: innerWidth / 2,
        y: innerHeight / 2
    };
    window.addEventListener('click', (_event) => {
        console.log("Klick");
        mouse.x = _event.clientX;
        mouse.y = _event.clientY;
        for (let i = 0; i < 400; i++) {
            //   particles.push(new Particle(mouse.x, mouse.y))
        }
    });
})(Firework_Testing = exports.Firework_Testing || (exports.Firework_Testing = {}));
//# sourceMappingURL=Main.js.map