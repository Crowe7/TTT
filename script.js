const gameBoard = (() => {
    let _gameBoard = ["", "", "", "", "", "", "", "",""];
    const DEFAULT_BOARD = _gameBoard;

    
        const WINNING_MOVES = 
        [[0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]];


    function checkForWin() {

        for(i = 0; i <=7; i++) {
           winCondition = WINNING_MOVES[i];
           let a = _gameBoard[winCondition[0]];
           let b = _gameBoard[winCondition[1]];
           let c = _gameBoard[winCondition[2]];

           if(a === "" || b === "" || c === "") {
                continue;
           }
           
           else if(a === b && a === c) {
               displayController.displayResult(a);
           }
        }
        return false
    }

    function  makeBoard() {
        for(i = 1; i <= 9; i++) {
            let square = document.createElement('div');
            square.classList.add('grid');
            square.setAttribute('id', i);
            document.querySelector('#gameBoard').appendChild(square);
            
            square.addEventListener('click', updateGameBoard);

        }
    }

    function displayCurrentBoard() {
        let square = document.querySelectorAll('.grid');
        for(i = 0; i <= 8; i++) {
            square[i].innerText = _gameBoard[i];
        }
    }
    


    function updateGameBoard(sign) {

        if(_gameBoard[this.id - 1] !== "") {
            return;
        }
        sign = playRound.playTurn();
        _gameBoard[this.id - 1] = sign;
        console.log(_gameBoard);
        displayController.currentPlayer();
        displayCurrentBoard();
        checkForWin();

    }

    return {
        displayCurrentBoard,
        makeBoard,
        checkForWin,
    }

})();


const Player = (sign) => {

    return {sign};
};

const displayController = (() => {
    let resultText = document.querySelector('#result');
    let p1 = document.querySelector('#player1');
    let p2 = document.querySelector('#player2');
    let reset = document.querySelector('#reset');
    let modalReset = document.querySelector('#resetTwo');
    let gameStatus = false;

    function setPlayer(player) {
        if(player === p1) {
            p1.innerText = 'YOU';
            p2.innerText = 'CPU';
        }
        else {
            p2.innerText = 'YOU';
            p1.innerText = 'CPU';
        }
    }

    p1.addEventListener('click', () => {
        setPlayer(p1);
        currentPlayer();
        gameBoard.makeBoard();
    });
    p2.addEventListener('click', () => {
        setPlayer();
        currentPlayer();
        gameBoard.makeBoard();
    });

    function currentPlayer() {
        if(gameStatus === false) {
            p1.classList.add('on');
            gameStatus = true;
        }
        else {
            p2.classList.toggle('on');
            p1.classList.toggle('on');
        }
    }
    function displayResult(result) {
        if(result === 'tie') {
            resultText.innerText = "CAT GAME!";
            modal.style.display = 'block';
        }
        else if(result === 'X') {
           if(p1.innerText === 'YOU') {
               resultText.innerText = "YOU WIN!";
           }
           else {
               resultText.innerText = "COMPUTER WINS!";
           }
           modal.style.display = 'block';
        }
        else {
            if(p2.innerText === 'YOU') {
                resultText.innerText = "YOU WIN!";
            }
            else {
                resultText.innerText = "COMPUTER WINS!";
            }
            modal.style.display = 'block';
        }
    }
    //WINNER DISPLAY MODAL
    let modal = document.querySelector('#modalID');
    window.addEventListener('click', (e) => {
        if(e.target=== modal) {
            modal.style.display = 'none';
        }
    });

    return {
        currentPlayer,
        displayResult,
    }

})();

const playRound = (() => {
    const player1 = Player("X");
    const player2 = Player("O");
    let turnCounter = 0;

    function playTurn() {
        if(turnCounter % 2 === 0) {
            turn = player1.sign;
            console.log(turn);
        }
        else {
            turn = player2.sign;
            console.log(turn);
        }
        turnCounter++
        if(turnCounter === 9) {
            checkForTie();
        }
        return turn;
    }

    function checkForTie() {
        if(gameBoard.checkForWin() === false) {
            displayController.displayResult('tie');
        }
    }


    return {
        playTurn,
    }
})();




//TODO ADD RESET FUNTIONALITY

//TODO ADD COMPUTER PLAYER

// TODO CLEAN STYLES UP