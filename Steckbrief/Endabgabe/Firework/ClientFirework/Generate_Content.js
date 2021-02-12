"use strict";
var Firework;
(function (Firework) {
    let url = "https://eia2wintersemester.herokuapp.com";
    let auswahl = 0;
    let moveables = [];
    window.addEventListener("load", handleLoad);
    async function handleLoad(_event) {
        console.log("Init");
        let response = await fetch(url + "/rockets");
        let responseText = await response.text();
        let rockets = JSON.parse(responseText);
        let output = document.getElementById("input");
        output.innerHTML = "";
        let InputHTML = "";
        if (rockets.length == 0) {
            InputHTML = InputHTML + "<span>No rockets created</span>";
        }
        for (let index = 0; index < rockets.length; index++) {
            if (index == 0) {
                InputHTML = InputHTML + "<button class='Current' id='button" + index + "' type='submit'>" + rockets[index].Name + "</button><button class='restDel' id='buttonDel" + index + "' type='submit'><i class='fa fa-trash'></i></button><br>";
            }
            else {
                InputHTML = InputHTML + "<button class='rest' id='button" + index + "' type='submit'>" + rockets[index].Name + "</button><button class='restDel' id='buttonDel" + index + "' type='submit'><i class='fa fa-trash'></i></button><br>";
            }
        }
        console.log(InputHTML);
        output.innerHTML = InputHTML;
        createListener(rockets);
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        Firework.crc2 = canvas.getContext("2d");
        canvas.height = innerHeight;
        canvas.width = innerWidth;
        canvas.addEventListener("click", function (e) {
            createObject(e, rockets);
        });
        window.setInterval(update, 20);
    }
    function createListener(rockets) {
        for (let index = 0; index < rockets.length; index++) {
            const button = document.getElementById("button" + index);
            button.addEventListener("click", function () {
                chooseFirework(button.id, rockets);
            }, false);
        }
        for (let index = 0; index < rockets.length; index++) {
            const button = document.getElementById("buttonDel" + index);
            button.addEventListener("click", function () {
                deleteFirework(button.id, rockets);
            }, false);
        }
    }
    function chooseFirework(index, rockets) {
        for (let i = 0; i < rockets.length; i++) {
            const button = document.getElementById("button" + i);
            button.setAttribute("class", "rest");
        }
        const button = document.getElementById(index);
        button.setAttribute("class", "Current");
        let auswahlString = index.replace("button", "");
        auswahl = parseInt(auswahlString, 10);
    }
    async function deleteFirework(index, rockets) {
        let auswahlString = index.replace("buttonDel", "");
        auswahl = parseInt(auswahlString, 10);
        let response = await fetch(url + "/delete?name=" + rockets[auswahl].Name);
        let responseText = await response.text();
        let delItem = JSON.parse(responseText);
        alert("Rakete mit dem Namen " + delItem.name + " wurde gelöscht.");
        location.reload();
    }
    function createObject(_event, rockets) {
        let mousePositionX = _event.clientX; //- crc2.canvas.offsetLeft;
        let mousepositionY = _event.clientY; //- crc2.canvas.offsetTop;
        let rocket = rockets[auswahl];
        createParticle(mousePositionX, mousepositionY, rocket.Farbe, rocket.Lebensdauer, rocket.Form, rocket.AnzahlPartikel);
    }
    function update() {
        Firework.crc2.fillStyle = 'rgba(0,0,51,0.2)';
        Firework.crc2.fillRect(0, 0, Firework.crc2.canvas.width, Firework.crc2.canvas.height);
        for (let moveable of moveables) {
            moveable.move(1 / 50);
            moveable.draw();
        }
        deleteExpandables();
    }
    function deleteExpandables() {
        for (let index = moveables.length - 1; index >= 0; index--) {
            if (moveables[index].expendable) //im Array an stelle des gerade befindenden Index
                moveables.splice(index, 1);
        }
    }
    function createParticle(_mousePositionX, _mousePositionY, _farbe, _lebensdauer, _form, _anzahl) {
        let origin = new Firework.Vector(_mousePositionX, _mousePositionY);
        for (let i = 0; i < _anzahl; i++) {
            let radian = Math.PI * 2 / _anzahl;
            let px = Math.cos(radian * i) * 110 * Math.random() * 2; //(2)power
            let py = Math.sin(radian * i) * 110 * Math.random() * 2; //(2)power
            let velocity = new Firework.Vector(px, py);
            let particle = new Firework.Particle(origin, velocity, _farbe, _lebensdauer, _form);
            moveables.push(particle);
        }
    }
})(Firework || (Firework = {}));
//# sourceMappingURL=Generate_Content.js.map