let turno, ia, cavidades;

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
    if(lastChar == 'm') return "containerLeft"; //significa que foi clicado alguma cavidade no BottoMMMMM
    else return "containerRight"; //foi clickado uma cavidade do ToPPPP
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
    let parent = document.getElementsByClassName("Cavidade");  //array = [cLeft, c1Top, c2Top, c3Top, c4Top, c5Top, c6Top, c1Bottom, c2Bottom, c3Bottom, c4Bottom, c5Bottom, c6Bottom, cRight]

    let pos = getIndexOf(id, parent);
    let i = pos;

    while (numOfSeeds > 0){
      //alert("i = " + i);
      if(i<=6){ // cavidades top
        if (controlo==0){
          i--;
          controlo = 1;
        }
        if(i<0){
          i=7; // tem que ser -1 pk se for 0 incrementa logo por causa do ciclo for e nunca conta o conteinerLeft
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
            //alert("Entrei "+parent[i].id);
            let color = getRandomColor();
            semnt.style.backgroundColor = color;
            parent[i].appendChild(semnt);
            parent[i].innerHTML += "";
            //alert(parent[i].innerText);
          }
          numOfSeeds--;
          let lastChar = parent[i].id.charAt(parent[i].id.length-1);
          //alert("Letra final = " + lastChar);
          if((numOfSeeds == 0) && (parent[i].id == "containerLeft") && (someoneFinish()== 0)) turno = 1;
          if((numOfSeeds == 0) && (turno == 2) && (parseInt(parent[i].innerText) == 1)){
            let lastChar = parent[i].id.charAt(parent[i].id.length-1);
            //alert("chegou aqui em cima");
            //alert("last Char = " + lastChar);
              if(lastChar == "p"){
                //alert("Entrou while baixo");
                //alert("Passou teste");
                //alert("Letra final = " + parent[i].id.charAt(parent[i].id.length-1));
                retriveOppositeCavitySeeds(parent[i].id, "containerLeft");
              }
          }
        }
        i--;
      } else {
        //alert("i = " + i)
        if (controlo==0){
          i++;
          controlo = 1;
        }
        if(i==14){
          i=6; // tem que ser -1 pk se for 0 incrementa logo por causa do ciclo for e nunca conta o conteinerLeft
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
          if((numOfSeeds == 0) && (turno == 1) && (parseInt(parent[i].innerText) == 1)){
            let lastChar = parent[i].id.charAt(parent[i].id.length-1);
            //alert("turno = " + turno);
            //alert("chegou aqui em baixo");
            //alert("last Char = " + lastChar);
              if(lastChar == "m"){
                //alert("Entrou while baixo");
                //alert("Passou teste");
                //alert("Letra final = " + parent[i].id.charAt(parent[i].id.length-1));
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
  if(document.getElementById("cpu").checked) {
    ia = 1;
  }else if(document.getElementById("local").checked) {
    ia = 0;
  }

  //numero de cavidades
  cavidades = document.getElementById("cavities");
  //console.log("cavidades = " + cavidades.value);
  switchCavities(cavidades.value);

  if(document.getElementById("sim").checked) {
    turno = 1;
  }else if(document.getElementById("nao").checked) {
    turno = 2;
  }

  const sementes = document.getElementById("sementes");
  const semnt = document.createElement("span");
  let parent = document.getElementsByClassName("Cavidade");
  //parent = organizarLista(parent);

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
  //alert("new game turn = " + turno);
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
  //alert("Chegou aqui");
  let didSomeoneFinish = someoneFinish();
  //alert("didSomeoneFinish = " + didSomeoneFinish);
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
      turno-=1;
      iaPlay();
    }
  }
}

function iaPlay(){
  const parent = document.getElementsByClassName("Cavidade");
  let cavidade = getRandomArbitrary(1,parseInt(cavidades.value)+1);
  console.log("cavidade ia = " + cavidade);
  let idcavidade = "c" + cavidade + "Bottom"
  console.log("idcavidade ia = " + idcavidade);
  let pos = getIndexOf(idcavidade, parent);
  console.log("id = " + parent[pos].id);
  while(parent[pos].innerText == '0'){
    console.log("VAZIA");
    idcavidade = "";
    cavidade = getRandomArbitrary(1,parseInt(cavidades.value)+1);
    console.log("cavidade ia = " + cavidade);
    idcavidade = "c" + cavidade + "Bottom"
    console.log("idcavidade ia = " + idcavidade);
    pos = getIndexOf(idcavidade, parent);
  }
  setTimeout(() => {  myClicked(idcavidade); }, 1500);
  //myClicked(idcavidade);
}

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function someoneFinish(){
    let parent = document.getElementsByClassName("Cavidade");
  /*  alert("parent[i]="+parent[1].id);
    alert("parent")
    alert("parent[i]="+parent[2].id);
    alert("parent[i]="+parent[3].id);
    alert("parent[i]="+parent[4].id);
    alert("parent[i]="+parent[5].id);
    alert("parent[i]="+parent[6].id);
    */
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
      //alert("armazém direita total = " + total)
      for(let j = 7; j<13; j++){
        if(parent[j].style.display == "block" && parent[j].innerText != "0"){
          //alert("Entrou no for de cima");
          total += parseInt(parent[j].innerHTML, 10);
          //console.log("TotalBottom: " + total);
          parent[j].innerHTML = "0";
          //alert("armazém direita, novo total = " + total)
        }
      }
      document.getElementById("containerRight").innerText = total + "\n";
    } else {
      let total = parseInt(document.getElementById("containerLeft").innerHTML, 10);
      //alert("armazém esquerda total = " + total)
      for(let j = 1; j<7; j++){
        if(parent[j].style.display=="block" && parent[j].innerText != "0"){
          //alert("Entrou no for de baixo");
          total += parseInt(parent[j].innerText, 10);
          //console.log("TotalTop: " + total);
          parent[j].innerText = "0";
          //alert("armazém esquerda, novo total = " + total);
        }
      }
      document.getElementById("containerLeft").innerText = total + "\n";
    }
  }

