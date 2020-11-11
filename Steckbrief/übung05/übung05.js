"use strict";
var übungAsync;
(function (übungAsync) {
    async function communicate(_url) {
        console.log("vor fetch");
        let response = await fetch(_url);
        console.log("nach fetch");
        // await response.text();
        let ergebnis = await response.text();
        console.log(ergebnis);
    }
    console.log("start");
    communicate("https:jirkadelloro.github.io/EIA2-Inverted/L05_Client/Material/Test.txt");
    console.log("end");
})(übungAsync || (übungAsync = {}));
//   async function communicate(_url: RequestInfo): Promise<void> {
//    let response: Response = await fetch(_url);
//    console.log("Response", response);
//   }
//# sourceMappingURL=übung05.js.map