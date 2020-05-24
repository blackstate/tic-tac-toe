const gameBoard = (function () {
    const _board = document.querySelector("div#gameBoard");
    const _boardArr = [
        [undefined,undefined,undefined],
        [undefined,undefined,undefined],
        [undefined,undefined,undefined]
    ];
    let currentSym = 1;

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

    function updateSymbol () {
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
        updateSymbol ();
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
        displayController.addCellEvent();
    }

    return {
        render, updateBoard
    }
})();

const displayController = (function() {
   
    let currentMarker = "x";
   
    function addTic() {
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

    const addCellEvent = () => {
        let boardCell = Array.from(document.querySelectorAll(".cell"));
        boardCell.forEach((cell, i) => {
            cell.addEventListener('click', addTic.bind(cell));
            cell.addEventListener('click', gameBoard.updateBoard.bind(i))
        })
    }
    return {
        addCellEvent
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

