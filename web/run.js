const electron = require('electron');
const path = require('path');
const BrowserWindow = electron.remote.BrowserWindow;
const {ipcRenderer} = electron;

const resetBtn = document.getElementById('resetBtn')
const hasilBtn = document.getElementById('hasilBtn')

var size = 3;
var player1Selections = new Array(size*size);
var player2Selections = new Array();
var currentPlayer = 0;
var arrya = [];

/*
function hasil(){
    hasilWindow = new BrowserWindow({ width:1600 , height:800 });
    hasilWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'hasil.html'),
        protocol: 'file',
        slashes: true
    }));
}
*/

// Memunculkan window output
/*
function hasil(){
    const modalPath = path.join('file://', __dirname, 'hasil.html')
    let win = new BrowserWindow({ width:800, height:550 })
    win.on('close', function(){ win = null })
    win.loadURL(modalPath)
    win.show()

    win.on('close', function(){
        win = null;
    })
    
    const item = size;
    ipcRenderer.send('ukuran', item);
}
*/

function hasil(){
    //console.log(player1Selections);
    var tabel = document.getElementById('game');
    
    for(s=0; s<size; s++){
        var col = tabel.rows.item(s).cells;
        arrya.push([])
        for(r=0; r<size; r++){
            var cel = col.item(r).innerHTML;
            arrya[s].push(cel);
            
        }
    }
    console.log(arrya);
}

// Membuat tabel sesuai ukuran & Mengubah value n x n
function submit(){
    var i = document.getElementById("board").selectedIndex;
    var j = document.getElementById("board").options;
    document.getElementById("demo1").innerHTML = j[i].innerHTML;
    document.getElementById("demo2").innerHTML = j[i].innerHTML;
    drawBoard(j[i].index + 3);    
    drawHasil(j[i].index + 3);    
    size = j[i].index + 3;
    return size;
}

// Menghapus isi tabel
function restart()
{
    var i = document.getElementById("board").selectedIndex;
    var j = document.getElementById("board").options;
    drawBoard(j[i].index + 3);

    currentPlayer = 0;
    player1Selections = new Array();
    player2Selections = new Array();
    /*
    d('player1').classList.add('selected');
    d('player2').classList.remove('selected');
    */
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
                    //player1Selections.push(parseInt(this.id));
                    //player1Selections.sort(function(a, b) { return a - b });
                    currentPlayer = 1;
                    player1Selections[counter] ='X';
                }

                else {
                    this.innerHTML = "O";
                    //player2Selections.push(parseInt(this.id));
                    //player2Selections.sort(function(a, b) { return a - b });
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

// Menggambar board hasil
function drawHasil(n) {
    var Parent = document.getElementById("game2");
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
                this.removeEventListener('click', arguments.callee);
            };

            col.addEventListener('click', handler);

            row.appendChild(col);
            counter++;
        }

        Parent.appendChild(row);
    }
}

//Membuat Tree bisa di expand
var tree = document.querySelectorAll('ul.tree a:not(:last-child)');
for(var i = 0; i < tree.length; i++){
    tree[i].addEventListener('click', function(e) {
        var parent = e.target.parentElement;
        var classList = parent.classList;
        if(classList.contains("open")) {
            classList.remove('open');
            var opensubs = parent.querySelectorAll(':scope .open');
            for(var i = 0; i < opensubs.length; i++){
                opensubs[i].classList.remove('open');
            }
        } else {
            classList.add('open');
        }
    });
}

// Memunculkan default tabel 3x3
window.addEventListener('load', drawBoard(3));
window.addEventListener('load', drawHasil(3));
    