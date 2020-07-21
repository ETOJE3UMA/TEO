$( () => {
	
	//On Scroll Functionality
	$(window).scroll( () => {
		var windowTop = $(window).scrollTop();
		windowTop > 100 ? $('nav').addClass('navShadow') : $('nav').removeClass('navShadow');
		windowTop > 100 ? $('ul').css('top','100px') : $('ul').css('top','160px');
	});
	
	//Click Logo To Scroll To Top
	$('#logo').on('click', () => {
		$('html,body').animate({
			scrollTop: 0
		},500);
	});
	
	//Smooth Scrolling Using Navigation Menu
	$('a[href*="#"]').on('click', function(e){
		$('html,body').animate({
			scrollTop: $($(this).attr('href')).offset().top - 100
		},500);
		e.preventDefault();
	});
	
	//Toggle Menu
	$('#menu-toggle').on('click', () => {
		$('#menu-toggle').toggleClass('closeMenu');
		$('ul').toggleClass('showMenu');
		
		$('li').on('click', () => {
			$('ul').removeClass('showMenu');
			$('#menu-toggle').removeClass('closeMenu');
		});
	});
	
});

//GLOBAL vars
let gradeScale = 5; // система балльного оценивания
let normCoeffs = 0.33; // нормативный коэф. 
let editingTd;

function makeTdEditable(td) {
  editingTd = {
    elem: td,
    data: td.innerHTML
  };

  td.classList.add('edit-td'); // td в состоянии редактирования, CSS применятся к textarea внутри ячейки

  let textArea = document.createElement('input');
  textArea.setAttribute('type', 'number');
  textArea.style.width = td.clientWidth + 'px';
  textArea.style.height = td.clientHeight + 'px';
  textArea.className = 'edit-area';

  textArea.value = td.innerHTML;
  td.innerHTML = '';
  td.appendChild(textArea);
  textArea.focus();

  td.insertAdjacentHTML("beforeEnd",
    '<div class="edit-controls"><button class="edit-ok">OK</button><button class="edit-cancel">CANCEL</button></div>'
  );
}

function finishTdEdit(td, isOk) {
  if (isOk) {
    td.innerHTML = td.firstChild.value;
  } else {
    td.innerHTML = editingTd.data;
  }
  td.classList.remove('edit-td');
  editingTd = null;
}


function calcAll(fixBug) {
  if(fixBug == 1) {
    calcXY();
    calcNewValue();
  }
  calcSpendAnalog();
  calcSpendMain();
  sumSpendDevelop();
  calcInception();
  calcEnergy();
  calcMachineTime();
  fillArticleSpend();
  calcFundSalary(8);
  calcFundSalary(7);
  sumMaterials();
  articleSpendTable();
  calcBasicSalary();
  calcDateNew();
  getDataTable();
  calcDays();
}

   // Table1
    let table = document.getElementById('table1');
    table.onclick = function(event) {
    let target = event.target.closest('.disabled,.disabled.title,.edit-cancel,.edit-ok,td');
    if (target.className == 'disabled' || target.className == 'disabled title' ) {
        console.log('kek');
    } else {
        console.log('kek2');
        if (target.className == 'edit-cancel') {
      finishTdEdit(editingTd.elem, false);
    } else if (target.className == 'edit-ok') {
      finishTdEdit(editingTd.elem, true);
        Err();
    } else if (target.nodeName == 'TD') {
      if (editingTd) return; 
      makeTdEditable(target);
    }
        calcAll(1);
    }
};

function calcNewValue() {
    let tds = document.getElementById('table1').getElementsByTagName('td');
    
    let val1 = parseFloat(tds[11].textContent) + parseFloat(tds[17].textContent) + parseFloat(tds[23].textContent) + parseFloat(tds[29].textContent) +
                 parseFloat(tds[35].textContent) + parseFloat(tds[41].textContent) + parseFloat(tds[47].textContent) + parseFloat(tds[53].textContent) + 
                 parseFloat(tds[59].textContent);
    tds[63].innerHTML = `Jэту = ${val1.toFixed(2)}`;

    let val2 = parseFloat(tds[13].textContent) + parseFloat(tds[19].textContent) + parseFloat(tds[25].textContent) + parseFloat(tds[31].textContent) +
                 parseFloat(tds[37].textContent) + parseFloat(tds[43].textContent) + parseFloat(tds[49].textContent) + parseFloat(tds[55].textContent) + 
                 parseFloat(tds[61].textContent);
    tds[64].innerHTML = `Jэту = ${val2.toFixed(2)}`;

    if(val1 / val2 > 1) {
        tds[66].innerHTML = (val1 / val2).toFixed(2);
    } else {tds[66].innerHTML = (val1 / val2).toFixed(2);}
}

function calcXY() {
    let tds = document.getElementById('table1').getElementsByTagName('td');
    let val2;
    let val3;
    
    
    for(let i = 9; i < 59; i = i + 6) {
        val2 = parseFloat(tds[i].textContent) * parseFloat(tds[i+1].textContent);
        tds[i+2].innerHTML = `${val2.toFixed(2)}`;
        val3 = parseFloat(tds[i].textContent) * parseFloat(tds[i+3].textContent);
        
        tds[i+4].innerHTML = `${val3.toFixed(2)}`;
    }

    for(let i = 10; i <= 58; i = i + 6) { // проверка на допустимость значений системы оценивания
      if(parseInt(tds[i].textContent) > gradeScale || parseInt(tds[i].textContent) < 0) {alert(`Неверное значение, максимальная оценка: ${gradeScale}. Пожалуйста, поменяйте значение на корректное.`); tds[i].innerHTML = 'X';}
    }
}

