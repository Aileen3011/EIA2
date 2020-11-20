"use strict";
var L03_Hexenkessel;
(function (L03_Hexenkessel) {
    window.onload = function () {
        let button = document.getElementById("buttonstart");
        if (button != null) {
            button.addEventListener("click", handleButton);
        }
        function handleButton() {
            if (document.getElementById("name").value == "" ||
                document.getElementById("risikenNebenwirkungen").value == "" ||
                document.getElementById("wirkung").value == "" ||
                document.getElementById("dauer").value == "0" ||
                (document.getElementById("gift").checked == false &&
                    document.getElementById("froschbeine").checked == false &&
                    document.getElementById("rattenschwänze").checked == false &&
                    document.getElementById("blumenblätter").checked == false) ||
                document.querySelector('input[name = "Radiogroup"]:checked').value == null ||
                document.querySelector('input[name = "Radiogroup1"]:checked').value == null) {
                alert("Es fehlen eine oder mehrere Angaben");
            }
            else {
                displayRezept();
            }
        }
    };
    function displayRezept() {
        let name = document.getElementById("name").value;
        let risk = document.getElementById("risikenNebenwirkungen").value;
        let wirkung = document.getElementById("wirkung").value;
        let dauer = document.getElementById("dauer").value;
        let checkboxGift = document.getElementById("gift");
        let checkboxFrosch = document.getElementById("froschbeine");
        let checkboxRatten = document.getElementById("rattenschwänze");
        let checkboxBlumen = document.getElementById("blumenblätter");
        let zutaten = "";
        let temperatur = document.getElementById("temperatur").value;
        let dauertemp = document.getElementById("dauerTemp").value;
        let konsistenztemp = document.querySelector('input[name = "Radiogroup"]:checked').value;
        let farbetemp = document.getElementById("colorTemp").value;
        let intensitaet = document.getElementById("intensität").value;
        let dauerruehr = document.getElementById("dauerRühr").value;
        let konsistenzruehr = document.querySelector('input[name = "Radiogroup1"]:checked').value;
        let farberuehr = document.getElementById("colorRühr").value;
        let preis = 0;
        let endpreis = "";
        if (checkboxGift.checked) {
            let countGift = document.getElementById("anzahlGift");
            preis = preis + getprice(checkboxGift, parseInt(countGift.value, 10));
            zutaten = zutaten + countGift.value + "x Gift <br>";
        }
        if (checkboxFrosch.checked) {
            let countFrosch = document.getElementById("anzahlFrosch");
            preis = preis + getprice(checkboxFrosch, parseInt(countFrosch.value, 10));
            zutaten = zutaten + countFrosch.value + "x Froschbeine <br>";
        }
        if (checkboxRatten.checked) {
            let countRatten = document.getElementById("anzahlRatten");
            preis = preis + getprice(checkboxRatten, parseInt(countRatten.value, 10));
            zutaten = zutaten + countRatten.value + "x Rattenschwänze <br>";
        }
        if (checkboxBlumen.checked) {
            let countBlumen = document.getElementById("anzahlBlumen");
            preis = preis + getprice(checkboxBlumen, parseInt(countBlumen.value, 10));
            zutaten = zutaten + countBlumen.value + "x Blumenblätter <br>";
        }
        endpreis = currency(preis);
        var output = document.getElementById("out");
        output.innerHTML = "Name: " + name + "<br>" + "Risiken und Nebenwirkungen: " + risk + "<br>" +
            "Wirkung: " + wirkung + "<br>" + "Dauer der Wirkung: " + dauer + " Stunden" + "<br>" +
            "Zutaten:<br>" + zutaten + "Trank in " + dauertemp + " Minuten auf " + temperatur + " °C erhitzen/abkühlen <br>" +
            "Konsistenz beim Erhitzen bzw. Abkühlen: " + konsistenztemp + "<br>" + "Farbe beim Erhitzen bzw. Abkühlen: " +
            "<input type='color' value='" + farbetemp + "'><br>" + "Intensität beim Rühren: " + intensitaet + "<br>" +
            "Rührdauer: " + dauerruehr + " Minuten" + "<br>" + "Konsistenz beim Rühren: " + konsistenzruehr + "<br>" +
            "Farbe beim Rühren: " + "<input type='color' value='" + farberuehr + "'><br>" + "Preis: " + endpreis;
    }
    function getprice(zutat, anzahl) {
        let price = 0;
        switch (zutat.value) {
            case "Gift":
                price = 100;
                break;
            case "Froschbeine":
                price = 30;
                break;
            case "Rattenschwänze":
                price = 40;
                break;
            case "Blumenblätter":
                price = 60;
                break;
            default:
                alert("Fehler");
        }
        let total = price * anzahl;
        return total;
    }
    function currency(total) {
        let knut;
        let sickel;
        let galleone;
        let umrechnung = "";
        if (total < 29) {
            umrechnung = total + " Knut";
        }
        else {
            if (total < 493) {
                sickel = Math.floor(total / 29);
                knut = total % 29;
                umrechnung = sickel + " Sickel " + knut + " Knut";
            }
            else {
                if (total > 493) {
                    galleone = Math.floor(total / 493);
                    sickel = Math.floor((total % 493) / 29);
                    knut = total % 29;
                    umrechnung = galleone + " Galleone " + sickel + " Sickel " + knut + " Knut";
                }
            }
        }
        return umrechnung;
    }
})(L03_Hexenkessel || (L03_Hexenkessel = {}));
//# sourceMappingURL=hexenkessel.js.map