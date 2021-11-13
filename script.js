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
    console.log(parent);
    console.log(pos);
    //alert(pos);
    for(let i=pos; numOfSeeds > 0; i++){
      if(i==14){
        i=-1; // tem que ser -1 pk se for 0 incrementa logo por causa do ciclo for e nunca conta o conteinerLeft
      }
      else if(isCavityShowing(parent[i])){
        console.log("entrou na cavidade = " + parent[i].id);
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
