const player1 = {
    name: "Player1",
    marker: "X"
};

const player2 = {
    name: "Player2",
    marker: "O"
};

const gameBoard = [
    ['-', '-', '-'],
    ['-', '-', '-'],
    ['-', '-', '-']
];

let gameOver = false;

const printBoard = () => {
    console.log(gameBoard[0].join(' '));
    console.log(gameBoard[1].join(' '));
    console.log(gameBoard[2].join(' '));
};

const targetSquare = (squareNum, player) => {
    const num = parseInt(squareNum);
    if (num >= 0 && num <= 8) {
        const row = Math.floor(num / 3);
        const col = num % 3;
        if (gameBoard[row][col] === '-') {
            gameBoard[row][col] = player.marker;
            console.log(`Player ${player.name} marked position ${num} with ${player.marker}`);
        } else {
            console.log("Square already taken. Choose another.");
        }
    } else {
        console.log("Invalid move. Please choose a number between 0 and 8.");
    }

    // Display updated game board
    printBoard();
};

const checkWin = (board, player) => {
    const marker = player.marker;

    // Check rows
    for (let row of board) {
        if (row.every(cell => cell === marker)) {
            return true;
        }
    }

    // Check columns
    for (let col = 0; col < board.length; col++) {
        if (board.every(row => row[col] === marker)) {
            return true;
        }
    }

    // Check diagonals
    if (board.every((row, index) => row[index] === marker)) {
        return true;
    }
    if (board.every((row, index) => row[row.length - 1 - index] === marker)) {
        return true;
    }

    return false;
};

document.addEventListener('DOMContentLoaded', function() {
    const boxes = document.querySelectorAll('.box');

    let currentPlayer = player1;

    boxes.forEach(box => {
        box.addEventListener('click', function handleClick(event) {
            if (gameOver) return;
            const squareNum = event.target.id;
            targetSquare(squareNum, currentPlayer);
            event.target.innerText = currentPlayer.marker;
            event.target.style.backgroundColor = currentPlayer === player1 ? "blue" : "red";
            if (checkWin(gameBoard, currentPlayer)) {
                let win = `${currentPlayer.name} wins!!`;
                console.log(win);
                gameOver = true;
            } else if (gameBoard.flat().every(cell => cell !== '-')) {
                let tie = "It's a tie!";
                console.log(tie);
                gameOver = true;
            }
            currentPlayer = currentPlayer === player1 ? player2 : player1;
        }, { once: true }); // Ensures each box can only be clicked once
    });
});
