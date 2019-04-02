const electron = require('electron');
const path = require('path');
const BrowserWindow = electron.remote.BrowserWindow;
const {ipcRenderer} = electron;

const resetBtn = document.getElementById('resetBtn');
const hasilBtn = document.getElementById('hasilBtn');


var size = 3;
var player1Selections = new Array(size*size);
var player2Selections = new Array();
var currentPlayer = 0;
var arrya = [];
var coba = [['O','O','X'], [' ','X','X'],['O','X','X']];

var tree=
[{
    'name': 24858, 
    'children': [
        {
            'name': 24922, 
            'children': [
                {
                    'name': 26970, 
                    'children': [
                        {
                            'name': 92506
                        }
                    ]
                }, 
                {
                    'name': 155994, 
                    'children': [
                        {
                            'name': 157018
                        }
                    ]
                }
            ]
        }, 
        {
            'name': 25882, 
            'children': [
                {
                    'name': 26010
                }, 
                {
                    'name': 156954
                }
            ]
        }, 
        {
            'name': 90394, 
            'children': [
                {
                    'name': 90522
                }, 
                {
                    'name': 92442
                }
            ]
        }
    ]
}];


// var tree = [{
//     name: 'Vegetables',
//     children: []
//     }, {
//     name: 'Fruits',
//     children: [{
//       name: 'Apple',
//       children: []
//     }, {
//       name: 'Orange',
//       children: []
//     }, {
//       name: 'Lemon',
//       children: []
//     }]
//     }, {
//     name: 'Candy',
//     children: [{
//       name: 'Gummies',
//       children: []
//     }, {
//       name: 'Chocolate',
//       children: [{
//       name: 'M & M\'s',
//       children: []
//       }, {
//       name: 'Hershey Bar',
//       children: []
//       }]
//     }, ]
//     }, {
//     name: 'Bread',
//     children: []
//   }];

// Memunculkan default tabel 3x3
window.addEventListener('load', drawBoard(size));
window.addEventListener('load', drawState(size));

hasilBtn.addEventListener('click', drawState(size));

function hasil(){
    var tabel = document.getElementById('game');
    
    for(s=0; s<size; s++){
        var col = tabel.rows.item(s).cells;
        arrya.push([])
        for(r=0; r<size; r++){
            var cel = col.item(r).innerHTML;
            arrya[s].push(cel);
        }
    }
    var cobs = coba[0][2];
    // console.log(cobs);
    drawState(size);
    var t = new TreeView(tree, 'tree');

    hasilBtn.disabled = true;
     console.log(arrya);
}

// Membuat tabel sesuai ukuran & Mengubah value n x n
function submit(){
    var i = document.getElementById("board").selectedIndex;
    var j = document.getElementById("board").options;
    document.getElementById("demo1").innerHTML = j[i].innerHTML;
    document.getElementById("demo2").innerHTML = j[i].innerHTML;
    drawBoard(j[i].index + 3);    
    //drawHasil(j[i].index + 3);    
    size = j[i].index + 3;
    arrya = [];
    hasilBtn.disabled = false;
    return size;
}

// Menghapus isi tabel
function restart()
{
    var i = document.getElementById("board").selectedIndex;
    var j = document.getElementById("board").options;
    drawBoard(j[i].index + 3);

    currentPlayer = 0;
    arrya = [];
    hasilBtn.disabled = false;
}

// Menggambar tabel
function drawBoard(n) {
    var Parent = document.getElementById("game");
    var counter = 1;
   
    while (Parent.hasChildNodes()) {
        Parent.removeChild(Parent.firstChild);
    }

    for (s = 0; s < n; s++) {
        var row = document.createElement("tr");
        
        for (r = 0; r < n; r++) {
            var col = document.createElement("td");
            col.id = counter;
            //Buat nampilin nomer tiap kolom
            //col.innerHTML = counter;

            var handler = function(e) {
                if (currentPlayer == 0) {
                    this.innerHTML = "X";
                    currentPlayer = 1;
                    player1Selections[counter] ='X';
                }

                else {
                    this.innerHTML = "O";
                    currentPlayer = 0;
                    player1Selections[counter] = 'O';
                }
                this.removeEventListener('click', arguments.callee);
            };

            col.addEventListener('click', handler);

            row.appendChild(col);
            counter++;
        }

        Parent.appendChild(row);
    }
}

// Menggambar state
function drawState(n) {
    var Parent = document.getElementById("game2");
    var counter = 1;

    while (Parent.hasChildNodes()) {
        Parent.removeChild(Parent.firstChild);
    }

    for (s = 0; s < n; s++) {
        var row = document.createElement("tr");
        
        for (r = 0; r < n; r++) {
            var col = document.createElement("td");

            col.innerHTML = arrya[s][r];
            //Buat nampilin nomer tiap kolom
            //col.innerHTML = counter;

            row.appendChild(col);
            counter++;
        }

        Parent.appendChild(row);
    }
}
   
// Hide Output
function toggle_visibility(id) {
    var e = document.getElementById(id);
    // if(e.style.display == 'block')
    //     e.style.display = 'none';
        e.style.display = 'block';
}