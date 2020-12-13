"use strict";
var L08_Skipiste;
(function (L08_Skipiste) {
    window.addEventListener("load", handleLoad);
    let crc2;
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = canvas.getContext("2d");
        let posMountains = { x: 0, y: 600 };
        drawBackground();
        drawSun({ x: 90, y: 80 });
        drawCloud({ x: 700, y: 100 }, { x: 180, y: 75 });
        drawCloud({ x: 350, y: 160 }, { x: 120, y: 55 });
        drawMountains(posMountains, 350, 500);
        drawPiste();
        drawLift({ x: 0, y: 350 });
        drawSeats();
        drawHouse({ x: 700, y: 245 });
        drawAllSkiers();
        drawSnowflakes();
    }
    function drawBackground() {
        console.log("Background");
        let gradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
        gradient.addColorStop(0, "blue");
        gradient.addColorStop(0.4, "lightblue");
        gradient.addColorStop(1, "white");
        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    }
    function drawSun(_position) {
        console.log("Sun", _position);
        let r1 = 30;
        let r2 = 80;
        let gradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
        gradient.addColorStop(0, "HSLA(60, 100%, 60%, 1)");
        gradient.addColorStop(1, "HSLA(60, 100%, 40%, 0)");
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;
        crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        crc2.fill();
        crc2.restore();
    }
    function drawCloud(_position, _size) {
        console.log("Cloud", _position, _size);
        let nParticles = 20;
        let radiusParticle = 40;
        let particle = new Path2D();
        let gradient = crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;
        for (let drawn = 0; drawn < nParticles; drawn++) {
            crc2.save();
            let x = (Math.random() - 0.5) * _size.x;
            let y = -(Math.random() * _size.y);
            crc2.translate(x, y);
            crc2.fill(particle);
            crc2.restore();
        }
        crc2.restore();
    }
    function drawMountains(_position, _min, _max) {
        console.log("Mountains", _position, _min, _max);
        let stepMin = 50;
        let stepMax = 80;
        let x = 0;
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.beginPath();
        crc2.moveTo(0, 0);
        crc2.lineTo(0, -_max);
        do {
            x += stepMin + Math.random() * (stepMax - stepMin);
            let y = -_min - Math.random() * (_max - _min);
            crc2.lineTo(x, y);
        } while (x < crc2.canvas.width);
        crc2.lineTo(x, 0);
        crc2.closePath();
        let gradient = crc2.createLinearGradient(0, 0, 0, -_max);
        gradient.addColorStop(0, "grey");
        gradient.addColorStop(0.7, "lightgrey");
        gradient.addColorStop(1, "white");
        crc2.fillStyle = gradient;
        crc2.fill();
        crc2.restore();
    }
    function drawPiste() {
        console.log("Piste");
        crc2.save();
        crc2.beginPath();
        crc2.moveTo(0, 600);
        crc2.lineTo(0, 550);
        crc2.lineTo(800, 200);
        crc2.lineTo(crc2.canvas.width, crc2.canvas.height);
        crc2.closePath();
        let gradient = crc2.createLinearGradient(crc2.canvas.width, 160, 0, crc2.canvas.height);
        gradient.addColorStop(0, "white");
        gradient.addColorStop(1, "lightblue");
        crc2.fillStyle = gradient;
        crc2.fill();
        crc2.restore;
    }
    function drawLift(_position) {
        console.log("Lift", _position);
        crc2.save();
        crc2.beginPath();
        crc2.moveTo(0, 475);
        crc2.lineTo(800, 125);
        crc2.lineWidth = 2;
        crc2.stroke();
        crc2.closePath();
        crc2.translate(_position.x, _position.y);
        crc2.restore();
    }
    function drawSeats() {
        console.log("Seats");
        crc2.save();
        crc2.translate(0, 475);
        for (let i = 0; i <= 5; i++) {
            crc2.beginPath();
            crc2.moveTo(0, 0);
            crc2.translate(100, -44);
            crc2.moveTo(0, 0);
            crc2.lineTo(0, 30);
            crc2.lineTo(25, 30);
            crc2.moveTo(12.5, 0);
            crc2.stroke();
            drawSingleSkier({ x: 12.5, y: 0 }, false);
        }
        crc2.restore();
    }
    function drawHouse(_position) {
        console.log("House", _position);
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.beginPath();
        crc2.moveTo(0, 0);
        crc2.lineTo(120, 0);
        crc2.lineTo(120, -90);
        crc2.lineTo(0, -90);
        crc2.closePath();
        crc2.fillStyle = "#8B4513";
        crc2.fill();
        crc2.beginPath();
        crc2.moveTo(0, -90);
        crc2.lineTo(120 / 2, -180);
        crc2.lineTo(120, -90);
        crc2.closePath();
        crc2.fillStyle = "#DAA520";
        crc2.fill();
        crc2.restore();
    }
    function drawAllSkiers() {
        console.log("All Skiers");
        let skiCount = 20;
        for (let i = 0; i < skiCount; i++) {
            let x = Math.random() * 600 + 300;
            let y = Math.random() * 500 + 300;
            drawSingleSkier({ x: x, y: y }, true);
        }
        let x = 710;
        for (let k = 0; k < 4; k++) {
            drawSingleSkier({ x: x, y: 200 }, false);
            x = x + 20;
        }
    }
    function drawSingleSkier(_position, rot) {
        console.log("Single Skier", _position);
        let shirtrandom = Math.random() * 360;
        let shirtcolor = "HSL(" + shirtrandom + ", 100%, 50%)";
        crc2.save();
        crc2.translate(_position.x, _position.y);
        if (rot) {
            crc2.rotate(-25 * Math.PI / 180);
        }
        else {
            crc2.scale(0.75, 0.75);
        }
        //head
        crc2.beginPath();
        crc2.arc(0, 0, 8, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.fillStyle = "HSL(30, 49%, 69%)";
        crc2.fill();
        //shirt
        crc2.beginPath();
        crc2.moveTo(0, 0);
        crc2.moveTo(0, 8);
        crc2.lineTo(10, 8);
        crc2.lineTo(10, 40);
        crc2.lineTo(-10, 40);
        crc2.lineTo(-10, 8);
        crc2.closePath();
        crc2.fillStyle = shirtcolor;
        crc2.fill();
        //arms
        crc2.beginPath();
        crc2.moveTo(0, 8);
        crc2.moveTo(10, 8);
        crc2.lineTo(17, 28);
        crc2.moveTo(-10, 8);
        crc2.lineTo(-17, 28);
        crc2.stroke();
        //legs
        crc2.translate(0, 40);
        crc2.beginPath();
        crc2.moveTo(0, 0);
        crc2.moveTo(5, 0);
        crc2.lineTo(5, 20);
        crc2.moveTo(-5, 0);
        crc2.lineTo(-5, 20);
        crc2.stroke();
        //snowboard
        crc2.translate(0, 23.5);
        crc2.lineWidth = 7;
        crc2.lineCap = "round";
        crc2.beginPath();
        crc2.moveTo(0, 0);
        crc2.moveTo(20, 0);
        crc2.lineTo(-20, 0);
        crc2.strokeStyle = shirtcolor;
        crc2.stroke();
        crc2.restore();
    }
    function drawSnowflakes() {
        console.log("Snowflakes");
        for (let i = 0; i < 600; i++) {
            let x = Math.random() * crc2.canvas.width;
            let y = Math.random() * crc2.canvas.height;
            let radiusSnowflake = Math.random() * 3 + 0.5;
            crc2.beginPath();
            crc2.arc(x, y, radiusSnowflake, 0, 2 * Math.PI);
            crc2.fillStyle = "white";
            crc2.fill();
        }
    }
})(L08_Skipiste || (L08_Skipiste = {}));
//# sourceMappingURL=Skipiste.js.map