"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Firework = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var Firework;
(function (Firework) {
    let databaseUrl = "mongodb+srv://Aileen:1234@clusterfireworkeia2.bk6eh.mongodb.net/Firework?retryWrites=true&w=majority";
    let options = { useNewUrlParser: true, useUnifiedTopology: true };
    let mongoClient = new Mongo.MongoClient(databaseUrl, options);
    let fireworks;
    let port = process.env.PORT;
    if (port == undefined) {
        port = 5001;
    }
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
        let pathname = Url.parse(_request.url).pathname;
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        switch (pathname) {
            case "/rockets":
                console.log("rockets");
                getData(function (result) {
                    let responseArray = JSON.stringify(result);
                    _response.write(responseArray);
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
            case "/delete":
                console.log("delete");
                let url2 = Url.parse(_request.url, true);
                let jsonString2 = JSON.stringify(url2.query);
                let del = JSON.parse(jsonString2);
                _response.write(jsonString2);
                deleteFirework(del.name);
                _response.end();
                break;
            default:
                _response.writeHead(404);
                _response.end();
                break;
        }
    }
    function storeFirework(_firework) {
        fireworks.insertOne(_firework);
    }
    function deleteFirework(rocketName) {
        fireworks.deleteOne({ "Name": rocketName });
    }
    function getData(callback) {
        mongoClient.db("Firework").collection("Compilations").find({}).toArray(function (err, data) {
            if (err) {
                throw err;
            }
            else {
                callback(data);
            }
        });
    }
})(Firework = exports.Firework || (exports.Firework = {}));
//# sourceMappingURL=Server.js.map