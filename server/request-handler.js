/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var data = [];


var requestHandler = function(request, response) {
  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  var statusCode = 200;
  var headers = defaultCorsHeaders;

  headers['Content-Type'] = 'application/json';

  if (request.method === "GET"){ // testing, actually passing some tests
    if (request.url.match("/classes/messages") ){
      response.writeHead(200, headers);
    } else {
      response.writeHead(404, headers);
    }
  }
  if (request.method === "POST"){
    if (request.url === "/classes/messages" ){
      request.on('data', (chunk) => {
        data.push(JSON.parse(chunk))
      })
      response.writeHead(201, headers);
    } else {
      response.writeHead(404, headers);
    }
  }
  if (request.method === "OPTIONS") {
    response.writeHead(200, headers);
  }

  var obj = {'results': data}


  response.end(JSON.stringify(obj));
};


var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept, x-parse-application-id, x-parse-rest-api-key',
  'access-control-max-age': 10 // Seconds.
};
 
module.exports.data = data;
module.exports.requestHandler = requestHandler;