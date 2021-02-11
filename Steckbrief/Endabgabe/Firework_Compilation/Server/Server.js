"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Firework_Compilation = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var Firework_Compilation;
(function (Firework_Compilation) {
    let databaseUrl = "mongodb://localhost:27017";
    let options = { useNewUrlParser: true, useUnifiedTopology: true };
    let mongoClient = new Mongo.MongoClient(databaseUrl, options);
    let fireworks;
    let port = 5001;
    startServer(port);
    connectToDatabase(databaseUrl);
    function startServer(_port) {
        let server = Http.createServer();
        console.log("Server starting on port:" + _port);
        server.listen(_port);
        server.addListener("request", handleRequest);
    }
    async function connectToDatabase(_url) {
        await mongoClient.connect();
        fireworks = mongoClient.db("Firework").collection("Compilations");
        console.log("Database connection ", fireworks != undefined);
    }
    async function handleRequest(_request, _response) {
        console.log("What's up?");
        let a = Url.parse(_request.url).pathname;
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        let nodeArr;
        switch (a) {
            case "/rockets":
                console.log("rockets");
                getData(function (res) {
                    nodeArr = res;
                    let respArr = JSON.stringify(nodeArr);
                    _response.write(respArr);
                    _response.end();
                });
                break;
            case "/store":
                console.log("store");
                let url = Url.parse(_request.url, true);
                let jsonString = JSON.stringify(url.query);
                _response.write(jsonString);
                storeFirework(url.query);
                _response.end();
                break;
            default:
                _response.writeHead(404);
                _response.end();
                break;
        }
    }
    function storeFirework(_order) {
        fireworks.insertOne(_order);
    }
    function getData(callback) {
        mongoClient.db("Firework").collection("Compilations").find({}).toArray(function (err, docs) {
            if (err)
                throw err;
            callback(docs);
        });
    }
})(Firework_Compilation = exports.Firework_Compilation || (exports.Firework_Compilation = {}));
//# sourceMappingURL=Server.js.map