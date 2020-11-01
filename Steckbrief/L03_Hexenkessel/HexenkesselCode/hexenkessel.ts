namespace L03_Hexenkessel {
    window.onload = function() {
        let button = document.getElementById("buttonstart");
        if(button!=null){
        button.addEventListener("click",handleButton);
        
    }

    function handleButton(){
        if((<HTMLInputElement>document.getElementById("name")).value==""||
        (<HTMLInputElement>document.getElementById("risikenNebenwirkungen")).value==""||
        (<HTMLInputElement>document.getElementById("wirkung")).value==""||
        (<HTMLInputElement>document.getElementById("dauer")).value=="0"||
        ((<HTMLInputElement>document.getElementById("gift")).checked==false&&
        (<HTMLInputElement>document.getElementById("froschbeine")).checked==false&&
        (<HTMLInputElement>document.getElementById("rattenschwänze")).checked==false&&
        (<HTMLInputElement>document.getElementById("blumenblätter")).checked==false)||
        (<HTMLInputElement>document.querySelector('input[name = "Radiogroup"]:checked')).value==null||
        (<HTMLInputElement>document.querySelector('input[name = "Radiogroup1"]:checked')).value==null){
            alert("Es fehlen eine oder mehrere Angaben");
        }else{
        displayRezept();
        }
    }
      };

    
    

    function displayRezept(){
       
        let name:String = (<HTMLInputElement>document.getElementById("name")).value;
        let risk:String = (<HTMLInputElement>document.getElementById("risikenNebenwirkungen")).value;
        let wirkung:String = (<HTMLInputElement>document.getElementById("wirkung")).value;
        let dauer:String = (<HTMLInputElement>document.getElementById("dauer")).value;
        let checkboxGift = (<HTMLInputElement>document.getElementById("gift"));
        let checkboxFrosch = (<HTMLInputElement>document.getElementById("froschbeine"));
        let checkboxRatten = (<HTMLInputElement>document.getElementById("rattenschwänze"));
        let checkboxBlumen = (<HTMLInputElement>document.getElementById("blumenblätter"));
        let zutaten:String = "";
        let temperatur = (<HTMLInputElement>document.getElementById("temperatur")).value;
        let dauertemp = (<HTMLInputElement>document.getElementById("dauerTemp")).value;
        let konsistenztemp = (<HTMLInputElement>document.querySelector('input[name = "Radiogroup"]:checked')).value;
        let farbetemp = (<HTMLInputElement>document.getElementById("colorTemp")).value;
        let intensitaet = (<HTMLInputElement>document.getElementById("intensität")).value;
        let dauerruehr = (<HTMLInputElement>document.getElementById("dauerRühr")).value;
        let konsistenzruehr = (<HTMLInputElement>document.querySelector('input[name = "Radiogroup1"]:checked')).value;
        let farberuehr = (<HTMLInputElement>document.getElementById("colorRühr")).value;
        let preis:number = 0;
        let endpreis:String = "";

        if(checkboxGift.checked){
            let countGift = (<HTMLInputElement>document.getElementById("anzahlGift"));
            preis=preis+getprice(checkboxGift,parseInt(countGift.value,10));
            zutaten = zutaten+countGift.value+"x Gift <br>"
        }
        if(checkboxFrosch.checked){
            let countFrosch = (<HTMLInputElement>document.getElementById("anzahlFrosch"));
            preis=preis+getprice(checkboxFrosch,parseInt(countFrosch.value,10));
            zutaten = zutaten+countFrosch.value+"x Froschbeine <br>"
        }
        if(checkboxRatten.checked){
            let countRatten = (<HTMLInputElement>document.getElementById("anzahlRatten"));
            preis=preis+getprice(checkboxRatten,parseInt(countRatten.value,10));
            zutaten = zutaten+countRatten.value+"x Rattenschwänze <br>"
        }
        if(checkboxBlumen.checked){
            let countBlumen = (<HTMLInputElement>document.getElementById("anzahlBlumen"));
            preis=preis+getprice(checkboxBlumen,parseInt(countBlumen.value,10));
            zutaten = zutaten+countBlumen.value+"x Blumenblätter <br>"
        }
        
        endpreis = currency(preis);
        
        var output = document.getElementById("out") as HTMLElement
        output.innerHTML =  "Name: "+name+"<br>"+"Risiken und Nebenwirkungen: "+risk+"<br>"+
                            "Wirkung: "+wirkung+"<br>"+"Dauer der Wirkung: "+dauer+" Stunden"+"<br>"+
                            "Zutaten:<br>"+zutaten+"Trank in "+dauertemp+" Minuten auf "+temperatur+" °C erhitzen/abkühlen <br>"+
                            "Konsistenz beim Erhitzen bzw. Abkühlen: "+konsistenztemp+"<br>"+"Farbe beim Erhitzen bzw. Abkühlen: "+
                            "<input type='color' value='"+farbetemp+"'><br>"+"Intensität beim Rühren: "+intensitaet+"<br>"+
                            "Rührdauer: "+dauerruehr+" Minuten"+"<br>"+"Konsistenz beim Rühren: "+konsistenzruehr+"<br>"+
                            "Farbe beim Rühren: "+"<input type='color' value='"+farberuehr+"'><br>"+"Preis: "+endpreis;
    
    }
    
    function getprice(zutat:HTMLInputElement,anzahl:number){
        let price:number=0;
        switch(zutat.value){
            case "Gift":
                price=100;
                break;
            case "Froschbeine":
                price=30;
                break;
            case "Rattenschwänze":
                price=40;
                break;
            case "Blumenblätter":
                price=60;
                break;
        default:
            alert("Fehler");

        }
        let total:number = price*anzahl;
        return total;
    }
    
    function currency(total:number){
        let knut: number;
        let sickel: number;
        let galleone: number;
        let umrechnung:String ="";
        
        
        if(total<29){
            umrechnung = total + " Knut";
        }else{
            if(total<493){
                sickel = Math.floor(total/29);
                knut = total%29;
                umrechnung= sickel + " Sickel " + knut + " Knut";
            }else{
                if(total>493){
                    galleone = Math.floor(total/493);
                    sickel= Math.floor((total%493)/29);
                    knut= total%29;
                    umrechnung= galleone + " Galleone " + sickel + " Sickel " + knut + " Knut";
                }
            }
        }
        
        return umrechnung;
    }
}