const http = require('http');
const path = require('path');
const url  = require('url');
const fs   = require('fs');
let counter  = require('./model.js');
let updater  = require('./updater.js');
const headers = {
    plain: {
        'Content-Type': 'application/javascript',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*',
        'Keep-Alive' : 'timeout=5'
    },
    sse: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*',
        'Connection': 'keep-alive'
    }
};

const server = http.createServer(function (request, response) {
    const preq = url.parse(request.url,true);
    const pathname = preq.pathname;
    let answer = {};
    let content = {};

    switch(request.method) {
    case 'GET':
        answer = doGet(pathname,request,response);
        break;
    case 'POST':
        content = doPost(pathname);
        break;
    default:
        answer.status = 400;
    }

    if(answer.status === undefined)
        answer.status = 200;
    if(answer.style === undefined)
        answer.style = 'plain';

    response.writeHead(answer.status, headers[answer.style]);
    response.write(JSON.stringify(answer)+'\n');
    if(answer.style === 'plain')
        response.end();

});

function doGet(pathname,request,response) {
 console.log("Entrou no GET");
 let answer = {};

 switch(pathname) {
   case '/update':
     answer.style = 'sse';
     break;
   default:
     answer.status = 400;
   break;
 }

 return answer;
}

function doPost(pathname) {

 console.log("Entrou no POST");
 var content = {};

 switch(pathname) {
  case '/ranking':
    break;
  case '/register':
    content = {Status: "OK"};
    break;
  default:
    console.log("Entrou no erro");
    answer.status = 400;
    break;
  }

 return answer;
}

function doGetRequest(request,response) {
    const pathname = getPathname(request);
    if(pathname === null) {
        response.writeHead(403); // Forbidden
        response.end();
    } else
        fs.stat(pathname,(err,stats) => {
            if(err) {
                response.writeHead(500); // Internal Server Error
                response.end();
            } else if(stats.isDirectory()) {
                if(pathname.endsWith('/'))
                   doGetPathname(pathname+conf.defaultIndex,response);
                else {
                   response.writeHead(301, {'Location': pathname+'/' }); // Moved Permanently
                   response.end();
                }
            } else
                doGetPathname(pathname,response);
       });
}

function getPathname(request) {
    const purl = url.parse(request.url);
    let pathname = path.normalize(conf.documentRoot+purl.pathname);

    if(! pathname.startsWith(conf.documentRoot))
       pathname = null;

    return pathname;
}

function doGetPathname(pathname,response) {
    const mediaType = getMediaType(pathname);
    const encoding = isText(mediaType) ? "utf8" : null;

    fs.readFile(pathname,encoding,(err,data) => {
    if(err) {
        response.writeHead(404); // Not Found
        response.end();
    } else {
        response.writeHead(200, { 'Content-Type': mediaType });
        response.end(data);
    }
  });
}

function getMediaType(pathname) {
    const pos = pathname.lastIndexOf('.');
    let mediaType;

    if(pos !== -1)
       mediaType = conf.mediaTypes[pathname.substring(pos+1)];

    if(mediaType === undefined)
       mediaType = 'text/plain';
    return mediaType;
}

function isText(mediaType) {
    if(mediaType.startsWith('image'))
      return false;
    else
      return true;
}


server.listen(8025);
