/*----- constants -----*/ 
const PLAYERS = { 
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

/*----- Winning combos - based on indexes -----*/
const winCombos = [
  // Row 0 winner = coordinates [0, 0][0, 1] [0, 2] need to be occupied (cellVal)
  [[0, 0], [0, 1], [0, 2]], 
  [[1, 0], [1, 1], [1, 2]], // Row 1
  [[2, 0], [2, 1], [2, 2]], // Row 2
  [[0, 0], [1, 0], [2, 0]], // Column 0
  [[0, 1], [1, 1], [2, 1]], // Column 1
  [[0, 2], [1, 2], [2, 2]], // Column 2
  [[0, 0], [1, 1], [2, 2]], // Diagonal - top-left to bottom-right)
  [[0, 2], [1, 1], [2, 0]], // Diagonal - top-right to bottom-left)
];

/*----- event listeners -----*/ 
document.getElementById('board').addEventListener('click', squareClick); // Don't invoke as it doesn't return anything   
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
  winner = null; // resets to no winner
  render();
}

// Visualize all state in the DOM
function render() {
    renderBoard();
    renderMessage(); // Changes who's turn it is in the header
    renderControls(); // Show/hide play again button
  }

// The game event handler  
function squareClick(evt) {
  const { id } = evt.target; 
  const colIdx = parseInt(id.charAt(1)); // converts the column num of the # into a number 
  const rowIdx = parseInt(id.charAt(3)); // converts the row num of the # into a number

  if (board[colIdx][rowIdx] || winner) { // if cellVal is occupied exit
    return;  
  }

  board[colIdx][rowIdx] = turn; // assigns the cellVal to the cur player's turn
  getWinner(colIdx, rowIdx); 
  turn *= -1; // Changes turns
  render();
}

// Check for winner in board 
// Return null if no winner, 1/-1 if a player has won, 'T' if tie
function getWinner(colIdx, rowIdx) { 
  let remainingTiles = 0; // for a tie
  board.forEach(function (colArr) {
    colArr.forEach(function (cellVal) {
      if (!cellVal) {
        remainingTiles += 1; // if empty, increment remainingTiles
      }
    });
  });
  
  if (!remainingTiles) {
    winner = 'T'; // if remainingTiles is 0, it is a tie
    return;
  }

  for (let i = 0; i < winCombos.length; i++) {
    const combo = winCombos[i];
    const [a, b, c] = combo; // co-ord of the winning combo
    const [aCol, aRow] = a; 
    const [bCol, bRow] = b;
    const [cCol, cRow] = c;

    const total = // sum of the values in three cells  
      board[aCol][aRow] +
      board[bCol][bRow] +
      board[cCol][cRow] ;

    // will only equal 3 if each cellVal is the same eg occupied by the same player
    if (total === 3 || total === -3) { 
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
        cellEl.innerHTML = '<img src="https://i.imgur.com/yJ1GeT3.png" alt="x">';
        const img = cellEl.querySelector('img');
        img.classList.add('img');
        cellEl.classList.add('x');
        cellEl.classList.remove('unplayed');
      } else if (cellVal === -1) {
        cellEl.innerHTML = '<img src="https://i.imgur.com/gpys90t.png" alt="o">';
        const img = cellEl.querySelector('img');
        img.classList.add('img');
        cellEl.classList.add('o');
        cellEl.classList.remove('unplayed');
      } else if (cellVal === 'T') {
        cellEl.innerHTML = 'T';
      } else {
        cellEl.innerHTML = ''; // Clear the cell content
        cellEl.classList.add('unplayed');
      }
    });
  });
}

function renderMessage() { // Updates <h2> based on winner
    if (winner === 'T') {
      messageEl.innerText = "It's a Tie!!!";
    } else if (winner) {
      messageEl.innerHTML = `<span class="${PLAYERS[winner]}">${PLAYERS[winner].toUpperCase()}</span> wins!`;
      const h2Message = messageEl.querySelector('span');
      h2Message.classList.remove('x');
      h2Message.classList.remove('o');
    } else { // game is in play
      messageEl.innerHTML = `<span class="${PLAYERS[turn]}">${PLAYERS[turn].toUpperCase()}</span>'s Turn`;
      const h2Message = messageEl.querySelector('span');
      h2Message.classList.remove('x');
      h2Message.classList.remove('o');
    }
  }

  function renderControls() { // Hides and shows the play again btn
    playAgainBtn.style.visibility = winner ? 'visible' : 'hidden';
  }