const gameBoard = (function () {
    const _board = document.querySelector("div#gameBoard");
    const _boardArr = [
        [1,undefined,undefined],
        [undefined,1,undefined],
        [undefined,undefined,1]
    ];
    let currentSym = 1;
    let currentMarker = "x";
   
    function _addTic() {
        if (this.innerHTML != "")
            return;

        this.innerHTML = currentMarker;
        
        if (currentMarker == "o") {
            currentMarker = "x";
        }
        else {
            currentMarker = "o";
        }
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

    function updateBoard () {
        let position = this;
        if (position >= 0 && position < 3) {
            _boardArr[0][position] = currentSym;
        }
        else if (position >= 3 && position < 6) {
            _boardArr[1][(position-3)] = currentSym;
        }
        else  {
            _boardArr[2][(position-6)] = currentSym;
        }
        console.log(_boardArr);
        _updateSymbol ();
    }

    const addCellEvent = () => {
        let boardCell = Array.from(document.querySelectorAll(".cell"));
        boardCell.forEach((cell, i) => {
            cell.addEventListener('click', _addTic.bind(cell));
            cell.addEventListener('click', updateBoard.bind(i))
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