function Err() {
    let tds = document.getElementById('table1').getElementsByTagName('td');
    let sum = 0;
    for(let i = 9; i <= 57; i = i + 6) {
      sum += parseFloat(tds[i].textContent);
    }
    alert(`Не забудьте, что сумма коэффициентов должна быть равна 1. Сейчас сумма равна: ${sum}`);
}

    //Table 2
    let table2 = document.getElementById('table2');
    table2.onclick = function(event) {
          let target = event.target.closest('.disabled,.edit-cancel,.edit-ok,td');
    if (target.className == 'disabled' || target.className == 'disabled title' ) {
        console.log('kek');
    } else {
        console.log('kek2');
        if (target.className == 'edit-cancel') {
      finishTdEdit(editingTd.elem, false);
    } else if (target.className == 'edit-ok') {
      finishTdEdit(editingTd.elem, true);
    } else if (target.nodeName == 'TD') {
      if (editingTd) return; 
      makeTdEditable(target);
    }
    //calcBasicSalary();
//    calcAll(0);
    calcDays();
    //getDataTable();
    calcDateNew();
    }
    }
    //Table 3
    let table3 = document.getElementById('table3');
    table3.onclick = function(event) {
      let target = event.target.closest('.disabled,.edit-cancel,.edit-ok,td');
    if (target.className == 'disabled' || target.className == 'disabled title' ) {
        console.log('kek');
    } else {
        console.log('kek2');
        if (target.className == 'edit-cancel') {
      finishTdEdit(editingTd.elem, false);
    } else if (target.className == 'edit-ok') {
      finishTdEdit(editingTd.elem, true);
    } else if (target.nodeName == 'TD') {
      if (editingTd) return; 
      makeTdEditable(target);
    }
      calcAll(0);
      calcDateNew();
    }
    }

    //Table 4
    let table4 = document.getElementById('table4');
    table4.onclick = function(event) {
      let target = event.target.closest('.disabled,.edit-cancel,.edit-ok,td');
    if (target.className == 'disabled' || target.className == 'disabled title' ) {
        console.log('kek');
    } else {
        console.log('kek2');
        if (target.className == 'edit-cancel') {
      finishTdEdit(editingTd.elem, false);
    } else if (target.className == 'edit-ok') {
      finishTdEdit(editingTd.elem, true);
    } else if (target.nodeName == 'TD') {
      if (editingTd) return; 
      makeTdEditable(target);
    }
      //calcBasicSalary();
      //articleSpendTable();
      calcAll(0);
    }
    };

    //Table 5
    let table5 = document.getElementById('table5');
    table5.onclick = function(event) {
        let target = event.target.closest('.disabled,.edit-cancel,.edit-ok,td');
      if (!table5.contains(target)) return;
    if (target.className == 'disabled' || target.className == 'disabled title' ) {
        console.log('kek');
    } else {
        console.log('kek2');
        if (target.className == 'edit-cancel') {
      finishTdEdit(editingTd.elem, false);
    } else if (target.className == 'edit-ok') {
      finishTdEdit(editingTd.elem, true);
    } else if (target.nodeName == 'TD') {
      if (editingTd) return; 
      makeTdEditable(target);
    }
      //sumMaterials();
      calcAll(0);
    };
    }
    //Table 7
    let table7 = document.getElementById('table7');
    table7.onclick = function(event) {
        let target = event.target.closest('.disabled,.edit-cancel,.edit-ok,td');
      if (!table7.contains(target)) return;
      
    if (target.className == 'disabled' || target.className == 'disabled title' ) {
        console.log('kek');
    } else {
        console.log('kek2');
        if (target.className == 'edit-cancel') {
      finishTdEdit(editingTd.elem, false);
    } else if (target.className == 'edit-ok') {
      finishTdEdit(editingTd.elem, true);
    } else if (target.nodeName == 'TD') {
      if (editingTd) return; 
      makeTdEditable(target);
    }
      //calcFundSalary(7);
      calcAll(0);
      calcEnergy();
    };
    }
    //Table 8
    let table8 = document.getElementById('table8');
    table8.onclick = function(event) {
        let target = event.target.closest('.disabled,.edit-cancel,.edit-ok,td');
      if (!table8.contains(target)) return;
      
    if (target.className == 'disabled' || target.className == 'disabled title' ) {
        console.log('kek');
    } else {
        console.log('kek2');
        if (target.className == 'edit-cancel') {
      finishTdEdit(editingTd.elem, false);
    } else if (target.className == 'edit-ok') {
      finishTdEdit(editingTd.elem, true);
    } else if (target.nodeName == 'TD') {
      if (editingTd) return; 
      makeTdEditable(target);
    }
      //calcFundSalary(8);
      calcAll(0);
      calcEnergy();
    };
    }
    //Table Amortization
    let tableAmortization = document.getElementById('tableAmortization');
    tableAmortization.onclick = function(event) {
      let target = event.target.closest('.disabled,.edit-cancel,.edit-ok,td');
    if (target.className == 'disabled' || target.className == 'disabled title' ) {
        console.log('kek');
    } else {
        console.log('kek2');
        if (target.className == 'edit-cancel') {
      finishTdEdit(editingTd.elem, false);
    } else if (target.className == 'edit-ok') {
      finishTdEdit(editingTd.elem, true);
    } else if (target.nodeName == 'TD') {
      if (editingTd) return; 
      makeTdEditable(target);
    }
      //fillArticleSpend();
      calcAll(0);
    };
    }
    //Table Energy
    let tableEnergy = document.getElementById('tableEnergy');
    tableEnergy.onclick = function(event) {
        let target = event.target.closest('.disabled,.edit-cancel,.edit-ok,td');
      if (!tableEnergy.contains(target)) return;
      
    if (target.className == 'disabled' || target.className == 'disabled title' ) {
        console.log('kek');
    } else {
        console.log('kek2');
        if (target.className == 'edit-cancel') {
      finishTdEdit(editingTd.elem, false);
    } else if (target.className == 'edit-ok') {
      finishTdEdit(editingTd.elem, true);
    } else if (target.nodeName == 'TD') {
      if (editingTd) return; 
      makeTdEditable(target);
    }
      calcAll(0);
    };
    }
    //Table Inception
    let tableInception = document.getElementById('tableInception');
    tableInception.onclick = function(event) {
        let target = event.target.closest('.disabled,.edit-cancel,.edit-ok,td');
      if (!tableInception.contains(target)) return;
      
    if (target.className == 'disabled' || target.className == 'disabled title' ) {
        console.log('kek');
    } else {
        console.log('kek2');
        if (target.className == 'edit-cancel') {
      finishTdEdit(editingTd.elem, false);
    } else if (target.className == 'edit-ok') {
      finishTdEdit(editingTd.elem, true);
    } else if (target.nodeName == 'TD') {
      if (editingTd) return; 
      makeTdEditable(target);
    }
      //calcInception();
      calcAll(0);
    };
    }
    //Table daysInMonth
    let tabledaysInMonth = document.getElementById('tabledaysInMonth');
    tabledaysInMonth.onclick = function(event) {
        let target = event.target.closest('.disabled,.edit-cancel,.edit-ok,td');
      if (!tabledaysInMonth.contains(target)) return;
      
    if (target.className == 'disabled' || target.className == 'disabled title' ) {
        console.log('kek');
    } else {
        console.log('kek2');
        if (target.className == 'edit-cancel') {
      finishTdEdit(editingTd.elem, false);
    } else if (target.className == 'edit-ok') {
      finishTdEdit(editingTd.elem, true);
    } else if (target.nodeName == 'TD') {
      if (editingTd) return; 
      makeTdEditable(target);
    }
      calcAll(0);
    };
    }
    //Table machineTime
    let tablemachineTime = document.getElementById('tablemachineTime');
    tablemachineTime.onclick = function(event) {
        let target = event.target.closest('.disabled,.edit-cancel,.edit-ok,td');
      if (!tablemachineTime.contains(target)) return;
      
    if (target.className == 'disabled' || target.className == 'disabled title' ) {
        console.log('kek');
    } else {
        console.log('kek2');
        if (target.className == 'edit-cancel') {
      finishTdEdit(editingTd.elem, false);
    } else if (target.className == 'edit-ok') {
      finishTdEdit(editingTd.elem, true);
    } else if (target.nodeName == 'TD') {
      if (editingTd) return; 
      makeTdEditable(target);
    }
      //calcMachineTime();
      calcAll(0);
    };
    }
    //Table sumSpendDevelopment
    let tablesumSpendDevelopment = document.getElementById('tablesumSpendDevelopment');
    tablesumSpendDevelopment.onclick = function(event) {
        let target = event.target.closest('.disabled,.edit-cancel,.edit-ok,td');
      if (!tablesumSpendDevelopment.contains(target)) return;
      
    if (target.className == 'disabled' || target.className == 'disabled title' ) {
        console.log('kek');
    } else {
        console.log('kek2');
        if (target.className == 'edit-cancel') {
      finishTdEdit(editingTd.elem, false);
    } else if (target.className == 'edit-ok') {
      finishTdEdit(editingTd.elem, true);
    } else if (target.nodeName == 'TD') {
      if (editingTd) return; 
      makeTdEditable(target);
    }
      //sumSpendDevelop();
      calcAll(0);
    };
    }
    //Table tablespendMain
    let tablespendMain = document.getElementById('tablespendMain');
    tablespendMain.onclick = function(event) {
        let target = event.target.closest('.disabled,.edit-cancel,.edit-ok,td');
      if (!tablespendMain.contains(target)) return;
      
    if (target.className == 'disabled' || target.className == 'disabled title' ) {
        console.log('kek');
    } else {
        console.log('kek2');
        if (target.className == 'edit-cancel') {
      finishTdEdit(editingTd.elem, false);
    } else if (target.className == 'edit-ok') {
      finishTdEdit(editingTd.elem, true);
    } else if (target.nodeName == 'TD') {
      if (editingTd) return; 
      makeTdEditable(target);
    }
      //calcSpendMain();
      calcAll(0);
    };
    }
    //Table tablespendMain
    let tablespendAnalog = document.getElementById('tablespendAnalog');
    tablespendAnalog.onclick = function(event) {
        let target = event.target.closest('.disabled,.edit-cancel,.edit-ok,td');
      if (!tablespendAnalog.contains(target)) return;
      
    if (target.className == 'disabled' || target.className == 'disabled title' ) {
        console.log('kek');
    } else {
        console.log('kek2');
        if (target.className == 'edit-cancel') {
      finishTdEdit(editingTd.elem, false);
    } else if (target.className == 'edit-ok') {
      finishTdEdit(editingTd.elem, true);
    } else if (target.nodeName == 'TD') {
      if (editingTd) return; 
      makeTdEditable(target);
    }
      //calcSpendAnalog();
      calcAll(0);
    };
    }
    //Table tableCoeffs
    let tableCoeffs = document.getElementById('tableCoeffs');
    tableCoeffs.onclick = function(event) {
        let target = event.target.closest('.disabled,.edit-cancel,.edit-ok,td');
      if (!tableCoeffs.contains(target)) return;
      
    if (target.className == 'disabled' || target.className == 'disabled title' ) {
        console.log('kek');
    } else {
        console.log('kek2');
        if (target.className == 'edit-cancel') {
      finishTdEdit(editingTd.elem, false);
    } else if (target.className == 'edit-ok') {
      finishTdEdit(editingTd.elem, true);
    } else if (target.nodeName == 'TD') {
      if (editingTd) return; 
      makeTdEditable(target);
    }
      calcAll(0);
    };
    }
    //Table tableCoeffsMT
    let tableCoeffsMT = document.getElementById('tableCoeffsMT');
    tableCoeffsMT.onclick = function(event) {
        let target = event.target.closest('.disabled,.edit-cancel,.edit-ok,td');
      if (!tableCoeffsMT.contains(target)) return;
      
    if (target.className == 'disabled' || target.className == 'disabled title' ) {
        console.log('kek');
    } else {
        console.log('kek2');
        if (target.className == 'edit-cancel') {
      finishTdEdit(editingTd.elem, false);
    } else if (target.className == 'edit-ok') {
      finishTdEdit(editingTd.elem, true);
    } else if (target.nodeName == 'TD') {
      if (editingTd) return; 
      makeTdEditable(target);
    }
      calcAll(0);
    };
    }
    //tableInception
    let tableInc = document.getElementById('tableInception');
    tableInc.onclick = function(event) {
      let target = event.target.closest('.disabled,.edit-cancel,.edit-ok,td');
    if (target.className == 'disabled' || target.className == 'disabled title' ) {
        console.log('kek');
    } else {
        console.log('kek2');
        if (target.className == 'edit-cancel') {
      finishTdEdit(editingTd.elem, false);
    } else if (target.className == 'edit-ok') {
      finishTdEdit(editingTd.elem, true);
    } else if (target.nodeName == 'TD') {
      if (editingTd) return; 
      makeTdEditable(target);
    }
      calcAll(0);
    };
    }
    function calcDays() {
      let tds = document.getElementById('table2').getElementsByTagName('td');
      let val2;
  
      sumCalcDays();
  
      //input start date
      for(let i = 12; i < 165; i = i + 7) {
          val2 = parseInt(100*(parseInt(tds[i-1].textContent) / parseInt(tds[i-2].textContent)));
          tds[i].innerHTML = val2;
  
          if(i == 19) i++;
          if(i == 34) i++;
          if(i == 70) i++;
          if(i == 92) i++;
          if(i == 128) i++;
      }
  
      for(let i = 14; i < 167; i = i + 7) {
          val2 = parseInt(100*(parseInt(tds[i-1].textContent) / parseInt(tds[i-4].textContent)));
          tds[i].innerHTML = val2;
  
          if(i == 21) i++;
          if(i == 36) i++;
          if(i == 72) i++;
          if(i == 94) i++;
          if(i == 130) i++;
      }
  }

    function sumCalcDays() {
      let tds = document.getElementById('table2').getElementsByTagName('td');
      
      let sumValue1 = 0; let sumValue2 = 0; let sumValue3 = 0; let sumValue4 = 0;
      let sumAllValue = 0;
      for(let i = 10; i < 162; i = i + 7) {
          if(i < 68)  {
            if (tds[i].textContent < 0) {
            tds[i].innerHTML = 'X';
            alert('Введно неверное количество дней. Пожалуйста, измените значение');
            }
            sumValue1 += parseInt(tds[i].textContent);
            tds[68].innerHTML = sumValue1;
          }
          if(i > 68 && i < 90) {
              if (tds[i].textContent < 0) {
            tds[i].innerHTML = 'X';
            alert('Введно неверное количество дней. Пожалуйста, измените значение');
            }
            sumValue2 += parseInt(tds[i].textContent);
            tds[90].innerHTML = sumValue2;
          }
          if(i > 90 && i < 126) {
              if (tds[i].textContent < 0) {
            tds[i].innerHTML = 'X';
            alert('Введно неверное количество дней. Пожалуйста, измените значение');
            }
            sumValue3 += parseInt(tds[i].textContent);
            tds[126].innerHTML = sumValue3;
          }
          if(i > 126 && i < 155) {
              if (tds[i].textContent < 0) {
            tds[i].innerHTML = 'X';
            alert('Введно неверное количество дней. Пожалуйста, измените значение');
            }
            sumValue4 += parseInt(tds[i].textContent);
            tds[155].innerHTML = sumValue4;
          }
  
          if(i == 17) i++;
          if(i == 32) i++;
          if(i == 68) i++; 
          if(i == 90) i++; 
          if(i == 126) i++; 
          
          sumAllValue = sumValue1 + sumValue2 + sumValue3 + sumValue4;
          tds[162].innerHTML = sumAllValue;
          tds[165].innerHTML = tds[162].textContent;
      }
  }

