const gameBoard = (function () {
    const _board = document.querySelector("div#gameBoard");
    const tags = Array.from(document.querySelectorAll('div.player-tag'));
    const announce = document.querySelector('#announce');

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
                announceWin();
                return;
            }
        }

        if (moveNum == 9) {
            announceWin("draw");
            return;
        }
    }

    function announceWin (drawVal) {
        let winText = document.querySelector('div.win-text')
        let winner;
        if (drawVal) {
            winText.innerHTML = "Draw!";
        }
        else {
            winner = currentSym == 1 ? display.getNames()[0] : display.getNames()[1];
            winText.innerHTML = `${winner} wins!`;
        }
        
        announce.classList.remove('hide');
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

    function _toggleTags () {
        tags.forEach(tag => {
            tag.classList.contains('turn') ? tag.classList.remove('turn') : tag.classList.add('turn');
        })
    }

    function _resetTags () {
        tags[0].classList.add('turn');
        tags[1].classList.remove('turn');
    }

    function _update () {
        moveNum++;
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
        _toggleTags();
    }


    function reset () {
        if (_board.innerHTML == "")
            return

        for(i = 0; i < 3; i++) {
            _boardArr[i] = [undefined, undefined, undefined];
        }
        moveNum = 0;
        currentSym = 1;
        currentMarker = "x";
        _resetTags();
        render();
    }

    function _addCellEvent () {
        let boardCell = Array.from(document.querySelectorAll(".cell"));
        boardCell.forEach((cell, i) => {
            cell.addEventListener('click', _addTic.bind(cell));
            cell.addEventListener('click', _update.bind(i));
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
        _addCellEvent();
    }
    
    return {
        render, reset
    }
})();

const display = (function() {
    const startButton = document.querySelector('#start');
    const deleteButton = document.querySelector('#reset');

    const again = document.querySelector('#again');
    const announce = document.querySelector('#announce');

    const input = document.querySelector('.input-box');
    const _board = document.querySelector("div#gameBoard");
    const _game = document.querySelector('div.game');
    
    function getNames () {
        let names = Array.from(document.querySelectorAll('input'));
        if (names[0].value == "" || names[1].value == "") {
            return ["Player 1", "Player 2"];
        }
        else {
            return names.map(name => name.value)
        }
    }
    
    // function _checkRunning () {
    //     let cells = Array.from(_board.children)

    //     cells.some(function(cell) {
    //         if (cell.innerHTML !== "") {
    //             return true;
    //         }
    //     })
    // }

    function _toggleGame () {
        if(_game.classList.contains('hide')) {
            _game.classList.remove('hide');
        }
        else {
            _game.classList.add('hide');
        }
    }

    function _changePlayers () {
        let tags = Array.from(document.querySelectorAll('div.player-tag'));
        tags[0].innerHTML = getNames()[0];
        tags[1].innerHTML = getNames()[1];
    }

    function _toggleInputbox () {
        if(input.classList.contains('hide')) {
            input.classList.remove('hide');
        }
        else {
            input.classList.add('hide');
        }
    }

    function _startGame () {
        _changePlayers();
        if (_board.innerHTML == "" || (_game.classList.contains('hide'))) {
            startButton.innerHTML = "< back";
        }

        else {
            _board.innerHTML == ""
            startButton.innerHTML = "start >";
            gameBoard.reset();
        }

        _toggleInputbox();
        _toggleGame();
        gameBoard.render();
    }

    function _toggleAnnounce () {
        announce.classList.add('hide');
        gameBoard.reset();
    }

    deleteButton.addEventListener("click", gameBoard.reset);
    startButton.addEventListener("click", _startGame);
    
    again.addEventListener("click", _toggleAnnounce);

    return {
        getNames
    }
})();




