

namespace Firework {
    window.addEventListener("load", handleLoad);

    interface Rocket { 
        Name:string, 
        Form:string, 
        Farbe:string,
        Lebensdauer:number,
        AnzahlPartikel:string
     } 

    let form: HTMLFormElement;
    let button: HTMLFormElement;
    
    let urlStore: string = "https://eia2wintersemester.herokuapp.com:"+process.env.PORT+"/"+"store";

    async function handleLoad(_event: Event): Promise<void> {
        console.log("Init");

        form = <HTMLFormElement>document.querySelector("form");
        button = <HTMLFormElement>document.getElementById("save");
                
        button.addEventListener("click", sendFireworkData);

        
    }

    async function sendFireworkData(_event: Event): Promise<void> {
        console.log("Send order");
        let formData: FormData = new FormData(form);
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        let response: Response = await fetch(urlStore + "?" + query.toString());
        console.log(query.toString());
        let responseText: string = await response.text();
        let rocket:Rocket = JSON.parse(responseText);
        alert("Folgende Daten wurden an den Server geschickt:\nName der Rakete: "+
        rocket.Name+" \nForm der Rakete: "+rocket.Form+" \nFarbe der Rakete: "+
        rocket.Farbe+" \nLebensdauer der Rakete: "+rocket.Lebensdauer+
        " \nAnzahl der Partikel: "+rocket.AnzahlPartikel);
    }
}