function calcSpendAnalog() {
  let tds = document.getElementById('tablespendAnalog').getElementsByTagName('td');

  tds[9].textContent = parseInt(tds[1].textContent) + parseInt(tds[3].textContent) + parseInt(tds[5].textContent) + parseInt(tds[7].textContent);
}

function calcSpendMain() {
  let tds = document.getElementById('tablespendMain').getElementsByTagName('td');
  let tdsA = document.getElementById('tableAmortization').getElementsByTagName('td');
  let tdsS = document.getElementById('tablesumSpendDevelopment').getElementsByTagName('td');
  let tds9 = document.getElementById('table9').getElementsByTagName('td');
  tds[5].innerHTML = (parseInt(tds[9].textContent) * parseInt(tds[11].textContent)) / parseInt(tds[7].textContent);
  tds[7].innerHTML = parseInt(tds[11].textContent) * parseInt(tdsA[13].textContent);
  tds[13].textContent = parseInt(tds[1].textContent) * parseInt(tds[3].textContent) * parseInt(tds[9].textContent) * (parseInt(tds[11].textContent) / (parseInt(tds[11].textContent) * parseInt(tdsA[13].textContent)));
  tds[15].innerHTML = parseFloat(tdsS[20].textContent) + parseFloat(tds[13].textContent);
}

