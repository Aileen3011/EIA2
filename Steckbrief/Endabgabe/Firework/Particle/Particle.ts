namespace Firework {
    export class Particle extends Moveable {
        private static gravity: number = 1;
        public form: string;
        private lebensdauer: number;
        private farbe: string;


        constructor(_position: Vector,  _form: string,  _farbe: string, _lebensdauer: number, _velocity: Vector) { 
            super(_position);
            this.velocity = _velocity.copy();
            this.form = _form;
            this.lebensdauer = _lebensdauer;
            this.farbe = _farbe;
            
        }

        public move(_timeslice: number): void {    
              super.move(_timeslice);  
              this.velocity.y += Particle.gravity;   
              this.lebensdauer -= _timeslice;
              if (this.lebensdauer < 0)
                  this.expendable = true;
          } 

        public draw(): void {
            switch (this.form) {
                case "Kreis":
                    crc2.save();
                    crc2.translate(this.position.x, this.position.y);
                    crc2.beginPath();
                    crc2.fillStyle = this.farbe;
                    crc2.arc(0, 0, 3.5, 0, 2 * Math.PI);
                    crc2.closePath();
                    crc2.fill();
                    crc2.restore();
                    break;
                case "Quadrat":
                    crc2.save();
                    crc2.translate(this.position.x, this.position.y);
                    crc2.beginPath();
                    crc2.fillStyle = this.farbe;
                    crc2.fillRect(0, 0, 7, 7);
                    crc2.closePath();
                    crc2.restore();
                    break;
                case "Dreieck":
                    crc2.save();
                    crc2.translate(this.position.x, this.position.y);
                    crc2.beginPath();
                    crc2.fillStyle = this.farbe;
                    crc2.moveTo(15, 10);
                    crc2.lineTo(20, 15);
                    crc2.lineTo(20,5);
                    crc2.closePath();
                    crc2.fill();
                    crc2.restore();
                    break;
                case "Herz":
                    crc2.save();
                    crc2.translate(this.position.x, this.position.y);
                    crc2.beginPath();
                    crc2.fillStyle = this.farbe;
                    crc2.moveTo(7.5, 4);
                    crc2.bezierCurveTo(7.5, 3.7, 7, 2.5, 5, 2.5);
                    crc2.bezierCurveTo(2, 2.5, 2, 6.25, 2, 6.25);
                    crc2.bezierCurveTo(2, 8, 4, 10.2, 7.5, 12);
                    crc2.bezierCurveTo(11, 10.2, 13, 8, 13, 6.25);
                    crc2.bezierCurveTo(13, 6.25, 13, 2.5, 10, 2.5);
                    crc2.bezierCurveTo(8.5, 2.5, 7.5, 3.7, 7.5, 4);
                    crc2.closePath();
                    crc2.fill();
                    crc2.restore();
                    break;
            }
        }
    }
}