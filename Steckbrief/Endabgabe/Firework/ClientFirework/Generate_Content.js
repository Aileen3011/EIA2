"use strict";
var Generate_Content;
(function (Generate_Content) {
    let url = "http://localhost:5001";
    window.addEventListener("load", handleLoad);
    async function handleLoad(_event) {
        console.log("Init");
        let response = await fetch(url + "/rockets");
        let responseText = await response.text();
        let rockets = JSON.parse(responseText);
        let output = document.getElementById("input");
        output.innerHTML = "";
        let InputHTML = "";
        for (let index = 0; index < rockets.length; index++) {
            InputHTML = InputHTML + "<button id='button" + index + "' type='submit'>" + rockets[index].Name + "</button><br>";
        }
        console.log(InputHTML);
        output.innerHTML = InputHTML;
        createListener(rockets);
    }
    function createListener(rockets) {
        for (let index = 0; index < rockets.length; index++) {
            const button = document.getElementById("button" + index);
            button.addEventListener("click", function () {
                startFirework(button.id);
            }, false);
        }
    }
    function startFirework(index) {
        console.log(index);
    }
})(Generate_Content || (Generate_Content = {}));
//# sourceMappingURL=Generate_Content.js.map