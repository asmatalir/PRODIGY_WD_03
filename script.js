const playerX = 'X';
const playerO = 'O';

let currentPlayer = playerX;
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const gameContainer = document.getElementById('game-container');

// Dynamically create cells
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-index', i);
    cell.addEventListener('click', handleCellClick);
    gameContainer.appendChild(cell);
}

function handleCellClick(event) {
    const index = event.target.getAttribute('data-index');

    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        event.target.textContent = currentPlayer;

        if (checkWin()) {
            alert(`Player ${currentPlayer} wins!`);
            gameActive = false;
        } else if (checkTie()) {
            alert('It\'s a tie!');
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === playerX ? playerO : playerX;
        }
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

function checkTie() {
    return !gameBoard.includes('');
}
