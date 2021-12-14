let turno, ia, cavidades, sementes;
let name, password, game, player1 = undefined, player2 = undefined;
const $ = (id) => document.getElementById(id);


function openNav() {
   document.getElementById("mySidenav").style.width = "100%";
 }

function closeNav() {
   document.getElementById("mySidenav").style.width = "0";
 }

function switchCavities(cavities){
    document.getElementById("containerLeft").style.display = "block";
    document.getElementById("containerRight").style.display = "block";
    switch (cavities) {
      case '2':
            document.getElementById("c1Top").style.display = "block";
            document.getElementById("c2Top").style.display = "block";
            document.getElementById("c3Top").style.display = "none";
            document.getElementById("c4Top").style.display = "none";
            document.getElementById("c5Top").style.display = "none";
            document.getElementById("c6Top").style.display = "none";
            document.getElementById("c1Bottom").style.display = "block";
            document.getElementById("c2Bottom").style.display = "block";
            document.getElementById("c3Bottom").style.display = "none";
            document.getElementById("c4Bottom").style.display = "none";
            document.getElementById("c5Bottom").style.display = "none";
            document.getElementById("c6Bottom").style.display = "none";
            break;
      case '3':
            document.getElementById("c1Top").style.display = "block";
            document.getElementById("c2Top").style.display = "block";
            document.getElementById("c3Top").style.display = "block";
            document.getElementById("c4Top").style.display = "none";
            document.getElementById("c5Top").style.display = "none";
            document.getElementById("c6Top").style.display = "none";
            document.getElementById("c1Bottom").style.display = "block";
            document.getElementById("c2Bottom").style.display = "block";
            document.getElementById("c3Bottom").style.display = "block";
            document.getElementById("c4Bottom").style.display = "none";
            document.getElementById("c5Bottom").style.display = "none";
            document.getElementById("c6Bottom").style.display = "none";
             break;
      case '4':
            document.getElementById("c1Top").style.display = "block";
            document.getElementById("c2Top").style.display = "block";
            document.getElementById("c3Top").style.display = "block";
            document.getElementById("c4Top").style.display = "block";
            document.getElementById("c5Top").style.display = "none";
            document.getElementById("c6Top").style.display = "none";
            document.getElementById("c1Bottom").style.display = "block";
            document.getElementById("c2Bottom").style.display = "block";
            document.getElementById("c3Bottom").style.display = "block";
            document.getElementById("c4Bottom").style.display = "block";
            document.getElementById("c5Bottom").style.display = "none";
            document.getElementById("c6Bottom").style.display = "none";
             break;
      case '5':
            document.getElementById("c1Top").style.display = "block";
            document.getElementById("c2Top").style.display = "block";
            document.getElementById("c3Top").style.display = "block";
            document.getElementById("c4Top").style.display = "block";
            document.getElementById("c5Top").style.display = "block";
            document.getElementById("c6Top").style.display = "none";
            document.getElementById("c1Bottom").style.display = "block";
            document.getElementById("c2Bottom").style.display = "block";
            document.getElementById("c3Bottom").style.display = "block";
            document.getElementById("c4Bottom").style.display = "block";
            document.getElementById("c5Bottom").style.display = "block";
            document.getElementById("c6Bottom").style.display = "none";
             break;
      case '6':
            document.getElementById("c1Top").style.display = "block";
            document.getElementById("c2Top").style.display = "block";
            document.getElementById("c3Top").style.display = "block";
            document.getElementById("c4Top").style.display = "block";
            document.getElementById("c5Top").style.display = "block";
            document.getElementById("c6Top").style.display = "block";
            document.getElementById("c1Bottom").style.display = "block";
            document.getElementById("c2Bottom").style.display = "block";
            document.getElementById("c3Bottom").style.display = "block";
            document.getElementById("c4Bottom").style.display = "block";
            document.getElementById("c5Bottom").style.display = "block";
            document.getElementById("c6Bottom").style.display = "block";
             break;
      default:
        break;
    }
  }

function getNumberOfSeeds(btvalue){
    return parseInt(btvalue, 10);
  }

function getEnemieContainer(id){
    let lastChar = id.charAt(id.length - 1);
    if(lastChar == 'm') return "containerLeft"; //significa que foi clicado alguma cavidade no BottoM
    else return "containerRight"; //foi clickado uma cavidade do ToP
  }