function Amortization() {
    let tds8 = document.getElementById('table8').getElementsByTagName('td');
    let tds9 = document.getElementById('table9').getElementsByTagName('td');
    let tdsA = document.getElementById('tableAmortization').getElementsByTagName('td');
    
    tdsA[8].innerHTML = (parseInt(tds7[8].textContent) + parseInt(tds7[13].textContent)) * parseInt(tdsA[13].textContent);
    tdsA[10].innerHTML = parseInt(tdsA[13].textContent) * parseInt(tdsA[12].textContent); //time for 1
    tdsA[15].innerHTML = (parseInt(tds8[8].textContent) + parseInt(tds8[13].textContent)) * parseInt(tdsA[20].textContent);
    tdsA[17].innerHTML = parseInt(tdsA[19].textContent) * parseInt(tdsA[20].textContent); //time for 2

    tdsA[22].innerHTML = (parseInt(tdsA[7].textContent) * parseFloat(tdsA[9].textContent) * parseInt(tdsA[11].textContent) * parseInt(tdsA[8].textContent)) / parseInt(tdsA[10].textContent);
    tdsA[24].innerHTML = (parseInt(tdsA[14].textContent) * parseFloat(tdsA[16].textContent) * parseInt(tdsA[18].textContent) * parseInt(tdsA[15].textContent)) / parseInt(tdsA[17].textContent);
}

