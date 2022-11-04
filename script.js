const makeBoard = (() => {
    const gameBoardArray = ['', '', '', '', '', '', '', '', ''];
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
        return {Player1, Player2}
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
    const mainCont = document.getElementById('main');
    let whoseTurn = document.getElementById('turn');
    whoseTurn.innerHTML =  "It's " + Player1.name + "'s " + 'turn.'
    mainCont.prepend(whoseTurn);

    let TileArr = makeBoard.gameTiles;
    TileArr.forEach(element => {
        element.addEventListener('click', function() {
            if (Player1.isTheirTurn === true) {
                if (element.innerHTML === '') {
                    whoseTurn.innerHTML =  "It's " + Player2.name + "'s " + 'turn.'
                    mainCont.prepend(whoseTurn);
                    Player1.getTile(getArrayIndex(element.classList))
                    element.innerHTML = 'X';
                    checkForWinner(Player1, Player2, whoseTurn, mainCont);
                    Player1.isTheirTurn = false;
                    Player2.isTheirTurn = true;
                }
            }
            if (Player2.isTheirTurn === true) {
                if (element.innerHTML === '') {
                    whoseTurn.innerHTML =  "It's " + Player1.name + "'s " + 'turn.'
                    mainCont.prepend(whoseTurn);
                    Player2.getTile(getArrayIndex(element.classList))
                    element.innerHTML = 'O';
                    checkForWinner(Player1, Player2, whoseTurn, mainCont);
                    Player2.isTheirTurn = false;
                    Player1.isTheirTurn = true;       
                }        
            }
        });
    });
}

const checkForWinner = (Player1, Player2, whoseTurn, mainCont) => {
    let arr = makeBoard.gameBoardArray;
  
    console.log(arr);
    if (arr[0] != '' && arr[1] != '' && arr[2] != '' && arr[3] != '' && arr[4] != '' && arr[5] != '' && arr[6] != '' && arr[7] != '' && arr[8] != '' ) {
        whoseTurn.innerHTML = 'Tie!';
        makeReloadButton(whoseTurn, Player1, Player2);
    }

    if (Player1.isTheirTurn === true) {
        let name = Player1.name;
        if((arr[0] === name && arr[1] === name && arr[2] === name) || (arr[3] === name && arr[4] === name && arr[5] === name) || (arr[6] === name && arr[7] === name && arr[8] === name)
            || (arr[0] === name && arr[3] === name && arr[6] === name) || (arr[1] === name && arr[4] === name && arr[7] === name) || (arr[2] === name && arr[5] === name && arr[8] === name)
            || (arr[0] === name && arr[4] === name && arr[8] === name) || (arr[2] === name && arr[4] === name && arr[6] === name)) {
            whoseTurn.innerHTML = Player1.name + ' wins!';
            makeReloadButton(whoseTurn, Player1, Player2);
        }
    } 

    else if (Player2.isTheirTurn === true) {
        let name = Player2.name;
        if((arr[0] === name && arr[1] === name && arr[2] === name) || (arr[3] === name && arr[4] === name && arr[5] === name) || (arr[6] === name && arr[7] === name && arr[8] === name)
            || (arr[0] === name && arr[3] === name && arr[6] === name) || (arr[1] === name && arr[4] === name && arr[7] === name) || (arr[2] === name && arr[5] === name && arr[8] === name)
            || (arr[0] === name && arr[4] === name && arr[8] === name) || (arr[2] === name && arr[4] === name && arr[6] === name)) {
            whoseTurn.innerHTML = Player2.name + ' wins!';
            makeReloadButton(whoseTurn, Player1, Player2);
        }
    } 
    

}

const makeReloadButton = (whoseturn, Player1, Player2) => {
    const replayBtn = document.createElement('button')
    replayBtn.innerHTML = 'New Game'
    whoseturn.appendChild(replayBtn)
    replayBtn.addEventListener('click', function() {
        for (let i = 0; i < makeBoard.gameTiles.length; i++) {
            makeBoard.gameTiles[i].innerHTML = ''
            makeBoard.gameBoardArray = ['', '', '', '', '', '', '', '', ''];
            game(Player1, Player2)
        }

    });
    
}