const gameBoard = (() => {
    let _gameBoard = ["", "", "", "", "", "", "", "",""];

    
        const WINNING_MOVES = 
        [[0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]];

    //ALSO UPDATES DISPLAY WINS
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
               playRound.stopExtraWins(true);
               if(a === playRound.computerPlayer().sign) {
                    displayController.displayWins('CPU');
               }
               else {
                   displayController.displayWins('YOU');
               }
               return true;
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

    function deleteBoard() {
        let gameBoard = document.querySelector('#gameBoard');
        while(gameBoard.lastChild != undefined) {
            gameBoard.lastChild.remove()
        }
    }

    function displayCurrentBoard() {
        let square = document.querySelectorAll('.grid');
        for(i = 0; i <= 8; i++) {
            square[i].innerText = _gameBoard[i];
        }
    }
    

    // ALSO PLAYS COMPUTER TURN :(
    function updateGameBoard(sign) {

        if(_gameBoard[this.id - 1] !== "") {
            return;
        }
        sign = playRound.playTurn();
        _gameBoard[this.id - 1] = sign;
        setColor(sign, this.id);
        displayController.currentPlayer();
        displayCurrentBoard();
        if(checkForWin() === false) {
            computerInput();
        }

    }


    

    function setColor(sign, div) {
        let clickedSquare = document.getElementById(div)
        if(sign === 'X') {
            clickedSquare.classList.add('blue');
        }
        if(sign ==='O') {
            clickedSquare.classList.add('red');
        }
    }



    function reset() {
        _gameBoard = ["", "", "", "", "", "", "", "",""];
        deleteBoard();
    }

   async function computerInput() {
        let arrayRandom = Math.floor(Math.random() * 9);
        if(_gameBoard[arrayRandom] != "") {
            if(playRound.fakeThink() === false) {
                return
            }
            computerInput();
        }
        else {
            _gameBoard[arrayRandom] = playRound.playTurn();
            sign = _gameBoard[arrayRandom];
            setColor(sign, arrayRandom + 1);
            // WAITS HALF A SECOND BEFORE CPU PUTS MOVE DOWN
            if(playRound.fakeThink() === true) {
                await new Promise(r => setTimeout(r, 500));
            }
            displayController.currentPlayer();
            displayCurrentBoard();
            if(playRound.stopExtraWins() === true) {
                return
            } 
            checkForWin();
        }
    }

    return {
        displayCurrentBoard,
        makeBoard,
        checkForWin,
        reset,
        computerInput,
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
    let playerWinsCounter = document.querySelector('#playerWins');
    let computerWinsCounter = document.querySelector('#computerWins');
    let playerWins = 0;
    let computerWins = 0;


    function displayWins(winner) {
        if(winner === 'YOU') {
            playerWins++;
            playerWinsCounter.textContent = 'PLAYER WINS:' + " " + playerWins;
        }
        else if(winner === 'CPU') {
            computerWins++;
            computerWinsCounter.textContent = "COMPUTER WINS:" + " " + computerWins;
        }
        else {
            playerWinsCounter.textContent = 'PLAYER WINS:' + " " + playerWins;
            computerWinsCounter.textContent = "COMPUTER WINS:" + " " + computerWins;
        }
    }
    displayWins();

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
    // ADDS THE MAKING OF THE BOARD AND PLAYS COMPUTER TURN IF PLAYER DECIDES TO GO LAST
    p1.addEventListener('click', () => {
        setPlayer(p1);
        currentPlayer();
        gameBoard.makeBoard();
        disableButton();
        playRound.computerPlayer();
    });
    p2.addEventListener('click', () => {
        setPlayer();
        currentPlayer();
        gameBoard.makeBoard();
        disableButton();
        gameBoard.computerInput();
        playRound.computerPlayer();
    });


    reset.addEventListener('click', resetGame);


    function currentPlayer() {
        if(gameStatus === false) {
            p1.classList.add('pone');
            gameStatus = true;
        }
        else {
            p2.classList.toggle('ptwo');
            p1.classList.toggle('pone');
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
    function disableButton() {
        if(gameStatus === false) {
            return 
        }
        if(p1.disabled === false || p2.disabled === false) {
            p1.disabled = true;
            p2.disabled = true;
        }
        else {
            p1.disabled = false;
            p2.disabled = false;
        }
    }
    function displayReset() {
        p1.textContent = "PLAYER 1";
        p2.textContent = "PLAYER 2";
        if(p1.classList.contains('pone')) {
            p1.classList.remove('pone');
        }
        if(p2.classList.contains('ptwo')) {
            p2.classList.remove('ptwo');
        }
        disableButton();
    }

    function resetGame(roundOrGame) {
        displayReset();
        playRound.reset();
        gameBoard.reset();
        gameStatus = false;

        if(roundOrGame === 'round') {
            return;
        }
        else {
            playerWins = 0;
            computerWins = 0;
            displayWins();
        }

    }
    //WINNER DISPLAY MODAL

    modalReset.addEventListener('click', () => {
        resetGame('round');
        modal.style.display = 'none';
    });

    let modal = document.querySelector('#modalID');
    window.addEventListener('click', (e) => {
        if(e.target=== modal) {
            modal.style.display = 'none';
            resetGame('round');
        }
    });

    return {
        displayWins,
        currentPlayer,
        displayResult,
        p1,
        p2,
    }

})();

const playRound = (() => {
    const player1 = Player("X");
    const player2 = Player("O");
    let win = false;
    let computer = undefined;
    let turnCounter = 0;

    function playTurn() {
        if(turnCounter % 2 === 0) {
            turn = player1.sign;
        }
        else {
            turn = player2.sign;
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

    function reset() {
        turnCounter = 0;
        win = false;
    }

    function computerPlayer() {

        if(displayController.p1.textContent === 'CPU') {
            computer = player1;
        }
        else {
            computer = player2;
        }
        return computer
    }

    function fakeThink() {
        if(turnCounter < 9) {
            return true
        }
        else {
            return false
        }

    }

    function stopExtraWins(bool) {
        if(bool === true) {
            win = true;
            return win;
        }
        return win;

    }
    
    return {
        playTurn,
        reset,
        computerPlayer,
        fakeThink,
        stopExtraWins,
    }



})();