function sumSpendDevelop() {
  let tds = document.getElementById('tablesumSpendDevelopment').getElementsByTagName('td');
  let tds6 = document.getElementById('table6').getElementsByTagName('td');
  let tds5 = document.getElementById('table5').getElementsByTagName('td');
  let tds4 = document.getElementById('table4').getElementsByTagName('td');
  let tdsmT = document.getElementById('tablemachineTime').getElementsByTagName('td');
  let tdsS = document.getElementById('tableCoeffs').getElementsByTagName('td');
  tds[14].innerHTML = parseFloat(tds[12].textContent) + parseFloat(tds[13].textContent);
  tds[11].innerHTML = parseFloat(tds4[16].textContent);
  tds[17].innerHTML = tds5[26].textContent;
  tds[18].innerHTML = tdsmT[7].textContent;
  tds[20].textContent = (parseFloat(((1 + parseFloat(tds[14].textContent)) * (1 + parseFloat(tds[15].textContent)) + parseFloat(tds[16].textContent)) * (parseFloat(tds4[9].textContent) + parseFloat(tds4[14].textContent)) + parseFloat(tds[17].textContent) + parseFloat(tds[18].textContent))).toFixed(2);

  tds6[3].innerHTML = parseFloat(tds4[9].textContent) + parseFloat(tds4[14].textContent);
  
  tds6[7].innerHTML = (((parseFloat(tds4[9].textContent) + parseFloat(tds4[14].textContent)) * (1 + parseFloat(tds[14].textContent))) * parseFloat(tds[15].textContent)).toFixed(2);
  tds6[9].innerHTML = parseFloat(tds5[26].textContent);
  tds6[11].innerHTML = parseFloat(tdsmT[7].textContent);
  tds6[15].innerHTML = parseFloat(tds[20].textContent);
    tdsS[3].textContent = tds[12].textContent;
}

function calcMachineTime() {
  let tds = document.getElementById('tablemachineTime').getElementsByTagName('td');
  let tdsC = document.getElementById('tableCoeffsMT').getElementsByTagName('td');
  let tds2 = document.getElementById('table2').getElementsByTagName('td');

  tds[1].innerHTML = parseInt(tdsC[1].textContent) * parseFloat(tds2[165].textContent) //table2 find
  tds[7].innerHTML = tds[1].textContent * tds[3].textContent * tds[5].textContent;
}

function calcInception() {
  let tdsI = document.getElementById('tableInception').getElementsByTagName('td');

  tdsI[9].innerHTML = parseFloat(tdsI[1].textContent) + parseFloat(tdsI[3].textContent) + parseFloat(tdsI[5].textContent) + parseFloat(tdsI[7].textContent);
}

