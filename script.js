const c1Top = document.getElementById("c1Top");
const c2Top = document.getElementById("c2Top");
const c3Top = document.getElementById("c3Top");
const c4Top = document.getElementById("c4Top");
const c5Top = document.getElementById("c5Top");
const c6Top = document.getElementById("c6Top");
const c1Bottom = document.getElementById("c1Bottom");
const c2Bottom = document.getElementById("c2Bottom");
const c3Bottom = document.getElementById("c3Bottom");
const c4Bottom = document.getElementById("c4Bottom");
const c5Bottom = document.getElementById("c5Bottom");
const c6Bottom = document.getElementById("c6Bottom");
let list;

let turno;

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
            list = ["c2Top", "c1Top", "containerLeft",
                    "c1Bottom", "c2Bottom", "containerRight"];
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
            list = ["c3Top", "c2Top", "c1Top", "containerLeft",
                    "c1Bottom", "c2Bottom", "c3Bottom", "containerRight"];
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
            list = ["c4Top", "c3Top", "c2Top", "c1Top", "containerLeft",
                    "c1Bottom", "c2Bottom", "c3Bottom", "c4Bottom", "containerRight"];
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
            list = ["c5Top", "c4Top", "c3Top", "c2Top", "c1Top", "containerLeft",
                    "c1Bottom", "c2Bottom", "c3Bottom", "c4Bottom", "c5Bottom", "containerRight"];
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
            list = ["c6Top", "c5Top", "c4Top", "c3Top", "c2Top", "c1Top", "containerLeft",
                    "c1Bottom", "c2Bottom", "c3Bottom", "c4Bottom", "c5Bottom", "c6Bottom", "containerRight"];
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
    //let pos = list.indexOf(id);
    //alert(pos);
    var semnt = document.createElement( "span" );
    semnt.className = "Semente";
    let enemieContainer = getEnemieContainer(id); // descobrir qual o player que esta a jogar
    //alert(enemieContainer);
    //alert(numOfSeeds);
    let parent = document.getElementsByClassName("Cavidade");  //array = [cLeft, c1Top, c2Top, c3Top, c4Top, c5Top, c6Top, c1Bottom, c2Bottom, c3Bottom, c4Bottom, c5Bottom, c6Bottom, cRight]
    /*for (var i = 0; i < parent.length; i++) {
      console.log("Antes = " + parent[i].id);
    }*/
    /*console.log("list = " + list[0]);
    console.log(list[0] === parent[2].id);*/
    //organizarLista(parent);

    /*alert(parent[0].id);
    alert(parent[1].id);
    alert(parent[2].id);
    alert(parent[3].id);
    alert(parent[4].id);
    alert(parent[5].id);
    alert(parent[6].id);
    alert(parent[7].id);
    alert(parent[8].id);
    alert(parent[9].id);
    alert(parent[10].id);
    alert(parent[11].id);
    alert(parent[12].id);
    alert(parent[13].id);*/
    //  alert(parent.length);
    /*  for(let i = 0; i<14; i++){
      alert("Name: " +parent[i].id)
      alert(" and " + isCavityShowing(parent[i]));
    }*/

    let pos = getIndexOf(id, parent) + 1;
    //console.log(parent);
    //console.log(pos);
    //alert(pos);
    for(let i=pos; numOfSeeds > 0; i++){
      if(i==14){
        i=-1; // tem que ser -1 pk se for 0 incrementa logo por causa do ciclo for e nunca conta o conteinerLeft
      }
      else if(isCavityShowing(parent[i])){
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
      }
      /*else if(parent[i].id == enemieContainer){
        break;
      }*/
    }
  }

function Reset() {
    document.forms["myForm"].submit();
}

function Newgame() {

  //numero de cavidades
  const cavidades = document.getElementById("cavities");
  switchCavities(cavidades.value);

  if(document.getElementById("sim").checked) {
    turno = 1;
  }else if(document.getElementById("nao").checked) {
    turno = 2;
  }

  const sementes = document.getElementById("sementes");
  const semnt = document.createElement( "span" );
  const parent = document.getElementsByClassName("Cavidade");

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
  //alert("Who won ="+ whoWon);
  //alert("didSomeoneFinish = " + didSomeoneFinish);
  if(didSomeoneFinish != 0){
    transferLastSeeds(didSomeoneFinish);
    getWinner();
    endGame();
  }
  nextTurn();
}

function nextTurn(){
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
}
/*
function organizarLista(parent){
  let i = 1;
  while (i<parent.length) {
    if(parent[i].id.charAt(0) == 'c'){
      //console.log(parent[i].id + " > " + parent[i-1].id);
      //console.log(parent[i].id > parent[i-1].id);
      if (parent[i].id.charAt(1) < parent[i-1].id.charAt(1)) {
        //console.log(true);
        //console.log("parent[i-1] = " + parent[i-1].id);
        //console.log("parent[i] = " + parent[i].id);
        const temp = parent[i];
        //console.log(temp.id);
        parent[i] = parent[i-1];
        //console.log(parent[i].id);
        parent[i-1] = temp;
        //console.log(parent[i-1].id);
      }
    }
    i++;
  }
  const temp = parent[6];
  parent[6].assign({}, parent[1]);
  parent[1] = temp;
  console.log(temp);
  console.log(parent[6]);
  /*for (let i = 0; i < parent.length; i++) {
    console.log("Depois = " + parent[i].id);
  }
}
*/

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
          alert("armazém direita, novo total = " + total)
        }
      }
      document.getElementById("containerRight").innerText = total + "\n";
    } else {
      let total = parseInt(document.getElementById("containerLeft").innerHTML);
      alert("armazém esquerda total = " + total)
      for(let j = 1; j<7; j++){
        if(parent[j].style.display=="block" && parent[j].innerText != "0"){
          total += parseInt(parent[j].innerHTML);
          parent[j].innerHTML = "0";
          alert("armazém esquerda, novo total = " + total)
        }
      }
      document.getElementById("containerLeft").innerText = total + "\n";
    }
  }

function getWinner(){
  const score1 = document.getElementById("p1Score").innerText;
  const score2 = document.getElementById("p2Score").innerText;
  //alert("score1 = " + score1);
  //alert("score2 = " + score2);
  if (score1 > score2) {
    alert("Player 1 Wins!");
  } else if (score1 < score2) {
    alert("Player 2 Wins!");
  } else {
    alert("It's a Draw!");
  }
}

function endGame(){
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

    for(let j = 0; j<parseInt(seedsRight.innerHTML); j++){
      let color = getRandomColor();
      semnt.style.backgroundColor = color;
      seedsRight.appendChild(semnt);
      seedsRight.innerHTML += "";
    }
    for(let i = 0; i<parseInt(seedsLeft.innerHTML); i++){
      let color = getRandomColor();
      semnt.style.backgroundColor = color;
      seedsLeft.appendChild(semnt);
      seedsLeft.innerHTML += "";
    }

}
