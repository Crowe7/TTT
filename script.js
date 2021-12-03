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

const Player = (name, sign) => {

    return {name, sign};
};

const displayController = (() => {
    let p1 = document.querySelector('#player1');
    let p2 = document.querySelector('#player2');
    let reset = document.querySelector('#reset');

    function setPlayer() {
        this.innerText = 'YOU';
        if(this === p1) {
            p2.innerText = 'CPU';
            const player1 = Player('YOU', "X");
            const player2 = Player('CPU', "O");
        }
        else {
            p1.innerText = 'CPU';
            const player1 = Player('CPU', "X");
            const player2 = Player('YOU', "O");
        }
    }

    p1.addEventListener('click', setPlayer);
    p2.addEventListener('click', setPlayer);

})();

// maybe add a function to gameboard that allows the ability to pass a param based on div clicked
// and what player to change the array and then run displaycurrntboard

//display controller will be the "victory screen" and the player buttons and reset button 
//will also but a border around the current players button 

//maybe add 