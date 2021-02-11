export namespace Firework_Testing {
    window.addEventListener("load", handleLoad);

    export let crc2: CanvasRenderingContext2D;

    export function handleLoad(_event: Event): void {
        console.log("starting");
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        canvas.height = innerHeight;
        canvas.width = innerWidth;

        crc2.fillStyle = '#000033';
        crc2.fillRect(0, 0, canvas.width, canvas.height);
    }


    const mouse = {
        x: innerWidth / 2,
        y: innerHeight / 2
    }

    window.addEventListener('click',(_event) => {
        console.log("Klick");
        mouse.x = _event.clientX
        mouse.y = _event.clientY
        for(let i = 0; i < 400; i++){
         //   particles.push(new Particle(mouse.x, mouse.y))
        }
     })

}