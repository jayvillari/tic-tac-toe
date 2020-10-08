const narrationBox = document.querySelector("#narration");
const winConfigurations = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];

let turnNumber = 1;
let playerOBoxes = [];
let playerXBoxes = [];

for (let i = 1; i < 10; i++)
{
    let selectedBox =  document.querySelector(`#box-${i}`);
    selectedBox.addEventListener("click", () => {
        if (isBoxOpen(selectedBox))
        {
            if (turnNumber % 2 === 0)
            {
                selectedBox.innerHTML = "O";
                playerOBoxes.push(i);
                if (didPlayerWin(playerOBoxes) == true)
                {
                    narrationBox.innerHTML = "Team O won!";
                    resetGame();
                }
                narrationBox.innerHTML = "Current Turn: X";
            }                
            else
            {
                selectedBox.innerHTML = "X";
                playerXBoxes.push(i);

                if (didPlayerWin(playerXBoxes) == true)
                {
                    narrationBox.innerHTML = "Team X won!";
                    resetGame();
                }
                narrationBox.innerHTML = "Current Turn: O";
            }  
            turnNumber++;
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
}
