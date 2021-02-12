

namespace Firework {
    
    interface RocketDatabase { 
        ID:string,
        Name:string, 
        Form:string, 
        Farbe:string,
        Lebensdauer:number,
        AnzahlPartikel:number
     } 

     interface DeleteItem{
        name:string;
    }

    let url: string = "https://eia2wintersemester.herokuapp.com"
    let auswahl: number = 0;
    export let crc2: CanvasRenderingContext2D;
    let moveables: MoveableObject[] = [];
   
    window.addEventListener("load", handleLoad);

    async function handleLoad(_event: Event): Promise<void> {
        console.log("Init");
        
        let response: Response = await fetch(url + "/rockets");
        let responseText: string = await response.text();
        let rockets:RocketDatabase[]= JSON.parse(responseText);
        
        let output = document.getElementById("input")!;

        output.innerHTML="";
        let InputHTML:string = "";
        if (rockets.length==0) {
            InputHTML=InputHTML+"<span>No rockets created</span>"
        }

        for (let index = 0; index < rockets.length; index++) {
            if (index==0) {
                InputHTML = InputHTML +"<button class='Current' id='button"+index+"' type='submit'>"+rockets[index].Name+"</button><button class='restDel' id='buttonDel"+index+"' type='submit'><i class='fa fa-trash'></i></button><br>"
            }else{
            InputHTML = InputHTML +"<button class='rest' id='button"+index+"' type='submit'>"+rockets[index].Name+"</button><button class='restDel' id='buttonDel"+index+"' type='submit'><i class='fa fa-trash'></i></button><br>"
            }
        }
        console.log(InputHTML);
        output.innerHTML = InputHTML;
        
        createListener(rockets);

        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
           
        
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
        

        canvas.height = innerHeight;
        canvas.width = innerWidth;

        canvas.addEventListener("click", function(e){
            createObject(e,rockets)
        });
        
        window.setInterval(update, 20)
    }

    function createListener(rockets:RocketDatabase[]) {
        for (let index = 0; index < rockets.length; index++) {
            const button:HTMLElement = document.getElementById("button"+index)!;
            button.addEventListener("click",function(){
                chooseFirework(button.id,rockets);
            }, false);
            
            
        }

        for (let index = 0; index < rockets.length; index++) {
            const button:HTMLElement = document.getElementById("buttonDel"+index)!;
            button.addEventListener("click",function(){
                deleteFirework(button.id,rockets);
            }, false);
            
            
        }
    }

    function chooseFirework(index:string,rockets:RocketDatabase[]) {
        for (let i = 0; i < rockets.length; i++) {
            const button = document.getElementById("button"+i)!;
            button.setAttribute("class","rest");
        }
        const button = document.getElementById(index)!;
        button.setAttribute("class","Current");
        let auswahlString = index.replace("button","");
        auswahl=parseInt(auswahlString, 10);
        
    } 

    async function deleteFirework(index:string,rockets:RocketDatabase[]) {
        let auswahlString = index.replace("buttonDel","");
        auswahl=parseInt(auswahlString, 10);
        let response: Response = await fetch(url + "/delete?name="+rockets[auswahl].Name);
        let responseText: string = await response.text();
        let delItem:DeleteItem= JSON.parse(responseText);
        alert("Rakete mit dem Namen "+delItem.name+" wurde gelöscht.");
        location.reload();
        } 

    function createObject(_event: MouseEvent,rockets:RocketDatabase[]): void {
        
        let mousePositionX: number = _event.clientX; //- crc2.canvas.offsetLeft;
        let mousepositionY: number = _event.clientY; //- crc2.canvas.offsetTop;
        
        let rocket:RocketDatabase = rockets[auswahl];
        createParticle(mousePositionX, mousepositionY, rocket.Farbe, rocket.Lebensdauer, rocket.Form, rocket.AnzahlPartikel);
    }

    function update(): void {

        crc2.fillStyle = 'rgba(0,0,51,0.2)';
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

    function createParticle(_mousePositionX: number, _mousePositionY: number, _farbe: string, _lebensdauer: number, _form: string, _anzahl:number): void {

        let origin: Vector = new Vector(_mousePositionX, _mousePositionY);
        
        for (let i: number = 0; i < _anzahl; i++) {
            let radian: number = Math.PI * 2 / _anzahl;
            let px: number = Math.cos(radian * i) * 110 * Math.random() * 2; //(2)power
            let py: number = Math.sin(radian * i) * 110 * Math.random() * 2; //(2)power
            let velocity: Vector = new Vector(px, py);
            let particle: MoveableObject = new Particle(origin, velocity, _farbe, _lebensdauer, _form);
            moveables.push(particle);

        }
    }
    
    
    

    

}