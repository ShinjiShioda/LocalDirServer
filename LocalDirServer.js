// HTTP file server program
// copyright 2024 Shinji Shioda
// open Windows Directory by HTTP
// Usage: http://localhost/c:/temp

// requires
var fs = require('fs');
var path = require('path');
var http = require('http');
var exec = require('child_process').exec;
var util = require('util');
var {format} = require('util')

var port = 6800;                                        // listen port
var lastAccess =  new Date(2000,1,1,0,0,0);
var lasturl = "";
// HTTP Handler
var handler = function (request, response) {
    var myDate = new Date();
    const logHeader = format("Connect from %s at %s", response.connection.remoteAddress,myDate);   // display Remote ip address
    if(myDate-lastAccess <= 4000 && request.url == lasturl){
        console.log("%s--Repeat Request in %s. return 404",logHeader,(myDate-lastAccess));
        response.writeHead(404,{'Content-Type':'text/html'});
        response.end("<html><body>Same Request Repeated.</body></html>");
        return 0;
    }
    if(request.url == "/favicon.ico") {
        console.log("%s--favicon Reqested.return 404",logHeader)
        response.writeHead(404);
        response.end();
        return 0;
    }
    lastAccess=myDate;
    lasturl=request.url;
    response.writeHead(200,{'Content-Type':'text/html'});                   // response status code and content type
    // return html body for close it by javascript. "HELLO" is important to suppress error.
    // If it's not here you'll get an error.
    response.end("<html><body onload=\"open(location, '_self').close();\">HELLO</body></html>");
    //response.end("<html><body onload=\"setTimeout(()=>open(location, '_self').close(), 500);\">HELLO</body></html>");
    
    // check remote address is ipv4/v6 local address '::1' or '::ffff:127.0.0.1'
    // Not allow my real ip address(like 192.168.0.100). This is guard to use real ip address in URL
    if((response.connection.remoteAddress !== '::1') && (response.connection.remoteAddress !== '::ffff:127.0.0.1')) {
        // Not 'local address' 
        console.warn("%s--Error not 'localhost'!",logHeader);
        return 0;
    }
    // console.log(util.inspect(request,false,null));
    var arg = (request.url).substr(1);                  // split path from URL
    arg = decodeURIComponent(arg);
    //console.log("arg:%s",arg);
    arg = arg.replaceAll('/','\\');                     // convert URL path to Windows Path
    //console.log("Path:%s",arg);
    fs.stat(arg, function (err, stats) {                // with path
        if (err) {                                      // if path not exist
            // path not exist. Error & exit
            console.warn("%s--Error:Path not found. %s",logHeader,arg);
        } else {
            // path exist
            if (stats.isDirectory()) {                      // check path is directory
                //Yes, It's Directory
                console.log("%s--Path is Directory. Open %s",logHeader,arg);
                exec('explorer.exe "'+arg+'"');             // Open Directory in File Explorer
            }
            else {
                // No, It's File path
                console.log("%s--Path is File. open Parent Dir and select %s",logHeader,path.basename(arg));
                exec('explorer.exe /select,"'+arg+'"');     // Open Directory and select file by '/select' option
            }
        }
    });
};

// Check command line arguments. argv[0] node-js, argv[1] this file, argv[2] Optional Port Number
if( process.argv.length >= 3  && !isNaN(process.argv[2]) && Number(process.argv[2]) >= 1024 ) {
    // Yes, argv[2] is exist. and it's Number and under 1024
    port=Number(process.argv[2]);
}
console.log('Local dir Server Ver.0.9.1\nCopyright 2024 Shinji Shioda');          // Output Version
console.log("\n%s %s [<PORT_NUMBER>]",process.argv[0],process.argv[1]);
console.log("\nAccess http://localhost:%s/<LOCAL_PATH_SEPARATED_BY_SLASH>",port);   // Usage
var al=http.createServer();                         // Create HTTP server
al.addListener("request",handler);                  // add Handler
al.listen(port);                                    // set TCP port and start it