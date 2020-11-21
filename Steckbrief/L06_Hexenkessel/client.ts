namespace L06_Hexenkessel {
    //erarbeitet mit corinna
   export async function getData(): Promise<void> {
       let response: Response = await fetch("date.json");
       let content: string = await response.text();
       let data = JSON.parse(content);
       console.log("DATA");
       console.log(data);
       generateContent(data);
   }

   export async function sendPotion(_event: Event): Promise<void> {
       console.log("sendPotion");
       let url: string = "https://eia2wintersemester.herokuapp.com/"
       //let url: string = "http://localhost5001";
       let formData: FormData = new FormData(document.forms[0]);
       let query: URLSearchParams = new URLSearchParams(<any>formData);
       console.log("Query:");
       console.log(query);
       url = url + "?" + query.toString();
       console.log(url);
       let select: HTMLSelectElement = <HTMLSelectElement>document.querySelector("select");
       let textarea: HTMLTextAreaElement = <HTMLTextAreaElement>document.querySelector("textarea");
       if(select)
        url += "&Wirkung" + select.value;
       if(textarea.value != "")
        url += "&RisikenUndNebenwirkungen" + textarea.value;
    let response: Response = await response.text();
    console.log(responseReply);
    alert("Potion sent!");
   }

}