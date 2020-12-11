"use strict";
var L06_Hexenkessel;
(function (L06_Hexenkessel) {
    //erarbeitet mit corinna
    async function getData() {
        let response = await fetch("date.json");
        let content = await response.text();
        let data = JSON.parse(content);
        console.log("DATA");
        console.log(data);
        L06_Hexenkessel.generateContent(data);
    }
    L06_Hexenkessel.getData = getData;
    async function sendPotion(_event) {
        console.log("sendPotion");
        let url = "https://eia2wintersemester.herokuapp.com/";
        //let url: string = "http://localhost5001";
        let formData = new FormData(document.forms[0]);
        let query = new URLSearchParams(formData);
        console.log("Query:");
        console.log(query);
        url = url + "?" + query.toString();
        console.log(url);
        let select = document.querySelector("select");
        let textarea = document.querySelector("textarea");
        if (select)
            url += "&Wirkung" + select.value;
        if (textarea.value != "")
            url += "&RisikenUndNebenwirkungen" + textarea.value;
        let response = await response.text();
        console.log(responseReply);
        alert("Potion sent!");
    }
    L06_Hexenkessel.sendPotion = sendPotion;
})(L06_Hexenkessel || (L06_Hexenkessel = {}));
//# sourceMappingURL=client.js.map