let turnNumber = 1;

for (let i = 1; i < 10; i++)
{
    let selectedBox =  document.querySelector(`#box-${i}`);
    selectedBox.addEventListener("click", () => {
        if (turnNumber % 2 === 0) 
            selectedBox.innerHTML = "O";
        else
            selectedBox.innerHTML = "X";
        turnNumber++;
    })
}


