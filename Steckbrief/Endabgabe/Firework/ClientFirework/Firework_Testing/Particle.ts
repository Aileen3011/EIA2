namespace Firework_Testing{
   export class Particle{
       velocity: number
       color: string
       radius: number
       x: number
       y: number

    constructor(x: number, y: number, radius: number, color: string, velocity: number){
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity

   }

  drawParticle(){
    
       /*crc2.beginPath();
       crc2.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
       crc2.fillStyle = this.color
       crc2.fill()
       crc2.closePath()*/
   }

   update(){
       this.drawParticle();
   }
}
}