function getWinner(){
  const score1 = document.getElementById("containerLeft").innerText;
  const score2 = document.getElementById("containerRight").innerText;
  alert("score1 = " + score1);
  alert("score2 = " + score2);
  if (score1 > score2) {
    alert("Player 1 Wins!");
  } else if (score1 < score2) {
    alert("Player 2 Wins!");
  } else {
    alert("It's a Draw!");
  }
  if(score1 > score2)
    registerHighScoreBoard(score1, "Player 1");
  else registerHighScoreBoard(score2, "Player 2")
}

function registerHighScoreBoard(score, player){
  alert("Entrou Funçao");
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
      //alert("Entrou 1");
      sendToContainer(container,"c1Top","c1Bottom");
      break;
    case "c2Top":
      //alert("Entrou 2");
      sendToContainer(container,"c2Top","c2Bottom");
      break;
    case "c3Top":
    //alert("Entrou 3");
      sendToContainer(container,"c3Top","c3Bottom");
      break;
    case "c4Top":
    //alert("Entrou 4");
      sendToContainer(container,"c4Top","c4Bottom");
      break;
    case "c5Top":
  //  alert("Entrou 5");
      sendToContainer(container,"c5Top","c5Bottom");
      break;
    case "c6Top":
    //alert("Entrou 6");
      sendToContainer(container,"c6Top","c6Bottom");
      break;
    case "c1Bottom":
  //  alert("Entrou 7");
      sendToContainer(container,"c1Bottom","c1Top");
      break;
    case "c2Bottom":
  //  alert("Entrou 8");
      sendToContainer(container,"c2Bottom","c2Top");
      break;
    case "c3Bottom":
  //  alert("Entrou 9");
      sendToContainer(container,"c3Bottom" ,"c3Top");
      break;
    case "c4Bottom":
    //alert("Entrou 10");
      sendToContainer(container,"c4Bottom" ,"c4Top");
      break;
    case "c5Bottom":
    //alert("Entrou 11");
      sendToContainer(container,"c5Bottom","c5Top");
      break;
    case "c6Bottom":
    //alert("Entrou 12");
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
