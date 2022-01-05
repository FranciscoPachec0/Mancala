function sendRequest(){

  nick = document.getElementById('nick').value;
  pass = document.getElementById('pass').value;


  let object = {
    nick : nick,
    pass : pass
  };


/*
  let jogo = {
    group: 25,
    nick: nick,
    pass: pass,
    size: 6,
    initial: 5,
  };
*/

  const type = "register";
  if(!XMLHttpRequest) { alert('XHR não é suportado'); return; }

  const xhr = new XMLHttpRequest();
  const link = "http://localhost:8025/" + type;

  xhr.open('POST',link,true);
    xhr.onreadystatechange = function() {
      if (xhr.responseText === '{"error":"User registered with a different password"}') {
        alert('Palavra-passe incorreta');
      }
      if(xhr.readyState == 4 && xhr.status == 200) {
            const data = xhr.responseText;
            console.log(JSON.parse(data));
    }
  }
  xhr.send(JSON.stringify(object));
}
