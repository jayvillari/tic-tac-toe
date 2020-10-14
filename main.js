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

let isOpponentComputer = true;
let isComputersMove = false;

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

                if (isOpponentComputer)
                    isComputersMove = false;
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
                
                if (isOpponentComputer)
                    isComputersMove = true;
            }           

            turnNumber++;

            if (turnNumber === 10 && !(isGameOver))
            {
                message.innerHTML = "It's a draw! <br> Play again?";
                modal.style.display = "block";
            }

            if (isComputersMove)
            {
                /* returns all possible winning configurations that are still open to the computer */
                let possibleWins = winConfigurations.filter(function(winConfiguration){
                    if (!playerXBoxes.some(r=> winConfiguration.includes(r)))
                    {
                        return winConfiguration;
                    }
                })

                let computerChoice = calculateNextMove(possibleWins);
                if (computerChoice !== 0)
                {
                    setTimeout(function(){ document.querySelector(`#box-${computerChoice}`).click(); }, 500);  
                }
                            
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

    narrationBox.innerHTML = "Current Turn: X";
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

function calculateNextMove(possibleWinConfigurations)
{
    let nextMove = 0;

    /* computer plays offensively */
    if (playerXBoxes.length === 1)
    {
        possibleWinConfigurations.forEach(possibleWin => {
            possibleWin.forEach(element => {
                if (isBoxOpen(document.querySelector(`#box-${element}`)) && nextMove === 0)
                    nextMove = element;
            })
        })
    }
    else /* computer plays defensively unless there is no imminent win */
    {
        let winPositions = 0;

        winConfigurations.forEach(array => 
        {
            let tempArray = array.slice();
            for (let i = 0; i < 3; i++)
            {
                if (playerXBoxes.indexOf(array[i]) !== -1) /* if player X has marked that spot */
                {
                    winPositions = winPositions + 1;
                    let index = tempArray.indexOf(array[i]);
                    tempArray.splice(index, 1); 
                }
            } 

            if (winPositions === 2 && playerOBoxes.indexOf(tempArray[0]) == -1)
            {
                nextMove = tempArray[0];
            }    
            winPositions = 0;
        })
    }

    /* if no clear advantage for a position is found choose available open position */
    if (nextMove === 0 || !isBoxOpen(document.querySelector(`#box-${nextMove}`)))
    {  
        for (let i = 0; i < 10; i++)
        {
            if (playerXBoxes.indexOf(i) === -1 && playerOBoxes.indexOf(i) === -1)
            {
                nextMove = i;
            }

        }
    }
        
    return nextMove;
}