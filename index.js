const http = require('http');
const path = require('path');
const url = require('url');
const fs = require('fs');
const express = require('express');
const app = express();
const crypto = require('crypto');
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


//app.use('/static', express.static(__dirname + '/public'));

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
        //console.log("data password: " + data.password);

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
    if (data.password == undefined){
      content = {"error":"User password invalid"};
      return 400;
    }

    /*ABRIR O TXT COM OS DADOS DE LOGIN*/
    const status = fileOpen('dados.json',data);
    return status;
  case '/join':
    const game = createGame(data);
    content = game;
    return 200;
  case 'leave':
    break;
  case 'notify':
    break;
  default:
    content = {"error":"Unknown POST request"};
    return 404;
  }
}

function fileOpen(file, data){ // falta o content

	if(fs.existsSync("dados.json")){
	let db = fs.readFileSync("dados.json");
		db = JSON.parse(db);
    if (db['salt'] == undefined) {
      console.log("entrou no salt undefined");
      createSalt(file, db);
    }
		if(db[data.nick]){ // usar a validacao para comparar
			if(compareEncripted(data)){
				return 200;
			}else{
        content = {"error":"User registered with a different password"};
				return 400;
			}
		}else{
			//criar novo user
      const password = encript(JSON.stringify(data.password));
			const ficheiro = JSON.stringify(data.nick)+ ":" + '"' + password + '"';
			//preciso do db para nao perder os logins ja existentes
			saveData(file, ficheiro, db);
			console.log("Novo Login");
			return 200;
		}
	}else{ // criar o ficheiro
    createSalt(file, "");
    const password = encript(JSON.stringify(data.password));
		let ficheiro = JSON.stringify(data.nick)+ ":" + '"' + password + '"';
    let db = fs.readFileSync("dados.json");
  	db = JSON.parse(db);
    saveData(file, ficheiro, db);
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

function createSalt(file, db){ //db é objeto com os dados de login

  // Generate random salt
  let length = 16;
  let salt =  crypto.randomBytes(Math.ceil(length / 2))
  .toString('hex')
  .slice(0, length);

  const ficheiro = '{"salt":' + '"' + salt + '"}';
  if(db === ""){
    fs.writeFileSync("dados.json", ficheiro);
  } else
    saveData(file, ficheiro, db);
}

function encript(password){

  // TEST ENCRYPT
  let creepy = function (password) {
    let dados = fs.readFileSync("dados.json");
    dados = JSON.parse(dados);
    salt = dados['salt'];
    // SHA512 at work
    let hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    return {
      salt: salt,
      hash: hash.digest('hex')
    };
  };

  let creeped = creepy(password);
  //console.log("===== HASHED PASSWORD + SALT =====");
  //console.log(creeped);

  return creeped.hash;
}

function compareEncripted(data){
  // VALIDATE PASSWORD
  let validate = function (userpass, hashedpass, salt) {
    userpass = '"' + userpass + '"';
    let hash = crypto.createHmac('sha512', salt);
    hash.update(userpass);
    userpass = hash.digest('hex');
    return userpass == hashedpass;
  };

  let db = fs.readFileSync("dados.json");
  db = JSON.parse(db);

  let validated = validate(data.pass, db[data.nick], db['salt']);
  return validated;
}

function createGame(data){

let today = new Date();
let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
let dateTime = date+' '+time;

const game = data.size + "" + data.initial + "" + data.nick + "" + dateTime;
const hash = crypto.createHash('md5').update(game).digest('hex');

let jogo = {
  game : hash
};

return jogo;
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

server.listen(8125);
