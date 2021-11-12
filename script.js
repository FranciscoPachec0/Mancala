 function openNav() {
   document.getElementById("mySidenav").style.width = "100%";
 }

 function closeNav() {
   document.getElementById("mySidenav").style.width = "0";
 }

 function myFunction() {
   alert(document.getElementById("containerRight").innerText);
  }

  function switchCavities(cavities){
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

function Reset() {
    document.forms["myForm"].submit();
}

function Newgame() {

  //numero de cavidades
  const cavidades = document.getElementById("cavities");
  switchCavities(cavidades.value);

  const sementes = document.getElementById("sementes");
  /* AQUI AINDA NAO FINCIONA, AINDA NAO MUDA OS SPANS COM OS SCORES
  document.getElementById("c1TopScore").innerHTML = sementes.value;
  document.getElementById("c2TopScore").innerHTML = sementes.value;
  document.getElementById("c3TopScore").innerHTML = sementes.value;
  document.getElementById("c4TopScore").innerHTML = sementes.value;
  document.getElementById("c5TopScore").innerHTML = sementes.value;
  document.getElementById("c6TopScore").innerHTML = sementes.value;
  document.getElementById("c1BottomScore").innerHTML = sementes.value;
  document.getElementById("c2BottomScore").innerHTML = sementes.value;
  document.getElementById("c3BottomScore").innerHTML = sementes.value;
  document.getElementById("c4BottomScore").innerHTML = sementes.value;
  document.getElementById("c5BottomScore").innerHTML = sementes.value;
  document.getElementById("c6BottomScore").innerHTML = sementes.value;
  */

  //posicionar as sementes em cada cavidade
  var semnt = document.createElement( "span" );
  semnt.className = "Semente";
  //document.c1TopScore.appendChild(semnt);

  var parent = document.getElementsByClassName("Cavidade");
  for (let j = 0; j < parent.length; j++) {
    if (parent[j].id == "containerLeft" || parent[j].id == "containerRight"){
      parent[j].innerHTML = "0";
      j++;
      if (parent[j].id == "containerLeft" || parent[j].id == "containerRight"){
        parent[j].innerHTML = "0";
        j++;
        if (j>= parent.length) break;
      }
    }

    for (let i = 0; i < sementes.value; i++) {
      if (i==0) {
        parent[j].innerText = sementes.value + "\n";
      }
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
  console.log(id + " = " + button.innerText);
  if (btvalue != 0) {
    document.getElementById([id]).innerText = 0;
  }
}
