const {PythonShell} = require('python-shell')

function python() {
    
    let options = {
        pythonPath: 'C:/ProgramData/Anaconda3/python.exe',
        scriptPath: 'C:/Users/comp/Documents/Python/KB/Alpha-Beta Pruning - Tic Tac Toe/'
    };
    
    PythonShell.run('Alpha-Beta-Pruning.py', options, function(err, results) {
        if(err) throw err;
        var data = JSON.parse(results);
        var element = document.getElementById("answer");
        var array = '';

        for (let i = 0; i < data['tree'].length; i++) {
            array = array + i + '-->' + JSON.stringify(data['tree'][i]) + '<br />';
        }

        element.innerHTML= array;

    });

}