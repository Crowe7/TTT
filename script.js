const gameBoard = (() => {
    let _gameBoard = ["", "", "", "", "", "", "", "",""];

    function  _makeBoard() {
        for(i = 1; i <= 9; i++) {
            let square = document.createElement('div');
            square.classList.add('grid');
            square.setAttribute('id', i);
            document.querySelector('#gameBoard').appendChild(square);
        }
    }
    _makeBoard();

    function displayCurrentBoard() {
        let square = document.querySelectorAll('.grid');
        for(i = 0; i <= 8; i++) {
            square[i].innerText = _gameBoard[i];
        }
    }
    
    return {
        displayCurrentBoard,

    }

})();

// gameBoard.displayCurrentBoard();

const Player = (sign) => {

    return {sign};
};

const displayController = (() => {
    let p1 = document.querySelector('#player1');
    let p2 = document.querySelector('#player2');
    let reset = document.querySelector('#reset');

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
    });
    p2.addEventListener('click', () => {
        setPlayer();
        currentPlayer();
    });

    function currentPlayer() {
        if(playRound.playTurn() === 'X') {
            p1.classList.add('on');
            if(p2.classList.contains('on')) {
                p2.classList.remove('on');
            }
        }
        else {
            p2.classList.add('on')
            p1.classList.remove('on');
        }
    }



    return {
        p1,
        p2,
    }

})();

const playRound = (() => {
    const player1 = Player("X");
    const player2 = Player("O");
    let turnCounter = 2;

    function playTurn() {
        if(turnCounter % 2 === 0) {
            turn = player1.sign;
            console.log(turn)
        }
        else {
            turn = player2.sign;
            console.log(turn);
        }
        turnCounter++
        return turn;
    }

    return {
        playTurn,
    }
})();

function currentPlayer() {
    if(playRound.playTurn() === 'X') {
        console.log('e');
    }
    else {
        console.log(playRound.playTurn);
    }
}

// maybe add a function to gameboard that allows the ability to pass a param based on div clicked
// and what player to change the array and then run displaycurrntboard

//display controller will be the "victory screen" and the player buttons and reset button 
//will also but a border around the current players button 

//TODO ADD RESET FUNTIONALITY




//