const gameBoard = (function () {
    const _board = document.querySelector("div#gameBoard");
    const _boardArr = [
        [undefined,undefined,undefined],
        [undefined,undefined,undefined],
        [undefined,undefined,undefined]
    ];
    let currentSym = 1;
    let currentMarker = "x";
    let moveNum = 0;
    let a, b, c;
    let winningCombo = []

    
    function _checkWin () {
        winningCombo = [
            [_boardArr[0][0], _boardArr[0][1], _boardArr[0][2]],
            [_boardArr[1][0], _boardArr[1][1], _boardArr[1][2]],
            [_boardArr[2][0], _boardArr[2][1], _boardArr[2][2]],
    
            [_boardArr[0][0], _boardArr[1][0], _boardArr[2][0]],
            [_boardArr[0][1], _boardArr[1][1], _boardArr[2][1]],
            [_boardArr[0][2], _boardArr[1][2], _boardArr[2][2]],
    
            [_boardArr[0][0], _boardArr[1][1], _boardArr[2][2]],
            [_boardArr[0][2], _boardArr[1][1], _boardArr[2][0]]
        ]
        
        for (i = 0; i < 8; i++) {
            a = winningCombo[i][0];
            b = winningCombo[i][1];
            c = winningCombo[i][2];

            if (a == undefined || b == undefined || c == undefined){
                continue;
            }

            if (a == b && a == c && b == c) {
                console.log(_boardArr);
                console.log('winner ' + currentMarker);
                return;
            }
        }

        if (moveNum == 9) {
            alert("draw");
            return;
        }

    }

    function _updateMarker () {
        if (currentMarker == "o") {
            currentMarker = "x";
        }
        else {
            currentMarker = "o";
        }
    }

    function _addTic() {
        if (this.innerHTML != "")
            return;

        this.innerHTML = currentMarker;
    }

    function _getValue (val) {
        if (val === undefined) {
            return ""
        }
        else if (val === 1) {
            return "x"
        }
        else {
            return "o"
        }
    }

    function _updateSymbol () {
        if (currentSym == 1) {
            currentSym = 0;
        }
        else {
            currentSym = 1;
        }
    }

    function _updateBoard () {
        let position = this;

        if (position >= 0 && position < 3) {
            if (_boardArr[0][position] == undefined) 
                _boardArr[0][position] = currentSym;
        }
        else if (position >= 3 && position < 6) {
            if (_boardArr[1][position-3] == undefined)
                _boardArr[1][(position-3)] = currentSym;
        }
        else if (position >= 6) {
            if (_boardArr[2][position-6] == undefined)
                _boardArr[2][(position-6)] = currentSym;
        }

        _checkWin ();
        _updateSymbol ();
        _updateMarker ();
        moveNum ++;
    }

    function addCellEvent () {
        let boardCell = Array.from(document.querySelectorAll(".cell"));
        boardCell.forEach((cell, i) => {
            cell.addEventListener('click', _addTic.bind(cell));
            cell.addEventListener('click', _updateBoard.bind(i));
        })
    }

    function render () {
        let cell;
        _board.innerHTML = "";
        
        _boardArr.forEach((rowArr) => {
            rowArr.forEach((value) => {
                cell = document.createElement('div');
                cell.classList.add('cell');
                cell.innerHTML = _getValue(value);
                _board.appendChild(cell);
            })
        })
        addCellEvent();
    }

    return {
        render
    }
})();

const displayController = (function() {
   
    return {
        
    }
})();

gameBoard.render();

// const player = (playerSymbol, playerName) => { 
//     let name = playerName;
//     let symbol = playerSymbol;
    
//     const sayName = () => {
//         console.log("Hi my name is " + name);   
//     }

//     return  {
//         sayName
//     }
// };

// let jimmy = player("cross", "jimmy");
// let stevie = player("stevie", "nought");

