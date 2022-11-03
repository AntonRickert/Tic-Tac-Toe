const makeBoard = (() => {
    const gameBoardArray = new Array(9);
    const gameTiles = [];
    let htmlGameBoard = document.getElementById('gameBoard');
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement('div');
        tile.className = 'tile tile-' + (i + 1)
        htmlGameBoard.appendChild(tile);
        gameTiles[i] = tile;
    }
    return {gameTiles, gameBoardArray};
})();


const Player = (name, playerNum) => {
    let isTheirTurn = false;
    let isWinner = false
    const getName = () => name;
    
    const getTile = (tileNum) => {
        makeBoard.gameBoardArray[tileNum - 1] = name;
    }

    const win = () => isWinner = true;
    return {getName, getTile, win, isWinner, isTheirTurn, name, playerNum}
};


const getPlayers = (() => {
    const SubmitBtn = document.getElementById('submit');
    SubmitBtn.addEventListener('click', function(event) {
        event.preventDefault();
        let Player1 = Player(document.getElementById('player1').value, 1);
        let Player2 = Player(document.getElementById('player2').value, 2);
        game(Player1, Player2);
    });
})();




const game = (Player1, Player2) => {
    Player1.isTheirTurn = true;
    const getArrayIndex = (element) => {
        let index = element;
        index = index.toString();
        index = index.slice(-1);
        return index;
    }
    let TileArr = makeBoard.gameTiles;
    TileArr.forEach(element => {
        element.addEventListener('click', function() {
            if (Player1.isTheirTurn === true) {
                if (element.innerHTML === '') {
                    Player1.getTile(getArrayIndex(element.classList))
                    element.innerHTML = 'X';
                    Player1.isTheirTurn = false;
                    Player2.isTheirTurn = true;
                }
            }
            if (Player2.isTheirTurn === true) {
                if (element.innerHTML === '') {
                    Player2.getTile(getArrayIndex(element.classList))
                    element.innerHTML = 'O';
                    Player2.isTheirTurn = false;
                    Player1.isTheirTurn = true;
                }        
            }
        });
    });
}




