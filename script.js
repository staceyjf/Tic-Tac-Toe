console.log('working')
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
const markerEls = [...document.querySelectorAll('#markers > div')]; 

/*----- Winning combo 1 # winOptR1-----*/
const winOptR1 = [ 
    [1, 1, 1], // col 0
    [null, null, null], // col 1
    [null, null, null], // col 2
  ];
/*----- Winning combo 2 # winOptR2-----*/
  const winOptR2 = [ 
    [null, null, null], // col 0
    [1, 1, 1], // col 1
    [null, null, null], // col 2
  ];
/*----- Winning combo 3 # winOptR3-----*/
  const winOptR3 = [ 
    [null, null, null], // col 0
    [null, null, null], // col 1
    [1, 1, 1], // col 2
  ];
/*-----Winning combo 1 # winOptC1-----*/
  const winOptC1 = [ 
   [-1, null, null], // col 0
    [-1, null, null], // col 1
    [-1, null, null], // col 2
  ];
/*----- Winning combo 1 # winOptC2-----*/
  const winOptC2 = [ 
   [null, -1, null], // col 0
    [null, -1, null], // col 1
    [null, -1, null], // col 2
  ];
/*----- Winning combo 1 # winOptC3-----*/
  const winOptC3 = [ 
   [null, null, -1], // col 0
    [null, null, -1], // col 1
    [null, null, -1], // col 2
  ];
/*----- Winning combo 1 # winOptNESW-----*/
  const winOptNESW = [ 
   [1, null, null], // col 0
    [null, 1, null], // col 1
    [null, null, 1], // col 2
  ];
/*----- Winning combo 1 # winOptNWSE-----*/
  const winOptNWSE = [ 
   [null, null, -1], // col 0
    [null, -1, null], // col 1
    [-1, null, null], // col 2
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
    renderBoard()
    renderMessage() // Changes who's turn it is in <H2>
    renderControls() // show/hide markers/play again button
  }

// In response to user interaction, update all impacted
// state, then call render();
function handleDrop(evt) {
  const { id } = evt.target;
  const colIdx = parseInt(id.charAt(1));
  const rowIdx = parseInt(id.charAt(3));

  // Check if the cell is already played or if there's a winner
  if (board[colIdx][rowIdx] || winner) {
    return;
  }

  // Update the board with the player's marker
  board[colIdx][rowIdx] = turn;

  // Check for a winner
  winner = getWinner(colIdx, rowIdx);

  // Toggle the turn between players
  turn *= -1;

  // Render the updated state
  render();
}

// Check for winner in board state
// Return null if no winner, 1/-1 if a player has won, 'T' if tie
function getWinner(colIdx, rowIdx) {
  // // Check for a tie
  // let remainingTiles = 0;
  // board.forEach(function(colArr) {
  //   if (!colArr[2]) remainingTiles += 1;
  // })
  // if (!remainingTiles) return 'T';
  // return checkVerticalWin(colIdx, rowIdx) ||
  //   checkHorizontalWin(colIdx, rowIdx) ||
  //   checkDiagonalWinNESW(colIdx, rowIdx) ||
  //   checkDiagonalWinNWSE(colIdx, rowIdx);
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