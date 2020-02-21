
/*
*
*       Łukasz Wielgus 15yo. 28.08.2019
*
*/

var url = window.location.origin + '/beta/backend.php';
if (window.location.hostname == 'localhost') url='http://localhost/Punktownica/backend.php';
var nick = document.getElementById('nick');
var nick1;
var first = true;
var nickType = 0;
var pol = document.getElementById('pol');
var mat = document.getElementById('mat');
var ang = document.getElementById('ang');
var fiz = document.getElementById('fiz');

var ehis = document.getElementById('ehis');
var epol = document.getElementById('epol');
var efiz = document.getElementById('efiz');
var eche = document.getElementById('eche');
var egeo = document.getElementById('egeo');
var ebio = document.getElementById('ebio');
var emat = document.getElementById('emat');
var eang = document.getElementById('eang');

var volo = document.getElementById('volo');
var togglePasek = document.getElementById('togglePasek');
var kon1 = document.getElementById('kon1');
var kon2 = document.getElementById('kon2');
var kon3 = document.getElementById('kon3');

document.getElementById('submit').addEventListener('click', query);
document.getElementById('retrieve').addEventListener('click', retrieve);

function query(e){
  e.preventDefault();
  document.getElementById('hello').innerHTML = ``;
  nick1 = nick.value;
  if (!nick1) {
    nick1 = randomString(6);
    nickType = 0;
  }
  setCookie(nick1);
  document.getElementById('info').innerHTML = '';

  if (!points) points = 0;
  try {
    var params = 'pol=' + pol.value +
    '&mat=' + mat.value +
    '&ang=' + ang.value +
    '&fiz=' + fiz.value +
    '&ehis=' + ehis.value +
    '&epol=' + epol.value +
    '&emat=' + emat.value +
    '&efiz=' + efiz.value +
    '&nick=' + nick1 +
    '&nickType=' + nickType +
    '&eang=' + eang.value +
    '&volo=' + volo.value +
    '&togglePasek=' + togglePasek.checked +
    '&kon1=' + kon1.value +
    '&kon2=' + kon2.value +
    '&kon3=' + kon3.value +
    '&points=' + points +
    '&submit';
  } catch(e){ console.warn(e) }

  var xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.onload = function(){
    if(this.status == 200) {
      //var response = JSON.parse(this.responseText);
      console.log(this.responseText);
      if (this.responseText == 'inserted'){
        document.getElementById('info').innerHTML = 'Zapamniętaliśmy cię.';
      } else if (this.responseText == 'updated') {
        document.getElementById('info').innerHTML = 'Zaktualizowaliśmy twoje dane.';
      } else {
        document.getElementById('info').innerHTML = 'Operacja nie powiodła się.';
        console.log('query-error');
      }

    }
  }

  xhr.send(params);
}

if (getCookie()) nick1 = getCookie();

function retrieve(e, username){
  if (e) e.preventDefault();

  document.getElementById('hello').innerHTML = ``;
  document.getElementById('nickDiv').removeAttribute("data-tooltip");
  if (nick.value != '') {
    nick1 = nick.value;
  } else {
    if (!first) document.getElementById('nickDiv').setAttribute("data-tooltip", `Żeby przywrócić dane wpisz nick, którego ostatnio tu używałeś.`);
  }

  console.log('retrieve ' + nick1);
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.onload = function(){
    if(this.status == 200 && this.responseText != 'null') {
      console.log(this.responseText);
      if (this.responseText == 'noExist') {
        if (!first) document.getElementById('info').innerHTML = 'Nie znamy takiego użytkownika.';
      } else {
        var response = JSON.parse(this.responseText);
        setCookie(response.nick)
        nickType = response.nick_type;
        if (nickType == 1) {
          document.getElementById('hello').innerHTML = `Cześć, ${response.nick}!`;
          nick.value = response.nick;
        }
        document.getElementById('info').innerHTML = 'Przywróciliśmy twoje dane.';

        pol.value = response.pol;
        mat.value = response.mat;
        ang.value = response.ang;
        fiz.value = response.fiz;
        ehis.value = response.ehis;
        epol.value = response.epol;
        efiz.value = response.efiz;
        emat.value = response.emat;
        eang.value = response.eang;
        volo.value = response.volo;
        togglePasek.checked = response.pasek;
        kon1.value = response.kon1;
        kon2.value = response.kon2;
        kon3.value = response.kon3;

        updateSliderValue();
        calc();
      }
    }
      if (first) first=false;
  }

  try {xhr.send('nick=' + nick1 + '&retrieve');}
  catch(e) {console.error(e);}
}

function randomString(length) {
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
}

function getCookie(){return(document.cookie.match('(^|; )'+'username'+'=([^;]*)')||0)[2]}
function setCookie(p) {
  document.cookie = 'username=' + p;
}
