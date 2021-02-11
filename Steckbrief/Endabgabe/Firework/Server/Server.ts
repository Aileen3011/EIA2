import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace Firework_Compilation {

    
    interface Firework{
        [type:string]: string | string[] | undefined;
    }
    
    let databaseUrl: string = "mongodb://localhost:27017";
    let options: Mongo.MongoClientOptions = {useNewUrlParser: true, useUnifiedTopology: true};
    let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(databaseUrl, options);
    let fireworks: Mongo.Collection;
    let port:number =5001;  

    startServer(port);
    connectToDatabase(databaseUrl);

    function startServer(_port: number | string): void {
        let server: Http.Server = Http.createServer();
        console.log("Server starting on port:" + _port);

        server.listen(_port);
        server.addListener("request", handleRequest);
        
    }

   async function connectToDatabase(_url: string): Promise<void> {
        await mongoClient.connect();
        fireworks = mongoClient.db("Firework").collection("Compilations");
        console.log("Database connection ", fireworks != undefined);
    }

    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
        console.log("What's up?");
        let a = Url.parse(_request.url!).pathname;
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        let nodeArr:string[];

        switch(a){
            case "/rockets":
                console.log("rockets");
                getData(function (res:string[]){
                    nodeArr = res;
                    let respArr:string = JSON.stringify(nodeArr);
                    _response.write(respArr); 
                    _response.end();   
                });             
                break;
            case "/store":
                console.log("store");
                let url: Url.UrlWithParsedQuery = Url.parse(_request.url!, true);
                let jsonString: string = JSON.stringify(url.query);
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


    function storeFirework(_order: Firework): void {
        fireworks.insertOne(_order);
    }

    function getData(callback:any):void{
        
        mongoClient.db("Firework").collection("Compilations").find({}).toArray(function (err, docs) {
            if (err) throw err;
            callback(docs);
          });  
          
              
    }
   
}
