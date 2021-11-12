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
            document.getElementById("gameBoard2C").style.display = "flex";
            document.getElementById("gameBoard3C").style.display = "none";
            document.getElementById("gameBoard4C").style.display = "none";
            document.getElementById("gameBoard5C").style.display = "none";
            document.getElementById("gameBoard6C").style.display = "none";
             break;
      case '3':
            document.getElementById("gameBoard3C").style.display = "flex";
            document.getElementById("gameBoard2C").style.display = "none";
            document.getElementById("gameBoard4C").style.display = "none";
            document.getElementById("gameBoard5C").style.display = "none";
            document.getElementById("gameBoard6C").style.display = "none";
             break;
      case '4':
            document.getElementById("gameBoard4C").style.display = "flex";
            document.getElementById("gameBoard2C").style.display = "none";
            document.getElementById("gameBoard3C").style.display = "none";
            document.getElementById("gameBoard5C").style.display = "none";
            document.getElementById("gameBoard6C").style.display = "none";
             break;
      case '5':
            document.getElementById("gameBoard5C").style.display = "flex";
            document.getElementById("gameBoard2C").style.display = "none";
            document.getElementById("gameBoard3C").style.display = "none";
            document.getElementById("gameBoard4C").style.display = "none";
            document.getElementById("gameBoard6C").style.display = "none";
             break;
      case '6':
            document.getElementById("gameBoard6C").style.display = "flex";
            document.getElementById("gameBoard2C").style.display = "none";
            document.getElementById("gameBoard3C").style.display = "none";
            document.getElementById("gameBoard4C").style.display = "none";
            document.getElementById("gameBoard5C").style.display = "none";
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
  /* AQUI AINDA NAO FINCIONA, AINDA NAO MUDA OS SPANS COM OS SCORES*/
  document.getElementById("c1TopScore").innerHTML = sementes.value;
  document.getElementById("c2TopScore").innerHTML = sementes.value;
  document.getElementById("c3TopScore").innerHTML = sementes.value;
  document.getElementById("c4TopScore").innerHTML = sementes.value;
  document.getElementById("c5TopScore").innerHTML = sementes.value;
  document.getElementById("c6TopScore").innerHTML = sementes.value;
  document.getElementById("c1Bottom").innerHTML = sementes.value;
  document.getElementById("c2Bottom").innerHTML = sementes.value;
  document.getElementById("c3Bottom").innerHTML = sementes.value;
  document.getElementById("c4Bottom").innerHTML = sementes.value;
  document.getElementById("c5Bottom").innerHTML = sementes.value;
  document.getElementById("c6Bottom").innerHTML = sementes.value;


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
