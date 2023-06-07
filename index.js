
let grid = [["0", "0", "0"], ["0", "0", "0"], ["0", "0", "0"]]
let playerOne = {
    score: 0,
    marker: "X"
}
let playerTwo = {
    score: 0,
    marker: "O"
}
let currentPlayer = 1;

function returnWinnerPlay(sum) {
    let winner = {
        val: -1,
        isFound: false
    }
    if (sum == "111")
        winner = {
            val: 1,
            isFound: true
        }
    else if (sum == "222")
        winner = {
            val: 2,
            isFound: true
        }
    return winner;
}
function clearGrid(){
    setTimeout(() => {
        var paras = document.getElementsByClassName('text-x');

        while (paras[0]) {
            paras[0].parentNode.removeChild(paras[0]);
        }
    }, 500)
}
function resetGrid(winner) {
    clearGrid();
    if (winner.val == 1) {
        playerOne.score += 1
        document.getElementById("player-one-score").textContent = playerOne.score
    } else if (winner.val == 2) {
        playerTwo.score += 1
        document.getElementById("player-two-score").textContent = playerTwo.score

    }

}
function redrawGrid() {
    clearGrid();
    playerOne.score = 0;
    playerTwo.score = 0;
    document.getElementById("player-one-score").textContent = 0
    document.getElementById("player-two-score").textContent = 0

}
function checkWinningComb() {
    //check in col
    let winner = {
        val: -1,
        isFound: false
    }
    for (let index = 0; index < grid.length; index++) {
        const element = grid[index];
        let sum = element.reduce((sum, num) => sum + num, "");
        // debugger;
        winner = returnWinnerPlay(sum)
        if (winner.isFound) {
            grid = [["0", "0", "0"], ["0", "0", "0"], ["0", "0", "0"]]
            resetGrid(winner);
            return;
        }

    }

    //row
    const numRows = grid.length;
    const numCols = grid[0].length;

    for (let col = 0; col < numCols; col++) {
        let sum = "";
        for (let row = 0; row < numRows; row++) {
            sum += grid[row][col];
        }
        winner = returnWinnerPlay(sum)
        if (winner.isFound) {
            grid = [["0", "0", "0"], ["0", "0", "0"], ["0", "0", "0"]]
            resetGrid(winner);

            return;
        }
    }

    //diagnol
    winner = returnWinnerPlay(grid[0][0] + grid[1][1] + grid[2][2])
    if (winner.isFound) {
        grid = [["0", "0", "0"], ["0", "0", "0"], ["0", "0", "0"]]
        resetGrid(winner);
        return;
    }
    winner = returnWinnerPlay(grid[0][2] + grid[1][1] + grid[2][0])
    if (winner.isFound) {
        grid = [["0", "0", "0"], ["0", "0", "0"], ["0", "0", "0"]]
        resetGrid(winner);
        return;
    }



}


document.addEventListener('click', async function (e) {
    e = e || window.event;
    let target = e.target;
    console.log(target.id);
    if (target && target.id == "reset-box") {
        redrawGrid();
        return;
    }
    if (target && target.id) {
        const idArry = target.id.split("-");//tile-1===> ['tile','1'];
        if (idArry.length == 2) {
            let index = parseInt(idArry[1]);
            // debugger
            if (grid[Math.floor(index / 3)][index % 3] != 0) {
                return;
            }
            grid[Math.floor(index / 3)][index % 3] = JSON.stringify(currentPlayer);
            let node = document.createElement('p');
            node.className = "text-x"
            if (currentPlayer == 1) {

                node.textContent = playerOne.marker

                currentPlayer = 2;
            }
            else {
                node.textContent = playerTwo.marker
                currentPlayer = 1;

            }
            document.getElementById(e.target.id).appendChild(node);
            checkWinningComb()


        }

    }
    // debugger
}, false);