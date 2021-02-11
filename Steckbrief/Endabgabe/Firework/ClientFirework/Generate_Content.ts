

namespace Generate_Content {
    
    interface RocketDatabase { 
        ID:string,
        Name:string, 
        Form:string, 
        Farbe:string,
        Radius:number,
        Lebensdauer:number,
        AnzahlPartikel:string
     } 
    let url: string = "http://localhost:5001";
   
    window.addEventListener("load", handleLoad);

    async function handleLoad(_event: Event): Promise<void> {
        console.log("Init");
        
        let response: Response = await fetch(url + "/rockets");
        let responseText: string = await response.text();
        let rockets:RocketDatabase[]= JSON.parse(responseText);
        
        let output = document.getElementById("input")!;

        
        output.innerHTML="";
        let InputHTML:string = "";

        for (let index = 0; index < rockets.length; index++) {
            InputHTML = InputHTML +"<button id='button"+index+"' type='submit'>"+rockets[index].Name+"</button><br>"
            
        }
        console.log(InputHTML);
        output.innerHTML = InputHTML;
        
        createListener(rockets);
    }

    function createListener(rockets:RocketDatabase[]) {
        for (let index = 0; index < rockets.length; index++) {
            const button:HTMLElement = document.getElementById("button"+index)!;
            button.addEventListener("click",function(){
                startFirework(button.id);
            }, false);
            
            
        }
    }

    function startFirework(index:string) {
        console.log(index);
    }
    
    
    

    

}