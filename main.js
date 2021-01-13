/*
*
*
*       Łukasz Wielgus 15yo 30.03.2019
*
*
*/
var pol1, mat1, ang1, fiz1, volo, epol1, ehis1, emat1, efiz1, eche1, egeo1, ebio1, eang1, eprzyr, exam, main, points;
var more = false;
var oceny = [0, 0, 2, 8, 14, 17, 18];

if (!document.location.hash) {
  gim = false;
} else {
  gim = true;
}

function moreToggle() {
  more = !more;
  if (more && document.getElementById('mobile')) {
    document.getElementById('labelFiz').innerText = 'Fizyka ';
    document.getElementById('moreToggle').className = 'up sp';
    document.getElementById('przyr').className = 'show';
    document.getElementById('nonPrzyr').className = 'low';
        console.log('rozwinięte');
  } else if (!more && document.getElementById('mobile')) {
    document.getElementById('labelFiz').innerText = 'Przyroda';
    document.getElementById('moreToggle').className = 'down sp';
    document.getElementById('przyr').className = 'hide';
    document.getElementById('nonPrzyr').className = 'high';
      console.log('zwinięte');
  }
}

function toggleSp() {
  gim = !gim;
  var elements = document.getElementsByClassName('sp');
  if (!gim) {
    if (more) moreToggle();
    console.log('toggleSp');
    try {document.getElementById('mobile').href = './m/index.html#gim'}
    catch {document.getElementById('pc').href = '../index.html#gim?pc';}
    document.getElementById('spButton').innerText = 'Gimnazjum';
    for (let i of elements) {
      i.style.display = 'none';
    }
  } else if (gim) {
    console.log('toggleGim');
    try {document.getElementById('mobile').href = './m/index.html'}
    catch {document.getElementById('pc').href = '../index.html?pc';}
    document.getElementById('spButton').innerText = 'Szkoła podstawowa';
    for (let i of elements) {
      i.style.display = 'inline-block';
    }
  }
  calc();
}
function calc() {
  // przycisk oblicz
  document.getElementById('stringError').innerHTML = '';

  pol1 = pol.value;
  mat1 = mat.value;
  ang1 = ang.value;
  fiz1 = fiz.value;

  ehis1 = ehis.value;
  epol1 = epol.value;
  efiz1 = efiz.value;
  eche1 = eche.value;
  egeo1 = egeo.value;
  ebio1 = ebio.value;
  emat1 = emat.value;
  eang1 = eang.value;


  kon=Number(Number(kon1.value)+Number(kon2.value)+Number(kon3.value));


  function calculate(){
    console.log('calc!');

    pol1 = oceny[pol1];
    mat1 = oceny[mat1];
    ang1 = oceny[ang1];
    fiz1 = oceny[fiz1];

    if (gim) {
      epol1 = Math.round(epol1*0.2*100)/100;
      ehis1 = Math.round(ehis1*0.2*100)/100;
      emat1 = Math.round(emat1*0.2*100)/100;
      eang1 = Math.round(eang1*0.2*100)/100;

      if (!more) {
        eprzyr=Math.round(efiz1*0.2*100)/100;
      } else if (more) {
        eprzyr= Math.round((efiz1+eche1+egeo1+ebio1)/4*0.2*100)/100;
      }

      exam = Math.round((epol1+ehis1+emat1+eang1+eprzyr)*10) / 10;
    } else {
      epol1 = Math.round(epol1*0.35*100)/100;
      emat1 = Math.round(emat1*0.35*100)/100;
      eang1 = Math.round(eang1*0.3*100)/100;

      exam = Math.round((epol1+emat1+eang1)*10) / 10;
    }
   function checkPasek() {
     // sprawdzanie paska
      if(togglePasek.checked == true) {
          return 7;
      }
      else
          return 0;
   }

   pasek = Number(checkPasek());

  function validate() {

    if (pol1 == NaN || pol1 == undefined) pol1 = 0;
    if (mat1 == NaN || mat1 == undefined) mat1 = 0;
    if (ang1 == NaN || ang1 == undefined) ang1 = 0;
    if (fiz1 == NaN || fiz1 == undefined) fiz1 = 0;

    if (exam > 100) {
      exam=100;
      document.getElementById('stringError').innerHTML = 'Maksymalna liczba punktów za egzamin to 100!';
      console.log('Error: max 100 egzamin');
      ehis1 = '';
      epol1 = '';
      efiz1 = '';
      eche1 = '';
      egeo1 = '';
      ebio1 = '';
      emat1 = '';
      eang1 = '';



    }

    if (kon > 18) {
      kon=18;
      document.getElementById('stringError').innerHTML = '<hr class="line"><h5>Maksymalna liczba punktów za konkursy to 18!</h5>';
      console.log('Error: max 18 konkursy');
    }
  }

 validate();
 main = pol1 + mat1 + ang1 + fiz1;
 points = Math.round((main + exam + kon + Number(volo.value) + pasek) * 10) / 10;

}

  function print() {
      console.warn(`DEBUGGER :
  pol = ${pol1} ;  mat = ${mat1} ;  ang = ${ang1} ;  fiz = ${fiz1} ;
  epol = ${epol1} ;  ehis = ${ehis1} ;  emat = ${emat1} ;  eprzyr = ${eprzyr} ;  eang = ${eang1} ;
  volo = ${volo.value} ;  pasek = ${pasek} ;  kons = ${kon} ;
  main = ${main} ;
  egzamin = ${exam} ;
  **********************
     POINTS = ${points} ;
  ********************** `);
      document.getElementById('result').innerHTML = `<input style="display:none" id="phpPoints" name="phpPoints" data-tooltip="Swiadectwo: ${main+Number(volo.value)+pasek+kon} pkt. Egzaminy: ${exam} pkt." value="${points}">${points}`;
      document.getElementById('results').setAttribute("data-tooltip", `Swiadectwo: ${Math.round((main+Number(volo.value)+pasek+kon)*10)/10} pkt. Egzaminy: ${exam} pkt.`);

      //if (points > 165.6) {
      //  document.getElementById('stringError').innerHTML = '<br>Masz o ' + Math.round(points-164.4) + ' punktów więcej od twórcy tej strony!';
      //}
    }

  calculate();
  print();

}

