import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace Firework {

    
    interface Firework{
        [type:string]: string | string[] | undefined;
    }

    interface DeleteItem{
        name:string;
    }
    
    let databaseUrl: string = "mongodb+srv://Aileen:1234@clusterfireworkeia2.bk6eh.mongodb.net/Firework?retryWrites=true&w=majority";
    let options: Mongo.MongoClientOptions = {useNewUrlParser: true, useUnifiedTopology: true};
    let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(databaseUrl, options);
    let fireworks: Mongo.Collection;
    let port:number | string| undefined = process.env.PORT;
    if(port==undefined){
        port = 5001;
    }

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
        
        let pathname = Url.parse(_request.url!).pathname;
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
       

        switch(pathname){
            case "/rockets":
                console.log("rockets");
                getData(function (result:string[]){
                    let responseArray:string = JSON.stringify(result);
                    _response.write(responseArray); 
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
            case "/delete":
                console.log("delete");
                let url2: Url.UrlWithParsedQuery = Url.parse(_request.url!, true);
                let jsonString2: string = JSON.stringify(url2.query);
                let del:DeleteItem= JSON.parse(jsonString2);
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


    function storeFirework(_firework: Firework): void {
        fireworks.insertOne(_firework);
    }

    function deleteFirework(rocketName:string) {
        fireworks.deleteOne({"Name":rocketName});
    }

    function getData(callback:any):void{
        
        mongoClient.db("Firework").collection("Compilations").find({}).toArray(function (err, docs) {
            if (err) throw err;
            callback(docs);
          });  
          
              
    }
   
}
