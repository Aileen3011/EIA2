"use strict";
var Firework_Compilation;
(function (Firework_Compilation) {
    window.addEventListener("load", handleLoad);
    let form;
    let button;
    let url = "https://eia2wintersemester.herokuapp.com"; //http://localhost:5001
    async function handleLoad(_event) {
        console.log("Init");
        form = document.querySelector("form");
        button = document.getElementById("save");
        button.addEventListener("click", sendFireworkData);
    }
    async function sendFireworkData(_event) {
        console.log("Send order");
        let formData = new FormData(form);
        let query = new URLSearchParams(formData);
        let response = await fetch(url + "store?" + query.toString());
        console.log(query.toString());
        let responseText = await response.text();
        let rocket = JSON.parse(responseText);
        alert("Folgende Daten wurden an den Server geschickt:\nName der Rakete: " +
            rocket.Name + " \nForm der Rakete: " + rocket.Form + " \nFarbe der Rakete: " +
            rocket.Farbe + " \nLebensdauer der Rakete: " + rocket.Lebensdauer +
            " \nAnzahl der Partikel: " + rocket.AnzahlPartikel);
    }
})(Firework_Compilation || (Firework_Compilation = {}));
//# sourceMappingURL=Firework_Compilation.js.map