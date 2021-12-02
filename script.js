const gameBoard = (() => {
    let _gameBoard = [];
    
    function  _displayBoard() {
        for(i = 1; i <= 9; i++) {
            let square = document.createElement('div');
            square.classList.add('grid');
            square.setAttribute('id', i);
            document.querySelector('#gameBoard').appendChild(square);
        }
    }
    _displayBoard();
})()


//display controller will be the "victory screen" and the player buttons