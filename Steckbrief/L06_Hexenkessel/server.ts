import { Http2SecureServer } from "http2";
import { Url } from "url";
//erarbeitet mit corinna
export namespace L06_Hexenkessel {
 let server: Http.Server = Http.createServer();

 let port: number | string | undefined = process.env.PORT;
 if(port == undefined)
    port = 5001; //server hört auf port 5001

console.log("Server starting on port:" + port);

server.listen(port);
server.addListener("request", handleRequest);

function handleRequest(_request: Http.IncomingMessage, _response: Http.Server){
    console.log("Funktioniert's?");

    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.setHeader("Access-Control-Allow-Origin", "*");
    if(_request.url){
        console.log(_request.url);
        let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
        let jsonString: string = JSON.stringify(url.query);
        _response.write(jsonString);
    }
    _response.end();
}



}