function calcEnergy() {
  let tds = document.getElementById('tableEnergy').getElementsByTagName('td');
  let tdsA = document.getElementById('tableAmortization').getElementsByTagName('td');
  let tdsSA = document.getElementById('tablespendAnalog').getElementsByTagName('td');
  let tdsSM = document.getElementById('tablespendMain').getElementsByTagName('td');
  let tds1 = document.getElementById('table1').getElementsByTagName('td');
  let tds9 = document.getElementById('table9').getElementsByTagName('td');
  let tds10 = document.getElementById('table10').getElementsByTagName('td');
  let tds11 = document.getElementById('table11').getElementsByTagName('td');

  tds[13].innerHTML = (parseFloat(tds[4].textContent) * parseFloat(tds[5].textContent) * parseFloat(tds[6].textContent) * parseFloat(tds[7].textContent)).toFixed(4);
  tds[15].innerHTML = (parseFloat(tds[8].textContent) * parseFloat(tds[9].textContent) * parseFloat(tds[10].textContent) * parseFloat(tds[11].textContent)).toFixed(4);

  tds9[10].innerHTML = parseFloat(tds[13].textContent); //Energy
  tds9[11].innerHTML = parseFloat(tds[15].textContent);

  tds9[13].innerHTML = ((0.05 * parseFloat(tdsA[7].textContent) * parseFloat(tds[4].textContent)) / parseFloat(tdsA[10].textContent)).toFixed(4);
  tds9[14].innerHTML = ((0.05 * parseFloat(tdsA[14].textContent) * parseFloat(tds[8].textContent)) / parseFloat(tdsA[17].textContent)).toFixed(4);

  tds9[16].innerHTML = (parseFloat(tdsA[7].textContent)) / 100;
  tds9[17].innerHTML = (parseFloat(tdsA[14].textContent)) / 100;

  tds9[19].innerHTML = ((parseFloat(tds9[4].textContent) + parseFloat(tds9[7].textContent) + parseFloat(tds9[10].textContent) + parseFloat(tds9[13].textContent) + parseFloat(tds9[16].textContent)) * 0.2).toFixed(4);
  tds9[20].innerHTML = ((parseFloat(tds9[5].textContent) + parseFloat(tds9[8].textContent) + parseFloat(tds9[11].textContent) + parseFloat(tds9[14].textContent) + parseFloat(tds9[17].textContent)) * 0.2).toFixed(4);

  tds9[22].innerHTML = (parseFloat(tds9[4].textContent) + parseFloat(tds9[7].textContent) + parseFloat(tds9[10].textContent) + parseFloat(tds9[13].textContent) + parseFloat(tds9[16].textContent) + parseFloat(tds9[19].textContent)).toFixed(4);
  tds9[23].innerHTML = (parseFloat(tds9[5].textContent) + parseFloat(tds9[8].textContent) + parseFloat(tds9[11].textContent) + parseFloat(tds9[14].textContent) + parseFloat(tds9[17].textContent) + parseFloat(tds9[20].textContent)).toFixed(4);

  tds10[5].innerHTML = (parseFloat(tds9[23].textContent)).toFixed(2);
  tds10[6].innerHTML = (parseFloat(tds9[22].textContent)).toFixed(2);

  tds10[8].innerHTML = (parseFloat(tdsSA[9].textContent)).toFixed(2);
  tds10[9].innerHTML = (parseFloat(tdsSM[15].textContent)).toFixed(2);

  tds10[11].innerHTML = (parseFloat(tds9[23].textContent) + (normCoeffs * parseFloat(tds10[8].textContent))).toFixed(2);
  tds10[12].innerHTML = (parseFloat(tds9[22].textContent) + (normCoeffs * parseFloat(tds10[9].textContent))).toFixed(2);

  tds10[14].innerHTML = ((parseFloat(tds10[11].textContent) * parseFloat(tds1[66].textContent)) - parseFloat(tds10[12].textContent)).toFixed(2);

  tds11[11].innerHTML = (parseFloat(tds10[9].textContent) / parseFloat(tds10[14].textContent)).toFixed(2);  
  tds11[9].innerHTML = (1 / parseFloat(tds11[11].textContent)).toFixed(2);
  tds11[7].innerHTML = (parseFloat(tds10[14].textContent)).toFixed(2);
  tds11[5].innerHTML = (parseFloat(tds10[6].textContent)).toFixed(2);
  tds11[3].innerHTML = (parseFloat(tds10[9].textContent)).toFixed(2);

  if(parseFloat(tds11[9].textContent) > normCoeffs) {
    let great = document.getElementsByClassName('great')[0]; 
    great.style.display = 'flex';

    let error = document.getElementsByClassName('error')[0]; 
    error.style.display = 'none';
  }
  if(parseFloat(tds11[9].textContent) < normCoeffs) {
    let error = document.getElementsByClassName('error')[0]; 
    error.style.display = 'flex';

    let great = document.getElementsByClassName('great')[0]; 
    great.style.display = 'none';
  }
}

function calcFundSalary(num) {
    let tdsD = document.getElementById('tableCoeffs').getElementsByTagName('td');
    let tdsS = document.getElementById('tablesumSpendDevelopment').getElementsByTagName('td');
    let coeffs = (parseFloat(tdsS[14].textContent) - 0.3 + parseFloat(tdsD[3].textContent));
    
    if(num == 7) { 
        
      let tds7 = document.getElementById(`table${num}`).getElementsByTagName('td'); 
      tds7[7].innerHTML = (parseFloat(tds7[6].textContent) / parseFloat(tdsD[1].textContent)).toFixed(2);
      tds7[12].innerHTML = (parseFloat(tds7[11].textContent) / parseFloat(tdsD[1].textContent)).toFixed(2);
      tds7[16].innerHTML = ((parseFloat(tds7[8].textContent) * parseFloat(tds7[7].textContent) + parseFloat(tds7[13].textContent) * parseFloat(tds7[12].textContent)) * (1 + coeffs) * (1 + parseFloat(tdsS[15].textContent))).toFixed(2);
    }
    if(num == 8) {
      let tds8 = document.getElementById(`table${num}`).getElementsByTagName('td');
      tds8[7].innerHTML = (parseFloat(tds8[6].textContent) / parseFloat(tdsD[1].textContent)).toFixed(2);
      tds8[12].innerHTML = (parseFloat(tds8[11].textContent) / parseFloat(tdsD[1].textContent)).toFixed(2);
      tds8[16].innerHTML = ((parseFloat(tds8[8].textContent) * parseFloat(tds8[7].textContent) + parseFloat(tds8[13].textContent) * parseFloat(tds8[12].textContent)) * (1 + coeffs) * (1 + parseFloat(tdsS[15].textContent))).toFixed(2);
    }
}

