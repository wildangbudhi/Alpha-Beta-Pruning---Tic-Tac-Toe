const {PythonShell} = require('python-shell')

function python() {
    // contoh data
    var data = [[1, 2, 3], [4, 6, 6], [7, 8, 9]];
    var data2 = '[';
    for (let i = 0; i < data.length; i++) {
        data2 = data2 + '[';
        for(let j = 0; j < data[i].length; j++){
            data2 = data2 + data[i][j].toString();
            if(j < data[i].length-1) data2 = data2 + ', ';
        }
        data2 = data2 + ']';
        if(i < data.length-1) data2 = data2 + ', ';
    }
    data2 = data2 + ']';
    
    let options = {
        pythonPath: 'C:/ProgramData/Anaconda3/python.exe',
        scriptPath: 'C:/Users/comp/Documents/Python/KB/Alpha-Beta-Pruning---Tic-Tac-Toe/Python/',
        args : [data2]
    };
    
    PythonShell.run('coba.py', options, function(err, results) {
        if(err) throw err;
        // var data = JSON.parse(results);
        // var element = document.getElementById("answer");
        // var array = '';

        // for (let i = 0; i < data['tree'].length; i++) {
        //     array = array + i + '-->' + JSON.stringify(data['tree'][i]) + '<br />';
        // }

        // element.innerHTML= array;

        console.log(JSON.parse(results));
        // console.log(results);

    });

}

python()