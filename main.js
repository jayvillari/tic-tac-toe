//////////////////////////////////////////////////////////////
/// Tic Tac Toe game that allows you to either play against a 
/// friend or an artifically intelligent computer.
//////////////////////////////////////////////////////////////

/* Declare constants: narration box for messages  
and configurations that win tic tac toe */
const narrationBox = document.querySelector("#narration");
const winConfigurations = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];

/* Declate turn number and array
variables to hold players choices */
let turnNumber = 1;
let playerOBoxes = [];
let playerXBoxes = [];

/* Declare variables for DOM  
elements related to the modal pop-ups */
let modal = document.querySelector(".modal");
let welcomeModal = document.querySelector(".welcome-modal");
let message = document.querySelector("#winning-msg");
let span = document.getElementsByClassName("close")[0];

/* Declare variables for button DOM elements */
let btnPlayAgainYes =  document.querySelector("#btn-yes");
let btnPlayAgainNo =  document.querySelector("#btn-no");
let btnFriend =  document.querySelector("#btn-friend");
let btnComputer =  document.querySelector("#btn-cpu");
let newGame =  document.querySelector("#new-game");

/* Create boolean variables to keep track of whether 
the game is over, whether the player choose to play
with a friend or computer, and whether it is the computer's
move or not */
let isGameOver = false;
let isOpponentComputer = false;
let isComputersMove = false;

/* Display welcome message and add event listeners to the 
friend and computer buttons to set the boolean that keeps
track of whether the player chooses to play with a friend 
or computer */
welcomeModal.style.display = "block";
btnFriend.addEventListener("click", () => {
    isOpponentComputer = false;
    welcomeModal.style.display = "none";
})
btnComputer.addEventListener("click", () => {
    isOpponentComputer = true;
    welcomeModal.style.display = "none";
})

/* Create variables for each of the tic tac toe 
box DOM elements and add event listeners for when
the player clicks on the box. Each time a click
event happens it determines which players turn it is
and which box they clicked. If it is unclicked and the 
game is still over, it determines if that resulted in a win
and then increments the turn counter */
for (let i = 1; i < 10; i++)
{
    let selectedBox =  document.querySelector(`#box-${i}`);
    selectedBox.addEventListener("click", () => {
        if (isBoxOpen(selectedBox) && !(isGameOver))
        {
            if (turnNumber % 2 === 0) /* It is Player 2 or the Computer's turn */
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
            else                        /* It is Player 1's turn */          
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

            if (turnNumber === 10 && !(isGameOver)) /* Check if the game is over and it is a draw */  
            {
                message.innerHTML = "It's a draw! <br> Play again?";
                modal.style.display = "block";
            }

            if (isOpponentComputer && isComputersMove) /* Check if opponent is Computer and if it is the Computer's move */  
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

/* check if a selected box is already taken by  
checking if the innerHTML contains an X or O */
let isBoxOpen = function(selectedBox)
{
	return (selectedBox.innerHTML !== "X" && selectedBox.innerHTML !== "O");
}

/* check if the player won by going through each
win configuration and seeing if the elements in 
the player has chosen match */
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

/* resets the game by setting the turn number back to 1
and clearing each of the players boxes */
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
    isOpponentComputer = false;
    welcomeModal.style.display = "block";
}

/* closes the modal pop-up */
span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

/* adds event listener for the yes and no buttons in the
modal popup to either reset the game and close the pop-up
or mark the game as over and close pop-up */
btnPlayAgainYes.addEventListener("click", () => {
    resetGame();
    modal.style.display = "none";
})

btnPlayAgainNo.addEventListener("click", () => {
    isGameOver = true;
    modal.style.display = "none";
})

/* adds event listener to the reset button to reset game
if clicked */
newGame.addEventListener("click", () => {
    resetGame();
})

/* uses the win configurations that are still possibly available
to calulate the computers next move */
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