function fillArticleSpend() {
    let tds7 = document.getElementById('table7').getElementsByTagName('td');
    let tds8 = document.getElementById('table8').getElementsByTagName('td');
    let tds9 = document.getElementById('table9').getElementsByTagName('td');
    let tdsA = document.getElementById('tableAmortization').getElementsByTagName('td');
    tdsA[8].innerHTML = (parseInt(tds7[8].textContent) + parseInt(tds7[13].textContent)) * parseInt(tdsA[13].textContent);
    tdsA[10].innerHTML = parseInt(tdsA[13].textContent) * parseInt(tdsA[12].textContent); //time for 1

    tdsA[15].innerHTML = (parseInt(tds8[8].textContent) + parseInt(tds8[13].textContent)) * parseInt(tdsA[20].textContent);
    tdsA[17].innerHTML = parseInt(tdsA[19].textContent) * parseInt(tdsA[20].textContent); //time for 2

    tdsA[22].innerHTML = ((parseInt(tdsA[7].textContent) * parseFloat(tdsA[9].textContent) * parseInt(tdsA[11].textContent) * parseInt(tdsA[8].textContent)) / parseInt(tdsA[10].textContent)).toFixed(2);
    tdsA[24].innerHTML = ((parseInt(tdsA[14].textContent) * parseFloat(tdsA[16].textContent) * parseInt(tdsA[18].textContent) * parseInt(tdsA[15].textContent)) / parseInt(tdsA[17].textContent)).toFixed(2);

    tds9[4].innerHTML = parseFloat(tds7[16].textContent);
    tds9[5].innerHTML = parseFloat(tds8[16].textContent);

    tds9[7].innerHTML = parseFloat(tdsA[22].textContent);
    tds9[8].innerHTML = parseFloat(tdsA[24].textContent);
}

function getIndexTd(num) {
  let tdIndex = document.getElementById(`table${num}`).getElementsByTagName('td');
  
  for(let i = 0; i < tdIndex.length; i++) {
      (function(i) {
        tdIndex[i].onclick = function() {
          if(num == 1) {console.log(`Table1: ${i}`)};
          if(num == 2) {console.log(`Table2: ${i}`)};
          if(num == 3) {console.log(`Table3: ${i}`)};
        }
      })(i);
  }
}

function getDataTable() {
    let tds2 = document.getElementById('table2').getElementsByTagName('td');
    let tds3 = document.getElementById('table3').getElementsByTagName('td');

    tds3[8].innerHTML = parseInt(tds2[11].textContent);
    tds3[12].innerHTML = parseInt(tds2[13].textContent); //1
    tds3[17].innerHTML = parseInt(tds2[18].textContent);
    tds3[21].innerHTML = parseInt(tds2[20].textContent); //2
    tds3[26].innerHTML = parseInt(tds2[26].textContent);
    tds3[30].innerHTML = parseInt(tds2[28].textContent); //3
    tds3[35].innerHTML = parseInt(tds2[33].textContent);
    tds3[39].innerHTML = parseInt(tds2[35].textContent); //4
    tds3[44].innerHTML = parseInt(tds2[41].textContent);
    tds3[48].innerHTML = parseInt(tds2[43].textContent); //5
    tds3[53].innerHTML = parseInt(tds2[48].textContent);
    tds3[57].innerHTML = parseInt(tds2[50].textContent); //6
    tds3[62].innerHTML = parseInt(tds2[55].textContent);
    tds3[66].innerHTML = parseInt(tds2[57].textContent); //7
    tds3[71].innerHTML = parseInt(tds2[62].textContent);
    tds3[75].innerHTML = parseInt(tds2[64].textContent); //8
    tds3[80].innerHTML = parseInt(tds2[77].textContent);
    tds3[84].innerHTML = parseInt(tds2[79].textContent); //9
    tds3[89].innerHTML = parseInt(tds2[84].textContent);
    tds3[93].innerHTML = parseInt(tds2[86].textContent); //10
    tds3[98].innerHTML = parseInt(tds2[99].textContent);
    tds3[102].innerHTML = parseInt(tds2[101].textContent); //11
    tds3[107].innerHTML = parseInt(tds2[106].textContent);
    tds3[111].innerHTML = parseInt(tds2[108].textContent); //12
    tds3[116].innerHTML = parseInt(tds2[113].textContent);
    tds3[120].innerHTML = parseInt(tds2[115].textContent); //13
    tds3[125].innerHTML = parseInt(tds2[120].textContent);
    tds3[129].innerHTML = parseInt(tds2[122].textContent); //14
    tds3[134].innerHTML = parseInt(tds2[135].textContent);
    tds3[138].innerHTML = parseInt(tds2[137].textContent); //15
    tds3[143].innerHTML = parseInt(tds2[142].textContent);
    tds3[147].innerHTML = parseInt(tds2[144].textContent); //16
    tds3[152].innerHTML = parseInt(tds2[149].textContent);
    tds3[156].innerHTML = parseInt(tds2[151].textContent); //17
}
 
