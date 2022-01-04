const http = require('http');
const path = require('path');
const url  = require('url');
const fs   = require('fs');
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
let content = {};

const server = http.createServer(function (request, response) {
    const preq = url.parse(request.url,true);
    const pathname = preq.pathname;
    let answer = {};
    content = {};

    console.log("pathname = " + pathname);

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

        if(answer.status === undefined)
            answer.status = 200;
        if(answer.style === undefined)
            answer.style = 'plain';

        console.log(content);
        response.writeHead(answer.status, headers[answer.style]);
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
    let db = fs.readFileSync("ranking.json");
    db = JSON.parse(db);
    content = db;
    return 200;
  case '/register':
    if (data.nick == undefined){
      content = {"error":"User name invalid"};
      return 400;
    }
    if (data.pass == undefined){
      content = {"error":"User password invalid"};
      return 400;
    }

    /*ABRIR O TXT COM OS DADOS DE LOGIN*/
    const status = fileOpen('dados.json', data);

    return status;
  default:
    content = {"error":"Unknown POST request"};
    return 404;
  }
}

function fileOpen(file, data){ // falta o content
	if(fs.existsSync("dados.json")){
	let db = fs.readFileSync("dados.json");
		db = JSON.parse(db);
		if(db[data.nick]){
			if(db[data.nick] == data.pass){
				return 200;
			}else{
        content = {"error":"User registered with a different password"};
				return 400;
			}
		}else{
			//criar novo user
			const ficheiro = JSON.stringify(data.nick)+ ":" + JSON.stringify(data.pass);
			//preciso do db para nao perder os logins ja existentes
			saveData(file, ficheiro, db);
			console.log("Novo Login");
			return 200;
		}
	}else{
		//no file create new db
		let ficheiro = '{' + JSON.stringify(data.nick)+ ":" + JSON.stringify(data.pass) + "}";
		fs.writeFileSync("dados.json", ficheiro);
       return 200;
	}
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
    let pathname = path.normalize(documentRoot+purl.pathname);

    if(! pathname.startsWith(documentRoot))
       pathname = null;

    console.log("pathname funcao = " + pathname);
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
