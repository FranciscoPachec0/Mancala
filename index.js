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
let answer = {};
let content = {};

const server = http.createServer(function (request, response) {
    const preq = url.parse(request.url,true);
    const pathname = preq.pathname;

    request.on('data', chunk => {
      console.log(`Data chunk available: ${chunk}`)
      data = JSON.parse(chunk);
      //console.log("data nick: " + data.nick);
      //console.log("data pass: " + data.pass);

      switch(request.method) {
      case 'GET':
          doGet(pathname,request,response);
          break;
      case 'POST':
          answer.status = doPost(pathname, data);
          break;
      default:
          answer.status = 400;
      }

      console.log("principal = " + answer.status);
      if(answer.status === undefined)
          answer.status = 200;
      if(answer.style === undefined)
          answer.style = 'plain';

      response.writeHead(answer.status, headers[answer.style]);
      //response.write(request.body+'\n');
      response.write(JSON.stringify(content)+'\n');
      if(answer.style === 'plain')
          response.end();

    });
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

function doPost(pathname, data) { // data chega aqui como um objeto e não como string
 switch(pathname) {
  case '/ranking':
    break;
  case '/register':
    if (data.nick == undefined){
      data.nick = "";
    }
    if (data.pass == undefined){
      data.pass = "";
    }

    /*ABRIR O TXT COM OS DADOS DE LOGIN*/
    const status = fileOpen('dados.json', data);
    console.log("depois = " + status);
    return status;
    //break;
  default:
    console.log("Entrou no erro");
    return 400;
    //break;
  }
}

function fileOpen(file, data){ // falta o content
  fs.open(file,'r', function (err, f){
    if (err) { // caso o ficheiro nao exista
      console.log("O ficheiro não existe");
      /*CRIAR FICHEIRO E REGISTAR O 1 LOGIN*/
      let ficheiro = '{' + JSON.stringify(data.nick)+ ":" + JSON.stringify(data.pass) + "}";
      console.log(ficheiro);
      fs.writeFileSync('dados.json', ficheiro , function (err) {
        console.log('File is created successfully.');
      });
    } else {
      console.log(f);
      console.log("File opened!!");

      /*LER OS DADOS DO TXT*/
      let db = fs.readFileSync("dados.json");
      db = JSON.parse(db);

      if(db[data.nick] != undefined){
        if(db[data.nick] == data.pass){
          console.log("Login Correto");
          return 200;
        }else{
          console.log("Login Errado");
          return 400;
        }
      }else{ // criar novo utilizador
        const ficheiro = JSON.stringify(data.nick)+ ":" + JSON.stringify(data.pass);
        //preciso do db para nao perder os logins ja existentes
        saveData(file, ficheiro, db);
        console.log("Novo Login");
        return 200;
      }

      // Close the file descriptor
      fs.close(f, (err) => {
        if (err)
          console.error('Failed to close file', err);
        else {
          console.log("File Closed successfully");
        }
      });
    }
  });
}

function saveData(file, data, total){
  const totalLength = "'" + JSON.stringify(total) + "'";
  const totalString = JSON.stringify(total);
  // -2 pois tira as plicas adicionas em cima para traformas em string
  const length = totalLength.length-2;
  data = "," + data;
  const ficheiro = totalString.slice(0, length-1) + data + totalString.slice(length-1);

  fs.writeFileSync(file, ficheiro);
  console.log("File written successfully");
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