function calcDateNew() {
  let tds = document.getElementById('table3').getElementsByTagName('td');
  let date = new Date(tds[162].textContent, tds[161].textContent - 1, tds[160].textContent);
  let dDate = date.getDate();
  let mDate = date.getMonth();
  let yDate = date.getFullYear();

  for(let i = 9; i < 157; i += 9) {
    if(i == 9) {
    tds[i].innerHTML = `${dDate}.${mDate+1}.${yDate}`;
    date.setDate(date.getDate() + parseInt(tds[i-1].textContent) - 1); dDate = date.getDate(); mDate = date.getMonth(); yDate = date.getFullYear(); //date for manager
    tds[i+1].innerHTML = `${dDate}.${mDate+1}.${yDate}`;

    date.setDate(date.getDate() - parseInt(tds[i-1].textContent) + 1); dDate = date.getDate(); mDate = date.getMonth(); yDate = date.getFullYear(); //start value
    tds[i+4].innerHTML = `${dDate}.${mDate+1}.${yDate}`;
    date.setDate(date.getDate() + parseInt(tds[i+3].textContent) - 1); dDate = date.getDate(); mDate = date.getMonth(); yDate = date.getFullYear(); //date for programmer
    tds[i+5].innerHTML = `${dDate}.${mDate+1}.${yDate}`;
    }
    if(i != 9) {
    date.setDate(date.getDate() + 1); dDate = date.getDate(); mDate = date.getMonth(); yDate = date.getFullYear();

    tds[i].innerHTML = `${dDate}.${mDate+1}.${yDate}`;
    date.setDate(date.getDate() + parseInt(tds[i-1].textContent) - 1); dDate = date.getDate(); mDate = date.getMonth(); yDate = date.getFullYear(); //date for manager
    tds[i+1].innerHTML = `${dDate}.${mDate+1}.${yDate}`;

    date.setDate(date.getDate() - parseInt(tds[i-1].textContent) + 1); dDate = date.getDate(); mDate = date.getMonth(); yDate = date.getFullYear(); //start value
    tds[i+4].innerHTML = `${dDate}.${mDate+1}.${yDate}`;
    date.setDate(date.getDate() + parseInt(tds[i+3].textContent) - 1); dDate = date.getDate(); mDate = date.getMonth(); yDate = date.getFullYear(); //date for programmer
    tds[i+5].innerHTML = `${dDate}.${mDate+1}.${yDate}`;
    }
    if(tds[i-1].textContent == 0) tds[i+1].textContent = '--------';
  }
}

 function summaryCost(m, Wd, Wc, Wn, Cn, Tmv, Smc, Km, Mv, avgDaySalaryManager, avgDaySalaryProgrammer, timeManager, timeProgrammer, salaryManager, salaryProgrammer, salaryAll) {
    let tds = document.getElementById('table2').getElementsByTagName('td');
    let Kp = ((1 + Wd) * (1 + Wc) + Wn) * salaryAll + Cn + Mv;
}

function calcBasicSalary() {
  let tds2 = document.getElementById('table2').getElementsByTagName('td');
  let tds4 = document.getElementById('table4').getElementsByTagName('td');
  let tdsD = document.getElementById('tabledaysInMonth').getElementsByTagName('td');
  let tdsD2 = document.getElementById('tableCoeffs').getElementsByTagName('td');
    if (tdsD[1].textContent < 0) {
        tdsD[1].textContent = 'X';
        alert('Введено неверное количество рабочих дней. Пожалуйста, измените значение');
    }
    tdsD2[1].textContent = tdsD[1].textContent;
  let m = 2; //кол-во работников, работающих над проектом
  let Z = 10000; //основная зп
  let Wd = 0.4; //коэф надбавок
  let Wc = 0.302; //коэф налогов
  let Wn = 0.6; //коэф накладных расходов
  let Cn = 1200; //расходы на материалы
  let Tmv = 460; let Smc = 20; let Km = 1;
  let Mv = Tmv * Smc * Km; //расходы на машинное время

  tds4[7].innerHTML = (parseFloat(tds4[6].textContent) / parseInt(tdsD[1].textContent)).toFixed(2);
  tds4[12].innerHTML = (parseFloat(tds4[11].textContent) / parseInt(tdsD[1].textContent)).toFixed(2);

  let avgDaySalaryManager = +tds4[7].textContent;
  let avgDaySalaryProgrammer = +tds4[12].textContent;
  let timeManager = +tds2[163].textContent;
  let timeProgrammer = +tds2[165].textContent;
  let salaryManager = avgDaySalaryManager * timeManager;
  let salaryProgrammer = avgDaySalaryProgrammer * timeProgrammer;
  let salaryAll = salaryProgrammer + salaryManager;
  
  tds4[8].innerHTML = timeManager;
  tds4[13].innerHTML = timeProgrammer;
  tds4[9].innerHTML = (salaryManager).toFixed(2);
  tds4[14].innerHTML = (salaryProgrammer).toFixed(2);
  tds4[16].innerHTML = (salaryAll).toFixed(2);

  summaryCost(m, Wd, Wc, Wn, Cn, Tmv, Smc, Km, Mv, avgDaySalaryManager, avgDaySalaryProgrammer, timeManager, timeProgrammer, salaryManager, salaryProgrammer, salaryAll);
}

function sumMaterials() {
    let tds5 = document.getElementById('table5').getElementsByTagName('td');
    let sum = 0;

    for(let i = 9; i < 26; i += 5) {
        tds5[i].innerHTML = +tds5[i-2].textContent * +tds5[i-1].textContent;
        sum += +tds5[i].textContent;
    }

    tds5[26].innerHTML = sum;
}

function articleSpendTable() {
    let tds4 = document.getElementById('table4').getElementsByTagName('td');
    let tds5 = document.getElementById('table5').getElementsByTagName('td');
    let tds6 = document.getElementById('table6').getElementsByTagName('td');
    let sum = 0;

    tds6[3].innerHTML = +tds4[16].textContent;

    for(let i = 3; i < 13; i += 2) {
      sum += parseFloat(tds6[i].textContent);
    }
    
    tds6[15].innerHTML = sum;
}