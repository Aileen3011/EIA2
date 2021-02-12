"use strict";
var Firework;
(function (Firework) {
    class Particle extends Firework.Moveable {
        constructor(_position, _velocity, _farbe, _lebensdauer, _form) {
            super(_position);
            this.farbe = _farbe;
            this.velocity = _velocity.copy();
            this.lebensdauer = _lebensdauer;
            this.form = _form;
        }
        move(_timeslice) {
            super.move(_timeslice);
            this.velocity.y += Particle.gravity;
            this.lebensdauer -= _timeslice;
            if (this.lebensdauer < 0)
                this.expendable = true;
        }
        draw() {
            switch (this.form) {
                case "Kreis":
                    Firework.crc2.save();
                    Firework.crc2.beginPath();
                    Firework.crc2.translate(this.position.x, this.position.y);
                    Firework.crc2.arc(0, 0, 3.5, 0, 2 * Math.PI);
                    Firework.crc2.closePath();
                    Firework.crc2.fillStyle = this.farbe;
                    Firework.crc2.fill();
                    Firework.crc2.restore();
                    break;
                case "Quadrat":
                    Firework.crc2.save();
                    Firework.crc2.beginPath();
                    Firework.crc2.translate(this.position.x, this.position.y);
                    Firework.crc2.fillStyle = this.farbe;
                    Firework.crc2.fillRect(0, 0, 7, 7);
                    Firework.crc2.closePath();
                    Firework.crc2.restore();
                    break;
                case "Dreieck":
                    Firework.crc2.save();
                    Firework.crc2.beginPath();
                    Firework.crc2.translate(this.position.x, this.position.y);
                    Firework.crc2.fillStyle = this.farbe;
                    Firework.crc2.moveTo(15, 10);
                    Firework.crc2.lineTo(20, 15);
                    Firework.crc2.lineTo(20, 5);
                    Firework.crc2.closePath();
                    Firework.crc2.fill();
                    Firework.crc2.restore();
                    break;
                case "Herz":
                    Firework.crc2.save();
                    Firework.crc2.beginPath();
                    Firework.crc2.translate(this.position.x, this.position.y);
                    Firework.crc2.fillStyle = this.farbe;
                    Firework.crc2.moveTo(7.5, 4);
                    Firework.crc2.bezierCurveTo(7.5, 3.7, 7, 2.5, 5, 2.5);
                    Firework.crc2.bezierCurveTo(2, 2.5, 2, 6.25, 2, 6.25);
                    Firework.crc2.bezierCurveTo(2, 8, 4, 10.2, 7.5, 12);
                    Firework.crc2.bezierCurveTo(11, 10.2, 13, 8, 13, 6.25);
                    Firework.crc2.bezierCurveTo(13, 6.25, 13, 2.5, 10, 2.5);
                    Firework.crc2.bezierCurveTo(8.5, 2.5, 7.5, 3.7, 7.5, 4);
                    Firework.crc2.closePath();
                    Firework.crc2.fill();
                    Firework.crc2.restore();
                    break;
            }
        }
    }
    Particle.gravity = 1;
    Firework.Particle = Particle;
})(Firework || (Firework = {}));
//# sourceMappingURL=Particle.js.map