"use strict";
var Firework_Testing;
(function (Firework_Testing) {
    class Particle {
        constructor(x, y, radius, color, velocity) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = color;
            this.velocity = velocity;
        }
        drawParticle() {
            crc2.beginPath();
            crc2.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            crc2.fillStyle = this.color;
            crc2.fill();
            crc2.closePath();
        }
        update() {
            this.drawParticle();
        }
    }
    Firework_Testing.Particle = Particle;
})(Firework_Testing || (Firework_Testing = {}));
//# sourceMappingURL=Particle.js.map