/*namespace Firework {

    interface Rocket { 
        Name:string, 
        Form:string, 
        Farbe:string,
        Radius:number,
        Lebensdauer:number,
        AnzahlPartikel:string
     } 

    window.addEventListener("load", handleLoad);
    let serverPage: string = "http://localhost:5001/";
    let form: HTMLFormElement;
    let quantity: number;
    let color: string;
    let lifetime: number;
    let shape: string;
    let moveables: MoveableObject[] = [];
    let result: Rocket;
    export let crc2: CanvasRenderingContext2D;


    async function handleLoad(_event: Event): Promise<void> {
        console.log("HalloWelt");

        


        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        canvas.addEventListener("click", createObject);
        
        window.setInterval(update, 20);
    }




    function createObject(_event: MouseEvent): void {


        let mousePositionX: number = _event.clientX; //- crc2.canvas.offsetLeft;
        let mousepositionY: number = _event.clientY; //- crc2.canvas.offsetTop;
        
        createParticle(quantity, mousePositionX, mousepositionY, color, lifetime, shape);
    }

    


    /*function createUserRocket(_result: Rocket): void {

        let color: string = _result.particlecolor;
        let lifetime: number = _result.explosionSize;
        let shape: string = _result.particleshape;
        let quantity: number = _result.quantity;
        console.log("Das ist deine Rakete", "Particleshape= ", shape, "Particlecolor= ", color, "ExplosionSize= ", lifetime, "Particleqoantity= ", quantity);
        // erzeugt neuer Particle mit diesen Werten und pusht ihn in moveable Array
        // eine Funktion die z.B. auf MouseUp hört, erzeugt eine Explosion mit diesen Werten

    }

    function createParticle(_quantity: number, _mousePositionX: number, _mousePositionY: number, _color: string, _lifetime: number, _type: string): void {

        let origin: Vector = new Vector(_mousePositionX, _mousePositionY);
        let color: string = _color;

        for (let i: number = 0; i < _quantity; i++) {
            let radian: number = (Math.PI * 2) / _quantity;
            let px: number = Math.cos(radian * i) * 110 * Math.random() * 2; //(2)power
            let py: number = Math.sin(radian * i) * 110 * Math.random() * 2; //(2)power
            let velocity: Vector = new Vector(px, py);
            let particle: MoveableObject = new Particle(origin, velocity, color, lifetime, shape);
            moveables.push(particle);

        }
    }



    function update(): void {

        crc2.fillStyle = "rgba(0,0,0,0.2)";
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);

        for (let moveable of moveables) {
            moveable.move(1 / 50);
            moveable.draw();
        }
        deleteExpandables();
    }


    function deleteExpandables(): void {
        for (let index: number = moveables.length - 1; index >= 0; index--) {
            if (moveables[index].expendable) //im Array an stelle des gerade befindenden Index
                moveables.splice(index, 1);
        }
    }


    function startMeter(_event: Event): void {
        let target: HTMLInputElement = <HTMLInputElement>_event.target;
        let meter: HTMLMeterElement = <HTMLMeterElement>document.querySelector("meter");
        meter.value = parseFloat(target.value);

    }

}*/