function getIndexOf(id, parent){
    let pos = 0;
    for(;pos<14; pos++){
      if(parent[pos].id == id)
        return pos;
    }
  }

function isCavityShowing(cavity){
    return cavity.style.display === 'block';
  }

function sortSeedsPerCavity(id, numOfSeeds){
    let lastSeedCavityEmpty = 0;
    let controlo = 0;

    var semnt = document.createElement( "span" );
    semnt.className = "Semente";

    let enemieContainer = getEnemieContainer(id); // descobrir qual o player que esta a jogar
    let parent = document.getElementsByClassName("Cavidade");

    let pos = getIndexOf(id, parent);
    let i = pos;

    while (numOfSeeds > 0){
      if(i<=6){ // cavidades top
        if (controlo==0){
          i--;
          controlo = 1;
        }
        if(i<0){
          i=7; // passa para a pos do c1Bottom (e vai crescer)
          continue;
        }
        if((isCavityShowing(parent[i])) && (parent[i].id != enemieContainer)){
          let newNumOfSeeds = parseInt(parent[i].innerText, 10) + 1 + "\n";
          parent[i].innerText = newNumOfSeeds;
          if (parent[i].id == "containerRight") {
            document.getElementById("p2Score").innerText = newNumOfSeeds;
          } else if (parent[i].id == "containerLeft") {
            document.getElementById("p1Score").innerText = newNumOfSeeds;
          }
          for(let j = 0; j<newNumOfSeeds; j++){
            let color = getRandomColor();
            semnt.style.backgroundColor = color;
            parent[i].appendChild(semnt);
            parent[i].innerHTML += "";
          }
          numOfSeeds--;
          let lastChar = parent[i].id.charAt(parent[i].id.length-1);
          if((numOfSeeds == 0) && (parent[i].id == "containerLeft") && (someoneFinish()== 0)) turno = 1;
          if((numOfSeeds == 0) && (turno == 2) && (parseInt(parent[i].innerText) == 1) && (parent[i].id != id)){
            let lastChar = parent[i].id.charAt(parent[i].id.length-1);
              if(lastChar == "p"){
                retriveOppositeCavitySeeds(parent[i].id, "containerLeft");
              }
          }
        }
        i--;
      } else {
        if (controlo==0){
          i++;
          controlo = 1;
        }
        if(i==14){
          i=6; // passa para a pos do c6Top (e vai decrescer)
          continue;
        }
        else if((isCavityShowing(parent[i])) && (parent[i].id != enemieContainer)){
          let newNumOfSeeds = parseInt(parent[i].innerText, 10) + 1 + "\n";
          parent[i].innerText = newNumOfSeeds;
          if (parent[i].id == "containerRight") {
            document.getElementById("p2Score").innerText = newNumOfSeeds;
          } else if (parent[i].id == "containerLeft") {
            document.getElementById("p1Score").innerText = newNumOfSeeds;
          }
          for(let j = 0; j<newNumOfSeeds; j++){
            let color = getRandomColor();
            semnt.style.backgroundColor = color;
            parent[i].appendChild(semnt);
            parent[i].innerHTML += "";
          }
          numOfSeeds--;
          if((numOfSeeds == 0) && (parent[i].id == "containerRight") && (someoneFinish() == 0)) turno = 2;
          if((numOfSeeds == 0) && (turno == 1) && (parseInt(parent[i].innerText) == 1) && (parent[i].id != id)){ // ver se a peça escolhida tb conta
            let lastChar = parent[i].id.charAt(parent[i].id.length-1);
              if(lastChar == "m"){
                retriveOppositeCavitySeeds(parent[i].id, "containerRight");
              }
          }
        }
        i++;
      }
    }
}

function getElement(v, i) {
  return v[i];
}

function Desistir() {
  if (turno == 1) {
    alert("Player 1 Wins!");
  } else {
    alert("Player 2 Wins!");
  }
  document.forms["myForm"].submit();
}