function autoFill(){
//  moreToggle();
  ehis.value = 81;
  pol.value = 4;
  mat.value = 5;
  ang.value = 5;
  fiz.value = 6;
  epol.value = 84;
  efiz.value = 100;
  //eche.value = 60;
  //egeo.value = 70;
  //ebio.value = 70;
  emat.value = 97;
  eang.value = 100;




  volo.value = 3;
  updateSliderValue();
  togglePasek.checked = false;
  kon1.value = 3;
  kon3.value = 1;

  calc();
  console.log('autoFill');
}

// slider value
function updateSliderValue() {

      if (volo.value > 0) {
        document.getElementById('sliderValue').innerHTML = volo.value;
      } else {
        document.getElementById('sliderValue').innerHTML = ' ';
      }
}
        volo.addEventListener('input', updateSliderValue, false);


// background
let clicks = 1;
let image = "./bg.jpg";

function background() {
 clicks *= -1;
 if (clicks > 0) {
      console.log("image");
   document.body.style.backgroundImage = 'url("./bg.jpg")';
 } else {
   console.log("none");
   document.body.style.backgroundImage = "none";
 }

} // koniec background

// resetuj
function jsReset() {
  pol.value = '';
  mat.value = '';
  ang.value = '';
  fiz.value = '';

  ehis.value = '';
  epol.value = '';
  efiz.value = '';
  eche.value = '';
  egeo.value = '';
  ebio.value = '';
  emat.value = '';
  eang.value = '';

  volo.value = 0;
  updateSliderValue();
  togglePasek.checked = false;
  kon1.value = 0;
  kon2.value = 0;
  kon3.value = 0;

  document.getElementById('result').innerHTML = '0';
  document.getElementById('stringError').innerHTML = '';

  more = true
  moreToggle();
}


//popup punktacja CKE
function punktacja() {
  window.open('http://cc.edu.pl/files/6814/9726/6902/punkty.pdf','Punktacja', "toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=1000px, height=800px");
}
