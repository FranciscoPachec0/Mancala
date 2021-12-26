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
          doPost(pathname, data);
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
 var answer = {};
 console.log("Entoru no POST");

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
    answer.status = fileOpen('dados.json', data);
    console.log("depois = " + answer.status);

    break;
  default:
    console.log("Entrou no erro");
    answer.status = 400;
    break;
  }
}

function fileOpen(file, data){
  fs.open(file,'r', function (err, f){
    if (err) { // caso o ficheiro nao exista
      console.log("O ficheiro não existe");
      /*CRIAR FICHEIRO E REGISTAR O 1 LOGIN*/
      let ficheiro = '{"login":[' + JSON.stringify(data) + "]}";
      console.log(ficheiro);
      fs.writeFile('dados.json', ficheiro , function (err) {
        console.log('File is created successfully.');
      });
    } else {
      console.log(f);
      console.log("File opened!!");

      /*FALTA LER OS DADOS DO TXT*/
      const stream = fs.createReadStream('dados.json');

      // Read and display the file data on console
      stream.on('data', function (dadosLogin) {
        dadosLogin = JSON.parse(dadosLogin);
        let i = 0;
        while (dadosLogin.login[i] != undefined) {
          //console.log("i = " + i + " dadosLogin = " + dadosLogin.login[i].nick + "," + dadosLogin.login[i].pass);
          if(dadosLogin.login[i].nick == data.nick){
            if(dadosLogin.login[i].pass != data.pass){
              console.log("Entrou no errado");
              //console.log("antes = " + answer.status);
              content = {"error":"User registered with a different password"}; /*MANDAR O ERRO DIREITO*/
              return answer.status = 400; // posso remover esta se remover o log debaixo
            }
            console.log("Login com sucesso"); // posso remover esta se remover o return de cima
            return answer.status = 200;
          }
          i++;
        }
        /*ADICIONAR UM NOVO REGISTO*/
        const ficheiro = JSON.stringify(data);
        saveData(file, ficheiro, dadosLogin);
      });

      // This catches any errors that happen while creating the readable stream (usually invalid names)
      stream.on('error', function(err) {console.log(err);});

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
  const length = totalLength.length-2;
  data = "," + data;
  const ficheiro = totalString.slice(0, length-2) + data + totalString.slice(length-2);

  fs.writeFile(file, ficheiro, function (err) {
    if (err){
      console.log(err);
    } else {
      console.log("File written successfully\n");
    }
  });
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
