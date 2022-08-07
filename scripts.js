const cellElements = document.querySelectorAll("[data-cell]");
const boardElement = document.querySelector("[data-board]");
const winningMassageTextElement = document.querySelector(
  "[data-winning-massage-text]"
);
const winningMassage = document.querySelector("[data-winning-massage]");
const restartButton = document.querySelector("[data-button]");

let isCircleTurn;

const winningGameCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 4, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const startGame = () => {
  isCircleTurn = false;
  for (const cell of cellElements) {
    cell.classList.remove("circle");
    cell.classList.remove("x");
    cell.removeEventListener("click", handdleClick);
    cell.addEventListener("click", handdleClick, { once: true });
  }

  setBoardHoverClass();
  winningMassage.classList.remove("show-winning-massage");
};

const endGame = (isDraw) => {
  if (isDraw) {
    winningMassageTextElement.innerText = "Empate!";
  } else {
    winningMassageTextElement.innerText = isCircleTurn
      ? "O Ganhou!"
      : "X Ganhou!";
  }

  winningMassage.classList.add("show-winning-massage");
};

const checkForWin = (currentPlayer) => {
  return winningGameCombinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
};

const checkForDraw = () => {
  return [...cellElements].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("circle");
  });
};

const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
};

const setBoardHoverClass = () => {
  boardElement.classList.remove("x");
  boardElement.classList.remove("circle");

  if (isCircleTurn) {
    boardElement.classList.add("circle");
  } else {
    boardElement.classList.add("x");
  }
};

const swapTurns = () => {
  isCircleTurn = !isCircleTurn;

  setBoardHoverClass();
};

const handdleClick = (e) => {
  // Colocar a marca (X ou circulo)
  const cell = e.target;
  const classToAdd = isCircleTurn ? "circle" : "x";

  placeMark(cell, classToAdd);

  //  Verificar por vitoria
  const isWin = checkForWin(classToAdd);

  // verificar por empate
  const isDraw = checkForDraw();
  if (isWin) {
    endGame(false);
  } else if (isDraw) {
    endGame(true);
  } else {
    // mudar simbolo
    swapTurns();
  }
};

startGame();

restartButton.addEventListener("click", startGame);
