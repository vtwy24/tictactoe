const boardElement = document.getElementById('board');
const newGameBtn = document.getElementById('newGameBtn');

let board = Array(9).fill(null);
let isXNext = true;
let winner = null;
let winnerPath = null;

function createBoard() {
  boardElement.innerHTML = '';
  board.forEach((cell, index) => {
    const btn = document.createElement('button');
    btn.classList.add('square');
    btn.textContent = cell ? cell : '';
    btn.disabled = cell || winner;

    if (winnerPath && winnerPath.includes(index)) {
      btn.classList.add('highlight');
    }
    btn.addEventListener('click', () => handleClick(index));
    boardElement.appendChild(btn);
  });
}

function handleClick(index) {
  if (board[index] || winner) return;

  board[index] = isXNext ? 'X' : 'O';
  isXNext = !isXNext;

  const result = checkWinner(board);
  if (result) {
    winner = result.winner;
    winnerPath = result.path;
  }
  createBoard();

  if (winner) {
    setTimeout(() => alert(`${winner} wins!`), 100);
  } else if (board.every(Boolean)) {
    setTimeout(() => alert(`It's a draw!`), 100);
  }
}

function checkWinner(squares) {
  const winningPaths = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let path of winningPaths) {
    const [a, b, c] = path;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {winner: squares[a], path};
    }
  }
  return null;
}

function newGame() {
  board = Array(9).fill(null);
  isXNext = true;
  winner = null;
  winnerPath = null;
  createBoard();
}

newGameBtn.addEventListener('click', newGame);
createBoard();
