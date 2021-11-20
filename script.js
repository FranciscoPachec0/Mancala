let turno;
let ia;
let list = ["c6Top", "c5Top", "c4Top", "c3Top", "c2Top", "c1Top", "containerLeft",
        "c1Bottom", "c2Bottom", "c3Bottom", "c4Bottom", "c5Bottom", "c6Bottom", "containerRight"];

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
      var semnt = document.createElement( "span" );
      semnt.className = "Semente";
      let enemieContainer = getEnemieContainer(id); // descobrir qual o player que esta a jogar
      let parent = document.getElementsByClassName("Cavidade");  //array = [cLeft, c1Top, c2Top, c3Top, c4Top, c5Top, c6Top, c1Bottom, c2Bottom, c3Bottom, c4Bottom, c5Bottom, c6Bottom, cRight]
      for (let k = 0; k < parent.length; k++) {
        console.log("lol: " + parent[k].id);
      }
      let pos = getIndexOf(id, parent);
      if(pos<=6){ // cavidades top
        for(let i=pos-1; numOfSeeds > 0; i--){
          alert("Entrou no 1");
          if(i<0){
            i=14; // tem que ser -1 pk se for 0 incrementa logo por causa do ciclo for e nunca conta o conteinerLeft
          }
          else if((isCavityShowing(parent[i])) && (parent[i].id != enemieContainer)){
            let newNumOfSeeds = parseInt(parent[i].innerText, 10) + 1 + "\n";
            let oldNumOfSeeds = parseInt(parent[i].innerText, 10);
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
            //if(numOfSeeds == 0 && oldNumOfSeeds == 0) lastSeedCavityEmpty = parent[i].id;
          }
        }
      } else { // cavidades bottom
        for(let i=pos+1; numOfSeeds > 0; i++){
          alert("2 -> i = " + i);
          if(i==14){
            i=-1; // tem que ser -1 pk se for 0 incrementa logo por causa do ciclo for e nunca conta o conteinerLeft
          }
          else if((isCavityShowing(parent[i])) && (parent[i].id != enemieContainer)){
            let newNumOfSeeds = parseInt(parent[i].innerText, 10) + 1 + "\n";
            parent[i].innerText = newNumOfSeeds;
            let oldNumOfSeeds = parseInt(parent[i].innerText, 10);
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
            //if(numOfSeeds == 0 && oldNumOfSeeds == 0) lastSeedCavityEmpty = parent[i].id;
          }
        }
      }
      //if(lastSeedCavityEmpty != 0) swapFrontCavity(lastSeedCavityEmpty);
  }  

/*
function swapFrontCavity(lastSeedCavityEmpty){
  switch(lastSeedCavityEmpty){
    case "c1Top":
    swap("c1Top","c1Bottom");
    break;
    case "c2Top":
    swap("c2Top","c2Bottom");
    break;
    case "c3Top":
    swap("c3Top","c3Bottom");
    break;
    case "c4Top":
    swap("c4Top","c4Bottom");
    break;
    case "c5Top":
    swap("c5Top","c5Bottom");
    break;
    case "c6Top":
    swap("c6Top","c6Bottom");
    break;
    case "c1Bottom":
    swap("c1Bottom","c1Top");
    break;
    case "c2Bottom":
    swap("c2Bottom","c2Top");
    break;
    case "c3Bottom":
    swap("c3Bottom","c3Top");
    break;
    case "c4Bottom":
    swap("c4Bottom","c4Top");
    break;
    case "c5Bottom":
    swap("c5Bottom","c5Top");
    break;
    case "c6Bottom":
    swap("c6Bottom","c6Top");
    break;
  }
}

function swap(destiny, source){
  let sourceval = document.getElementById(source).innerText;
  let destinyval = parseInt(document.getElementById(destiny).innerText);

  document.getElementById(source).innerText = "0";
  let newNumOfSeeds = destinyval + sourceval;
  document.getElementById(destiny).innerText = newNumOfSeeds;
  let pos = getIndexOf(destiny);
  for(let j = 0; j<newNumOfSeeds; j++){
    //alert("Entrei "+parent[i].id);
    let color = getRandomColor();
    semnt.style.backgroundColor = color;
    parent[pos].appendChild(semnt);
    parent[pos].innerHTML += "";
    //alert(parent[i].innerText);
  }
}
*/

function getElement(v, i) {
  return v[i];
}

function Reset() {
    document.forms["myForm"].submit();
}

function Newgame() {
  if(document.getElementById("cpu").checked) {
    ia = 1;
  }else if(document.getElementById("local").checked) {
    ia = 0;
  }

  //numero de cavidades
  const cavidades = document.getElementById("cavities");
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
  nextTurn(cavidades.value);
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
  //alert("Who won ="+ whoWon);
  //alert("didSomeoneFinish = " + didSomeoneFinish);
  if(didSomeoneFinish != 0){
    transferLastSeeds(didSomeoneFinish);
    getWinner();
    endGame(didSomeoneFinish);
  }
  nextTurn();
}

function nextTurn(cavidades){
  //if (ia == 0){
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
    /*
  } else {
    if (turno == 1) {
      //alert("cavidades ia = " + cavidades);
      alert("Aqui 1");
      document.getElementById("c1Bottom").disabled = true;
      document.getElementById("c2Bottom").disabled = true;
      document.getElementById("c3Bottom").disabled = true;
      document.getElementById("c4Bottom").disabled = true;
      document.getElementById("c5Bottom").disabled = true;
      document.getElementById("c6Bottom").disabled = true;
      turno += 1;
    } else if (turno == 2) {
      alert("Aqui 2");
      alert("jogada ia");
      turno-=1;
      iaPlay(cavidades);
    }
  }*/
}

/*
function iaPlay(cavidades){
  alert("IA cavidades = " + cavidades);
  const cavidade = getRandomArbitrary(1,cavidades);
  alert("cavidade ia = " + cavidade);
  const idcavidade = "c" + cavidade + "Bottom"
  alert("idcavidade ia = " + idcavidade);
  myClicked(idcavidade);
}
*/

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
      let total = parseInt(document.getElementById("containerRight").innerHTML);
      alert("armazém direita total = " + total)
      for(let j = 7; j<13; j++){
        if(parent[j].style.display == "block" && parent[j].innerText != "0"){
          total += parseInt(parent[j].innerHTML);
          parent[j].innerHTML = "0";
          //alert("armazém direita, novo total = " + total)
        }
      }
      document.getElementById("containerRight").innerText = total + "\n";
    } else {
      let total = parseInt(document.getElementById("containerLeft").innerHTML);
      alert("armazém esquerda total = " + total)
      for(let j = 1; j<7; j++){
        if(parent[j].style.display=="block" && parent[j].innerText != "0"){
          total += parseInt(parent[j].innerText);
          parent[j].innerText = "0";
          //alert("armazém esquerda, novo total = " + total);
        }
      }
      //document.getElementById("containerLeft").innerText = total + "\n";
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
        alert("Entrou");
        let color = getRandomColor();
        semnt.style.backgroundColor = color;
        seedsLeft.appendChild(semnt);
        seedsLeft.innerHTML += "";
      }
    }
}
