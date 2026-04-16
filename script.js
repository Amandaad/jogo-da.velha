const statusText = document.getElementById("status");
const cells = document.querySelectorAll(".cell");
const scoreX = document.getElementById("score-x");
const scoreO = document.getElementById("score-o");
const scoreDraw = document.getElementById("score-draw");
const restartRoundButton = document.getElementById("restart-round");
const restartAllButton = document.getElementById("restart-all");

const players = {
  X: {
    name: "boneco 1",
    image:
      "https://www.bing.com/th/id/OIP.dOCuLsEG3oWXrY6kRwMviwHaHa?w=177&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
  },
  O: {
    name: "boneco 2",
    image:
      "https://s2-techtudo.glbimg.com/vn4VHj0PxdDjE4gxm0_MLODXwhw=/0x0:1280x720/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2025/5/L/A8kQksTr2mZGuE9ZAZBw/tralalero.png",
  },
};

const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let board = Array(9).fill("");
let currentPlayer = "X";
let isGameActive = true;
let scoreboard = {
  X: 0,
  O: 0,
  draw: 0,
};

function updateStatus(message = `Vez do ${players[currentPlayer].name}`) {
  statusText.textContent = message;
}

function updateScoreboard() {
  scoreX.textContent = scoreboard.X;
  scoreO.textContent = scoreboard.O;
  scoreDraw.textContent = scoreboard.draw;
}

function checkWinner() {
  for (const pattern of winningPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  if (board.every((cell) => cell !== "")) {
    return "draw";
  }

  return null;
}

function handleCellClick(event) {
  const cell = event.currentTarget;
  const index = Number(cell.dataset.index);

  if (!isGameActive || board[index]) {
    return;
  }

  board[index] = currentPlayer;
  cell.innerHTML = `<img src="${players[currentPlayer].image}" alt="${players[currentPlayer].name}">`;

  const result = checkWinner();

  if (result === "X" || result === "O") {
    scoreboard[result] += 1;
    updateScoreboard();
    updateStatus(`${players[result].name} venceu!`);
    isGameActive = false;
    disableBoard();
    return;
  }

  if (result === "draw") {
    scoreboard.draw += 1;
    updateScoreboard();
    updateStatus("Deu velha!");
    isGameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateStatus();
}

function disableBoard() {
  cells.forEach((cell) => {
    cell.disabled = true;
  });
}

function enableBoard() {
  cells.forEach((cell) => {
    cell.disabled = false;
  });
}

function resetBoard() {
  board = Array(9).fill("");
  currentPlayer = "X";
  isGameActive = true;
  cells.forEach((cell) => {
    cell.innerHTML = "";
    cell.disabled = false;
  });
  updateStatus();
}

function resetAll() {
  scoreboard = {
    X: 0,
    O: 0,
    draw: 0,
  };
  updateScoreboard();
  resetBoard();
}

cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});

restartRoundButton.addEventListener("click", resetBoard);
restartAllButton.addEventListener("click", resetAll);

updateScoreboard();
updateStatus();
