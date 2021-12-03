const gameBoard = (() => {
    let _gameBoard = ["X", "O", "X", "O", "X", "O", "X", "O","X"];

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

})()

gameBoard.displayCurrentBoard();

//display controller will be the "victory screen" and the player buttons and reset button 

