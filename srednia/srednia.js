/*
*
*       Łukasz Wielgus 15 yo 30.03.2019
*
*/
var n = 18;// ile przedmiotow
var j = 0; // ile wypelnionych
var z = 0; // zagrozony
var result = 0;

function submit() {
  result = 0;
  j = 0;
  z = 0;
  for (let i=1; i<=n; i++) {
    temp = Number(document.getElementById(i).value);
    //console.log(i + ' - ' + temp);
    if (temp >= 2 && temp <= 6) {
      result += temp;
      j++;
    } else if (temp == 1) {
        document.getElementById('error').innerHTML = `<hr class="line" style="width: 100%"><p>Jesteś zagrożony?</p>`;
        console.log('zagrozony');
        result += temp;
        j++;
        z++;
    } else if (temp != 0){
        document.getElementById('error').innerHTML = `<hr class="line" style="width: 100%"><p>Dziwne masz te oceny.</p>`;
        document.getElementById('result').innerHTML = 'XXX';
        return;
    }
  }
  if (z > 0) {
    document.getElementById('error').innerHTML = `<hr class="line" style="width: 100%"><p>Jesteś zagrożony?</p>`;
    console.log('zagrozony');
  } else {
    document.getElementById('error').innerHTML = '';
  }

  console.warn(`
**********************
 SREDNIA = ${result}
 PRZEDMIOTY = ${n}
 WYBRANE = ${j} ;
********************** `);

  if (j==0) {
    j = 1;
  }
  console.log('suma ' + result);
  result = Math.round(result/j*100)/100;
    document.getElementById('result').innerHTML = result;

  if (result >= 4.75) {
    console.log('PASEK');
  }

}

var element = `<div class="n"><label for="2">Matematyka</label><input type="number" id="2" name="2" list="oceny" min="2" max="6" placeholder="0"><br></div>`;

function add() {
  n++;
  document.getElementById('add').insertAdjacentHTML("beforeBegin", `<div class="n"><label for="${n}">${n} przedmiot</label><input type="number" id="${n}" name="${n}" list="oceny" min="2" max="6" placeholder="0"><br></div>`);
  if (n==20) {
      document.getElementById('error').insertAdjacentHTML("BeforeBegin", `<hr class="line" style="width: 100%"><p>Ale masz dużo przedmiotów!</p>`);
  }
  else if (n==22) {
      document.getElementById('error').insertAdjacentHTML("BeforeBegin", "<p>Współczuje!</p>");
  }
  else if (n==24) {
      document.getElementById('error').insertAdjacentHTML("BeforeBegin", "<p>Co to za szkoła?</p>");
  }
  document.getElementById('add').scrollIntoView();

  if (n==30) {
      document.getElementById('stop').innerHTML = `<div><h1>Przestaniesz?</h1><br><a style="width: 100%" id="xd" href="./index.html">Zabierz mnie stąd!</a></div>`;
  }
}

function autoFill(){

  document.getElementById('1').value = 5; // religia
  document.getElementById('2').value = 4; // polski
  document.getElementById('3').value = 6; // angielski
  document.getElementById('4').value = 4; // niemiecki
  document.getElementById('5').value = 6; // muzyka
  document.getElementById('6').value = 5; // plastyka
  document.getElementById('7').value = 4; // historia
  document.getElementById('8').value = 4; // wos
  document.getElementById('9').value = 4; // geografia
  document.getElementById('10').value = 4; // biologia
  document.getElementById('11').value = 4; // chemia
  document.getElementById('12').value = 4; // fizyka
  document.getElementById('13').value = 5; // matma
  document.getElementById('14').value = 6; // infa
  document.getElementById('15').value = 5; // w-f
  document.getElementById('16').value = 5; // edb
  document.getElementById('17').value = 5; // rysunek
  document.getElementById('18').value = 6; // technika

  result = 0;
  j = 0;
  submit();
}
