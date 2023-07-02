/*----- constants -----*/ 
const COLORS = {
    // 'null': 'white', 
    '1': 'x',
    '-1': 'o',
  };
  
/*----- state variables -----*/ 
let board; // board array
let turn;
let winner; // null = no winner; 1 or -1 = winner; 'T' = tie;

/*----- cached elements  -----*/ 
const messageEl = document.querySelector('h2');
const playAgainBtn = document.querySelector('button');
const markerEls = [...document.querySelectorAll('#markers > div')]; // changes into an array

/*----- Winning combo 1 # winOptR1-----*/
const winCombos = [
  [[0, 0], [0, 1], [0, 2]], // Row 0
  [[1, 0], [1, 1], [1, 2]], // Row 1
  [[2, 0], [2, 1], [2, 2]], // Row 2
  [[0, 0], [1, 0], [2, 0]], // Column 0
  [[0, 1], [1, 1], [2, 1]], // Column 1
  [[0, 2], [1, 2], [2, 2]], // Column 2
  [[0, 0], [1, 1], [2, 2]], // Diagonal (top-left to bottom-right)
  [[0, 2], [1, 1], [2, 0]], // Diagonal (top-right to bottom-left)
];

/*----- event listeners -----*/ 
document.getElementById('board').addEventListener('click', handleDrop); // Don't invoke as it doesn't return anything   
playAgainBtn.addEventListener('click', init);

/*----- functions -----*/ 
init();

// Initialize all state, then call render ()
function init() {
  board = [
    [null, null, null], // col 0
    [null, null, null], // col 1
    [null, null, null], // col 2
  ];
  turn = 1; // who starts
  winner = null;
  render();
}

// Visualize all state in the DOM
function render() {
    renderBoard();
    renderMessage(); // Changes who's turn it is in <H2>
    renderControls(); // show/hide markers/play again button
  }

// In response to user interaction, update all impacted
// state, then call render();
function handleDrop(evt) {
  const { id } = evt.target;
  const colIdx = parseInt(id.charAt(1));
  const rowIdx = parseInt(id.charAt(3));

  if (board[colIdx][rowIdx] || winner) {
    return;
  }

  board[colIdx][rowIdx] = turn;
  getWinner(colIdx, rowIdx); // Remove the assignment to winner variable
  turn *= -1;
  render();
}

// Check for winner in board state
// Return null if no winner, 1/-1 if a player has won, 'T' if tie
function getWinner() {
  let remainingTiles = 0;
  board.forEach(function (colArr) {
    if (!colArr[2]) remainingTiles += 1;
  });

  if (!remainingTiles) {
    winner = 'T';
    return;
  }

  for (let i = 0; i < winCombos.length; i++) {
    const combo = winCombos[i];
    const [a, b, c] = combo;
    const [aCol, aRow] = a;
    const [bCol, bRow] = b;
    const [cCol, cRow] = c;

    const total = Math.abs(
      board[aCol][aRow] +
      board[bCol][bRow] +
      board[cCol][cRow]
    );

    if (total === 3) {
      winner = board[aCol][aRow];
      return;
    }
  }

  return null; // Return null if there is no winner or tie
}

function renderBoard() {
  board.forEach(function(colArr, colIdx) {
    colArr.forEach(function(cellVal, rowIdx) {
      const cellId = `c${colIdx}r${rowIdx}`;
      const cellEl = document.getElementById(cellId);
      if (cellVal === 1) {
        cellEl.innerHTML = 'x';
        cellEl.classList.add('x');
        cellEl.classList.remove('unplayed');
      } else if (cellVal === -1) {
        cellEl.innerHTML = 'o';
        cellEl.classList.add('o');
        cellEl.classList.remove('unplayed');
      } else if (cellVal === 'T') {
        cellEl.innerHTML = 'T';
        cellEl.classList.add('tie');
        cellEl.classList.remove('unplayed');
      } else {
        cellEl.innerHTML = ''; // Clear the cell content
        cellEl.classList.add('unplayed');
      }
    });
  });
}

function renderMessage() {
    if (winner === 'T') {
      messageEl.innerText = "It's a Tie!!!";
    } else if (winner) {
      messageEl.innerHTML = `<span class="${COLORS[winner]}">${COLORS[winner].toUpperCase()}</span> wins!`;
    } else { // game is in play
      messageEl.innerHTML = `<span class="${COLORS[turn]}">${COLORS[turn].toUpperCase()}</span>'s Turn`;
    }
  }

  function renderControls() {
    // Hids and shows the play again btn
    playAgainBtn.style.visibility = winner ? 'visible' : 'hidden';
  }