function Newgame() {

  if (name === undefined || password === undefined) {
    alert("Faça o Login!!");
    return;
  }

  sementes = document.getElementById("sementes");
  const semnt = document.createElement("span");
  let parent = document.getElementsByClassName("Cavidade");

  if(document.getElementById("cpu").checked) {
    ia = 1;
  }else if(document.getElementById("local").checked) {
    ia = 0;
  }

  if(document.getElementById("sim").checked) {
    turno = 1;
  }else if(document.getElementById("nao").checked) {
    turno = 2;
  }

  //numero de cavidades
  cavidades = document.getElementById("cavities");
  switchCavities(cavidades.value);

  //posicionar as sementes em cada cavidade
  semnt.className = "Semente";
  for (let j = 0; j < parent.length; j++) {
    if (parent[j].id == "containerLeft" || parent[j].id == "containerRight"){
      parent[j].innerHTML = "0";
      continue;
    }
    parent[j].innerText = sementes.value + "\n";
    for (let i = 0; i < sementes.value; i++) {
      let color = getRandomColor();
      semnt.style.backgroundColor = color;
      parent[j].appendChild(semnt);
      parent[j].innerHTML += "";
    }
  }
  document.getElementById("p1Score").innerText = "0";
  document.getElementById("p2Score").innerText = "0";
  nextTurn();
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function myClicked(id){
  const button = document.getElementById(id);
  let btvalue = button.innerText;
  let numOfSeeds = getNumberOfSeeds(btvalue);

  if (btvalue != 0) {
    document.getElementById(id).innerText = 0;
    sortSeedsPerCavity(id, numOfSeeds);
  }
  let didSomeoneFinish = someoneFinish();
  if(didSomeoneFinish != 0){
    transferLastSeeds(didSomeoneFinish);
    getWinner();
    endGame(didSomeoneFinish);
  } else {
    nextTurn();
  }
}

function nextTurn(){
  if (ia == 0){
    if (turno == 1) {
      document.getElementById("c1Top").disabled = false;
      document.getElementById("c2Top").disabled = false;
      document.getElementById("c3Top").disabled = false;
      document.getElementById("c4Top").disabled = false;
      document.getElementById("c5Top").disabled = false;
      document.getElementById("c6Top").disabled = false;
      document.getElementById("c1Bottom").disabled = true;
      document.getElementById("c2Bottom").disabled = true;
      document.getElementById("c3Bottom").disabled = true;
      document.getElementById("c4Bottom").disabled = true;
      document.getElementById("c5Bottom").disabled = true;
      document.getElementById("c6Bottom").disabled = true;
      turno +=1;
    } else if (turno == 2) {
        document.getElementById("c1Top").disabled = true;
        document.getElementById("c2Top").disabled = true;
        document.getElementById("c3Top").disabled = true;
        document.getElementById("c4Top").disabled = true;
        document.getElementById("c5Top").disabled = true;
        document.getElementById("c6Top").disabled = true;
        document.getElementById("c1Bottom").disabled = false;
        document.getElementById("c2Bottom").disabled = false;
        document.getElementById("c3Bottom").disabled = false;
        document.getElementById("c4Bottom").disabled = false;
        document.getElementById("c5Bottom").disabled = false;
        document.getElementById("c6Bottom").disabled = false;
        turno-=1;
    }
  } else {
    if (turno == 1) {
      document.getElementById("c1Top").disabled = false;
      document.getElementById("c2Top").disabled = false;
      document.getElementById("c3Top").disabled = false;
      document.getElementById("c4Top").disabled = false;
      document.getElementById("c5Top").disabled = false;
      document.getElementById("c6Top").disabled = false;
      document.getElementById("c1Bottom").disabled = true;
      document.getElementById("c2Bottom").disabled = true;
      document.getElementById("c3Bottom").disabled = true;
      document.getElementById("c4Bottom").disabled = true;
      document.getElementById("c5Bottom").disabled = true;
      document.getElementById("c6Bottom").disabled = true;
      turno += 1;
    } else if (turno == 2) {
      document.getElementById("c1Top").disabled = true;
      document.getElementById("c2Top").disabled = true;
      document.getElementById("c3Top").disabled = true;
      document.getElementById("c4Top").disabled = true;
      document.getElementById("c5Top").disabled = true;
      document.getElementById("c6Top").disabled = true;
      turno-=1;
      iaPlay();
    }
  }
}

function iaPlay(){
  const parent = document.getElementsByClassName("Cavidade");
  let cavidade = getRandomArbitrary(1,parseInt(cavidades.value)+1);
  let idcavidade = "c" + cavidade + "Bottom"
  let pos = getIndexOf(idcavidade, parent);
  while(parent[pos].innerText == '0'){
    idcavidade = "";
    cavidade = getRandomArbitrary(1,parseInt(cavidades.value)+1);
    idcavidade = "c" + cavidade + "Bottom"
    pos = getIndexOf(idcavidade, parent);
  }
  setTimeout(() => {  myClicked(idcavidade); }, 1500);
}

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function someoneFinish(){
    let parent = document.getElementsByClassName("Cavidade");
    for(let i = 1; i<7; i++){
      if(parent[i].style.display=="block" && parent[i].innerText != "0")
        break;
      if(i==6){ //todas as cavidades de cima estão vazias
        return 1;
      }
    }
    for(let j = 7; j<13; j++){
      if(parent[j].style.display=="block" && parent[j].innerText != "0")
        break;
      if(j==12){ //todas as cavidades de baixo estão vazias
        return 2;
      }
    }
    return 0;
  }

function transferLastSeeds(playerWhoEmptied){
    const parent = document.getElementsByClassName("Cavidade");
    if(playerWhoEmptied == 1){
      let total = parseInt(document.getElementById("containerRight").innerHTML, 10);
      for(let j = 7; j<13; j++){
        if(parent[j].style.display == "block" && parent[j].innerText != "0"){
          total += parseInt(parent[j].innerHTML, 10);
          parent[j].innerHTML = "0";
        }
      }
      document.getElementById("containerRight").innerText = total + "\n";
      document.getElementById("p2Score").innerText = total + "\n";
    } else {
      let total = parseInt(document.getElementById("containerLeft").innerHTML, 10);
      for(let j = 1; j<7; j++){
        if(parent[j].style.display=="block" && parent[j].innerText != "0"){
          total += parseInt(parent[j].innerText, 10);
          parent[j].innerText = "0";
        }
      }
      document.getElementById("containerLeft").innerText = total + "\n";
      document.getElementById("p1Score").innerText = total + "\n";
    }
  }

function getWinner(){
  const score1 = parseInt(document.getElementById("containerLeft").innerText);
  const score2 = parseInt(document.getElementById("containerRight").innerText);
  //console.log("score1 = " + score1);
  //console.log("score2 = " + score2);
  if (score1 > score2) {
    alert("Player 1 Wins!");
  } else if (score1 < score2) {
    alert("Player 2 Wins!");
  } else {
    alert("It's a Draw!");
  }
  /*if(score1 > score2) registerHighScoreBoard(score1, "Player 1");
  else registerHighScoreBoard(score2, "Player 2");*/
}

function registerHighScoreBoard(score, player){

  console.log("Score: "+ score);
  console.log("Player: "+player);
  let pont1 = parseInt(document.getElementById("pont1"));
  console.log("pont1 = "+pont1);
  if(score > pont1 ){
    let nome1 = document.getElementById("nome1");
    nome1.innerHTML = player;
    pont1.innerHTML = score;
  } else {
    let pont2 = parseInt(document.getElementById("pont2"));
    if(score > pont2){
      alert("Entrou");
      let nome1 = document.getElementById("nome2");
      nome2.innerHTML = player;
      pont2.innerHTML = score;
    } else {
      let pont3 = parseInt(document.getElementById("pont3"));
      if(score > pont3 ){
        let nome1 = document.getElementById("nome3");
        nome3.innerHTML = player;
        pont3.innerHTML = score;
      } else {
        let pont4 = parseInt(document.getElementById("pont4"));
        if(score > pont4 ){
          let nome4 = parseInt(document.getElementById("nome4"));
          nome4.innerHTML = player;
          pont4.innerHTML = score;
        } else {
          let pont5 = parseInt(document.getElementById("pont5"));
          if(score > pont5 ){
            let nome5 = document.getElementById("nome5");
            nome5.innerHTML = player;
            pont5.innerHTML = score;
          }
        }
      }
    }
  }
}

function endGame(playerWhoPlayedLast){
    let semnt = document.createElement( "span" );
    semnt.className = "Semente";

    document.getElementById("c1Top").disabled = true;
    document.getElementById("c2Top").disabled = true;
    document.getElementById("c3Top").disabled = true;
    document.getElementById("c4Top").disabled = true;
    document.getElementById("c5Top").disabled = true;
    document.getElementById("c6Top").disabled = true;
    document.getElementById("c1Bottom").disabled = true;
    document.getElementById("c2Bottom").disabled = true;
    document.getElementById("c3Bottom").disabled = true;
    document.getElementById("c4Bottom").disabled = true;
    document.getElementById("c5Bottom").disabled = true;
    document.getElementById("c6Bottom").disabled = true;

    const seedsRight = document.getElementById("containerRight");
    const seedsLeft = document.getElementById("containerLeft");
    if(playerWhoPlayedLast == 1){
      for(let j = 0; j<parseInt(seedsRight.innerText, 10); j++){
        let color = getRandomColor();
        semnt.style.backgroundColor = color;
        seedsRight.appendChild(semnt);
        seedsRight.innerHTML += "";
      }
    } else {
      for(let i = 0; i<parseInt(seedsLeft.innerText, 10); i++){
        let color = getRandomColor();
        semnt.style.backgroundColor = color;
        seedsLeft.appendChild(semnt);
        seedsLeft.innerHTML += "";
      }
    }
}

function retriveOppositeCavitySeeds(cavity, container){
  switch(cavity){
    case "c1Top":
      sendToContainer(container,"c1Top","c1Bottom");
      break;
    case "c2Top":
      sendToContainer(container,"c2Top","c2Bottom");
      break;
    case "c3Top":
      sendToContainer(container,"c3Top","c3Bottom");
      break;
    case "c4Top":
      sendToContainer(container,"c4Top","c4Bottom");
      break;
    case "c5Top":
      sendToContainer(container,"c5Top","c5Bottom");
      break;
    case "c6Top":
      sendToContainer(container,"c6Top","c6Bottom");
      break;
    case "c1Bottom":
      sendToContainer(container,"c1Bottom","c1Top");
      break;
    case "c2Bottom":
      sendToContainer(container,"c2Bottom","c2Top");
      break;
    case "c3Bottom":
      sendToContainer(container,"c3Bottom" ,"c3Top");
      break;
    case "c4Bottom":
      sendToContainer(container,"c4Bottom" ,"c4Top");
      break;
    case "c5Bottom":
      sendToContainer(container,"c5Bottom","c5Top");
      break;
    case "c6Bottom":
      sendToContainer(container,"c6Bottom","c6Top");
      break;
  }
}

function sendToContainer(containerId, firstCavityId, oppositeCavityId){
  let container = document.getElementById(containerId);
  let firstCavity = document.getElementById(firstCavityId);
  let oppositeCavity = document.getElementById(oppositeCavityId);
  let totalToAdd = parseInt(firstCavity.innerText, 10) + parseInt(oppositeCavity.innerText, 10);
  let total = totalToAdd + parseInt(container.innerText, 10);
  console.log("Total: "+ total);
  if (containerId == "containerRight") {
    document.getElementById("p2Score").innerText = total;
  } else{
    document.getElementById("p1Score").innerText = total;
  }
  firstCavity.innerText = "0";
  oppositeCavity.innerText = "0";
  container.innerText = total + "\n";
  console.log("Total to add:"+ totalToAdd);
  var semnt = document.createElement( "span" );
  semnt.className = "Semente";
  for(let j = 0; j<total; j++){
    let color = getRandomColor();
    semnt.style.backgroundColor = color;
    container.appendChild(semnt);
    container.innerHTML += "";
  }
}

function openLogin(){

  document.getElementById("login").style.width = "100%";
  document.getElementById("menulogin").style.width = "30%";
  document.getElementById("menulogin").style.borderRadius = "15px";
  document.getElementById("menulogin").style.backgroundColor = "darkgray";
  document.getElementById("menulogin").style.padding = "0px 25px";
  document.getElementById("menulogin").style.paddingTop = "105px";
  document.getElementById("menulogin").style.textAlign = "center";
  document.getElementById("menulogin").style.height = "35%";
  document.getElementById("menulogin").style.verticalAlign = "middle";
  document.getElementById("menulogin").style.verticalAlign = "middle";
  document.getElementById("menulogin").style.margin = "80px auto auto";
  document.getElementById("password").style.marginTop = "5px";
  document.getElementById("password").style.lineHeight = "18px";
  document.getElementById("username").style.lineHeight = "18px";
  document.getElementById("password").value = "";
  document.getElementById("username").value = "";
}

function closeLogin() {
   document.getElementById("login").style.width = "0";
 }

function log(){

  name = $('username').value;
  password = $('password').value;

  let conta = {
    nick : name,
    password : password
  };

  const validade = sendRequest("register", conta);
  closeLogin();
}

function logAdmin(){
  name = 'francisco'
  password = '1234';

  let conta = {
    nick : name,
    password : password
  };

  const validade = sendRequest("register", conta);
  closeLogin();
}

function ranking(){
  sendRequest("ranking", "");
}

function join(){

  if (name === undefined || password === undefined) {
    alert("Faça o Login!!");
    return;
  }

  if (sementes === undefined || cavidades === undefined){
    alert("Submeta as opções do jogo");
    return;
  }

  let jogo = {
    group: 25,
    nick: name,
    password: password,
    size: cavidades.value,
    initial: sementes.value,
  };

  sendRequest("join", jogo);

}

function leave(){
  if (name === undefined || password === undefined) {
    alert("Faça o Login!!");
    return;
  }

  let desistiu = {
    game: game,
    nick: name,
    password: password
  };

  sendRequest("leave", desistiu);
}

function notify(id){

  if (name === undefined || password === undefined) {
    alert("Faça o Login!!");
    return;
  }

  const move = parseInt(id.charAt(1))-1;
  alert(move);

  if (move < 0 || !Number.isInteger(move)){
    alert("Jogada inválida");
    return;
  }


  let notificacao = {
    nick: name,
    password: password,
    game: game,
    move: move
  };

    sendRequest("notify", notificacao);
}

function update(){ // AQUI É COM GET
  if (name === undefined || password === undefined) {
    alert("Faça o Login!!");
    return;
  }

  if (game == undefined) {
    alert("Não fez join a um jogo");
    return;
  }

  const url = "update?nick="+name+"&game="+game;
  const link = "http://twserver.alunos.dcc.fc.up.pt:8008/" + url;

  var eventSource = new EventSource(link);
  eventSource.onmessage = function(event) {
     const data = JSON.parse(event.data);
     console.log(data); // pk quando ponho string aparece a data como objeto?
     if (data.winner != undefined) {
       if (data.winner == name) alert("Venceu o jogo");
       else alert("Perdeu o jogo");
       eventSource.close();
       return;
     }

     if (data.board != undefined) { // recebeu um update do tabuleiro
       const jogadores = Object.keys(data.board.sides);
       let player1 = jogadores[0];
       const player2 = jogadores[1];
       let cavidade = "";
       //console.log(data.board.sides[player1]);

       if (player1 == name) { // quer dizer que o utilz. é este jogador
         cavidade = "Top";
       } else {
         cavidade = "Bottom"
       }

       /* FAZER O CICLO UMA VEZ PARA UM DOS JOGADORES (CICLO + IF) */
       let i = 0;
       while (i<2) {
         for (let i = 0; i < data.board.sides[player1].pits.length; i++) {
           const cavatual = "c" + (i+1) + cavidade;
           const value = data.board.sides[player1].pits[i];
           $(cavatual).innerText = value + "\n";
           drawSeeds(cavatual, value);
         }
         value = data.board.sides[player1].store;
         if (cavidade.charAt(cavidade.length-1) == 'm') { // ver a ultima letra para descobrir o armazem
           $('containerRight').innerText = value + "\n";
           drawSeeds('containerRight', value);
         } else {
           $('containerLeft').innerText = value + "\n";
           drawSeeds('containerLeft', value);
         }

         if (cavidade == "Top") cavidade = "Bottom";
         else cavidade = "Top";
         player1 = player2;
         i++;
       }

     }
  }

}

function drawSeeds(id, value){
  var semnt = document.createElement( "span" );
  semnt.className = "Semente";
  const parent = $(id);

  for(let j = 0; j<value; j++){
    let color = getRandomColor();
    semnt.style.backgroundColor = color;
    parent.appendChild(semnt);
    parent.innerHTML += "";
  }
}


function sendRequest(type, object){

  if(!XMLHttpRequest) { alert('XHR não é suportado'); return; }

  const xhr = new XMLHttpRequest();
  const link = "http://twserver.alunos.dcc.fc.up.pt:8008/" + type;

  xhr.open('POST',link,true);
    xhr.onreadystatechange = function() {
      if (xhr.responseText === '{"error":"User registered with a different password"}') {
        alert('Palavra-passe incorreta');
      }
      if(xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);
            console.log(data);
            if(type == "register") {
              $('nome').innerText = object.nick;
            } else if (type == "join") {
              game = data.game;
              update();
            }
    }
  }

  xhr.send(JSON.stringify(object));
}
