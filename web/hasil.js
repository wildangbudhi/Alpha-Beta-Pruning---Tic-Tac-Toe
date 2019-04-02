const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow
const ipc = electron.ipcRenderer

var player1Selections = new Array();
var player2Selections = new Array();
var currentPlayer = 0;
var size = 10;


// Menggambar Tabel

function drawBoard(x) {
    var Parent = document.getElementById("game");
    var counter = 1;
    
    while (Parent.hasChildNodes()) {
        Parent.removeChild(Parent.firstChild);
    }

    for (s = 1; s <= x; s++) {
        var row = document.createElement("tr");
        
        for (r = 1; r <= x; r++) {
            var col = document.createElement("td");
            col.id = counter;
            //Buat nampilin nomer tiap kolom
            //col.innerHTML = counter;

            var handler = function(e) {
                if (currentPlayer == 0) {
                    this.innerHTML = "X";
                    player1Selections.push(parseInt(this.id));
                    player1Selections.sort(function(a, b) { return a - b });
                    currentPlayer = 1;
                }

                else {
                    this.innerHTML = "O";
                    player2Selections.push(parseInt(this.id));
                    player2Selections.sort(function(a, b) { return a - b });
                    currentPlayer = 0;
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


window.addEventListener('load', drawBoard(size));

ipc.on('ukuran', function(e, item){
    size = Number(item);
    alert(size);
});
