let turnNumber = 1;
const winConfigurations = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];

/*
123
456
789
*/

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
                didPlayerWin(playerOBoxes);
            }                
            else
            {
                selectedBox.innerHTML = "X";
                playerXBoxes.push(i);
                didPlayerWin(playerXBoxes);
            }  
            console.log(playerOBoxes);
            console.log(playerXBoxes) 
            turnNumber++;
        }      
    })
}

let isBoxOpen = function(selectedBox)
{
	return (selectedBox.innerHTML !== "X" && selectedBox.innerHTML !== "O");
}

function didPlayerWin(boxArray)
{
    let winPositions = 0;
    winConfigurations.forEach(array => {
        for (let i = 0; i < 3; i ++)
        {
            if (boxArray.indexOf(array[i]) !== -1)
                winPositions = winPositions + 1;
        }

        if (winPositions === 3)
            console.log("Winner!!");
        else
            winPositions = 0;
    })
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
