console.log('working')
/*----- constants -----*/ 
const COLORS = {
    // 'null': '#1035da', 
    '1': 'x',
    '-1': 'o',
  };
  
/*----- state variables -----*/ 
let board; // board array
let turn;
let winner; // null = no winner; 1 or -1 = winner; 'T' = tie;

/*----- cached elements  -----*/ 
const messageEl = document.querySelector('h2');

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

function renderBoard() {
    board.forEach(function(colArr, colIdx) {
        colArr.forEach(function(cellVal, rowIdx){ // Iterate through current column
            const cellId = `c${colIdx}r${rowIdx}`;
            const cellEl = document.getElementById(cellId);
            if (cellVal === 1) {
                cellEl.classList.add('x');
            } else if (cellVal === -1) {
                cellEl.classList.add('o');
            } else if (cellVal === 'T') {
                cellEl.classList.add('tie');
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

}



