const narrationBox = document.querySelector("#narration");
const winConfigurations = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];

let turnNumber = 1;
let playerOBoxes = [];
let playerXBoxes = [];

let modal = document.querySelector(".modal");
let message = document.querySelector("#winning-msg");
let span = document.getElementsByClassName("close")[0];

let btnPlayAgainYes =  document.querySelector("#btn-yes");
let btnPlayAgainNo =  document.querySelector("#btn-no");
let newGame =  document.querySelector("#new-game");
let isGameOver = false;

for (let i = 1; i < 10; i++)
{
    let selectedBox =  document.querySelector(`#box-${i}`);
    selectedBox.addEventListener("click", () => {
        if (isBoxOpen(selectedBox) && !(isGameOver))
        {
            if (turnNumber % 2 === 0)
            {
                selectedBox.innerHTML = "O";
                playerOBoxes.push(i);
                if (didPlayerWin(playerOBoxes) == true)
                {
                    message.innerHTML = "Team O won! <br> Play again?";
                    modal.style.display = "block";
                    isGameOver = true;
                }
                narrationBox.innerHTML = "Current Turn: X";
            }                
            else
            {
                selectedBox.innerHTML = "X";
                playerXBoxes.push(i);

                if (didPlayerWin(playerXBoxes) == true)
                {
                    message.innerHTML = "Team X won! <br> Play again?";
                    modal.style.display = "block";
                    isGameOver = true;
                }
                narrationBox.innerHTML = "Current Turn: O";
            }           

            turnNumber++;

            if (turnNumber === 10 && !(isGameOver))
            {
                message.innerHTML = "It's a draw! <br> Play again?";
                modal.style.display = "block";
            }
        }      
    })
}

let isBoxOpen = function(selectedBox)
{
	return (selectedBox.innerHTML !== "X" && selectedBox.innerHTML !== "O");
}

let didPlayerWin = function(boxArray)
{
    let winPositions = 0;
    let playerWon = false;
    winConfigurations.forEach(array => 
    {
        for (let i = 0; i < 3; i ++)
        {
            if (boxArray.indexOf(array[i]) !== -1)
                winPositions = winPositions + 1;
        }

        if (winPositions === 3)
            playerWon = true;       

        winPositions = 0;

    })
    return playerWon;
}

function resetGame()
{
    turnNumber = 1;
    playerOBoxes = [];
    playerXBoxes = [];

    for (let i = 1; i < 10; i++)
    {
        document.querySelector(`#box-${i}`).innerHTML = "";
    }

    isGameOver = false;
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

btnPlayAgainYes.addEventListener("click", () => {
    resetGame();
    modal.style.display = "none";
})

btnPlayAgainNo.addEventListener("click", () => {
    isGameOver = true;
    modal.style.display = "none";
})

newGame.addEventListener("click", () => {
    resetGame();
})