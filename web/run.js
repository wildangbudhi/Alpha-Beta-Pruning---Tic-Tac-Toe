const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow

const resetBtn = document.getElementById('resetBtn')

var winners = new Array();
var player1Selections = new Array();
var player2Selections = new Array();
var timer;
var numberOfPlayers = 2;
var currentPlayer = 0;
var move = 0;
var points1 = 0;    // player 1 points
var points2 = 0;    // player 2 points

document.getElementById("demo1").innerHTML = 3;
document.getElementById("demo2").innerHTML = 3;

function submit(){
    var i = document.getElementById("board").selectedIndex;
    var j = document.getElementById("board").options;
    document.getElementById("demo1").innerHTML = j[i].innerHTML;
    document.getElementById("demo2").innerHTML = j[i].innerHTML;
    drawBoard(j[i].index + 3);
}

function restart()
{
    var i = document.getElementById("board").selectedIndex;
    var j = document.getElementById("board").options;
    drawBoard(j[i].index + 3);

    currentPlayer = 0;
    player1Selections = new Array();
    player2Selections = new Array();
    d('player1').classList.add('selected');
    d('player2').classList.remove('selected');
}

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

    loadAnswers();
}

window.addEventListener('load', drawBoard(3));

//resetBtn.addEventListener('click', drawBoard(size));
    