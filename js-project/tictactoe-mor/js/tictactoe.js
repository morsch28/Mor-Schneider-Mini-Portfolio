 
 const boardArr = [
    [" "," "," "],
    [" "," "," "],
    [" "," "," "],
    ];

let player = "X";
let playerScore = 0;
let computerScore = 0;
let round = 1;
let lineIndicator = {row: null, col: null, diagonal: null};
let moves = 0;
let numberOfCells = boardArr.length * boardArr[0].length;
let panding = false;
let emptyCells = {row: null,col: null};
let update = false;
let elementToBlur = ["box","table"];

for(let i = 0; i < boardArr.length; i++){
    for(let j = 0; j < boardArr[i].length; j++){
        let cell = document.createElement("div");
        cell.className = "cell";
        document.getElementById("inbox").appendChild(cell);
        cell.onclick = function(){
            if(panding || update){
                return;
            }
            if(boardArr[i][j] != " "){
                alert('Please choose empty cell!');
                return;
            }
            //תור השחקן האנושי
            cell.innerHTML = player;
            boardArr[i][j] = player;
            moves++;
            if(existWin(player)){
                    onWin(player);
                    return;
            }
           switchPlayer();
           if(player == "O"){
              panding = true;
              setTimeout(()=>{
              computer();
              switchPlayer();
              panding = false;
              },500);
           }

           if(moves == numberOfCells){
                fullBoard();
           }
            
        }
    } 
}



function checkWin(player){
    lineIndicator = {row: null, col: null, diagonal: null};
    for(let i=0; i<boardArr.length; i++){
        if(boardArr[i][0] === player && boardArr[i][1] === player && boardArr[i][2] === " " ){
            updateEmptyCells(i,2);
            lineIndicator.row  = i;
            return true;
        }
        else if(boardArr[i][0] === player && boardArr[i][1] === " " && boardArr[i][2] === player){
            updateEmptyCells(i,1);
            lineIndicator.row  = i;
            return true;
        }
        else if(boardArr[i][0] === " " && boardArr[i][1] === player  && boardArr[i][2] === player){
            updateEmptyCells(i,0);
            lineIndicator.row  = i;
            return true;
        }
        if(boardArr[0][i] === player && boardArr[1][i] === player && boardArr[2][i] === " " ){
            updateEmptyCells(2,i);
            lineIndicator.col  = i;
            return true;
        }
        else if(boardArr[0][i] === player && boardArr[1][i] === " " && boardArr[2][i] === player ){
            updateEmptyCells(1,i);
            lineIndicator.col  = i;
            return true;
        }
        else if(boardArr[0][i] === " " && boardArr[1][i] === player && boardArr[2][i] === player ){
            updateEmptyCells(0,i);
            lineIndicator.col  = i;
            return true;
        }
       }
        if(boardArr[0][0] === player && boardArr[1][1] === player && boardArr[2][2] === " " ){
            updateEmptyCells(2,2);
            lineIndicator.diagonal = "main";
            return true;
        }
        else if(boardArr[0][0] === player && boardArr[1][1] === " " && boardArr[2][2] === player ){
            updateEmptyCells(1,1);
            lineIndicator.diagonal = "main";
            return true;
        }
        else if(boardArr[0][0] === " " && boardArr[1][1] === player && boardArr[2][2] === player ){
            updateEmptyCells(0,0);
            lineIndicator.diagonal = "main";
            return true;
        }
        if(boardArr[0][2] === player && boardArr[1][1] === player && boardArr[2][0] ===  " " ){
            updateEmptyCells(2,0);
            lineIndicator.diagonal = "scondary";
           return true;
        }
        else if(boardArr[0][2] === player && boardArr[1][1] === " " && boardArr[2][0] ===  player ){
            updateEmptyCells(1,1);
            lineIndicator.diagonal = "scondary";
            return true;
        }
        else if(boardArr[0][2] === " " && boardArr[1][1] === player && boardArr[2][0] ===  player ){
            updateEmptyCells(0,2);
            lineIndicator.diagonal = "scondary";
           return true;
        }
    
    return false;
}


function updateEmptyCells(emptyRow,emptyCol){
    emptyCells.row = emptyRow;
    emptyCells.col = emptyCol;
}


function existWin(player){
    lineIndicator = {row: null, col: null, diagonal: null};
    for(let i=0; i<boardArr.length; i++){
        if(boardArr[i][0] === player && boardArr[i][1] === player && boardArr[i][2] === player ){
            lineIndicator.row  = i;
            return true;
        }
        if(boardArr[0][i] === player && boardArr[1][i] === player && boardArr[2][i] === player ){
            lineIndicator.col  = i;
            return true;
        }
        if(boardArr[0][0] === player && boardArr[1][1] === player && boardArr[2][2] === player ){
            lineIndicator.diagonal = "main";
            return true;
        }
        [boardArr[0,2],boardArr[1,1],boardArr[2,0]].forEach(cell =>{
            if(cell == player){
                lineIndicator.diagonal = "scondary";
                return true;
            }
        })
        if(boardArr[0][2] === player && boardArr[1][1] === player && boardArr[2][0] ===  player ){
            lineIndicator.diagonal = "scondary";
           return true;
        }
    }
    return false;
}


function computer(){
    let i;
    let j;
    // בדיקה אם למחשב יש סיכוי לנצח ואם כן לעשות את המהלך
    if(checkWin("O")){
        i = emptyCells.row;
        j = emptyCells.col;
        blockOrWinTheEnemy(i,j);
        moves++;
        onWin("O");
        return;
    }
    //בדיקה אם לשחקן האנושי יש סיכוי לנצח ואם כן המחשב חוסם אותו
    if(checkWin("X")){
        i = emptyCells.row;
        j = emptyCells.col
        blockOrWinTheEnemy(i,j);
        boardArr[i][j] = "O";
        moves++;
        return;
    }

    // בדיקת תאים פנויים ומהלך רנדומלי של המחשב
    let availbleMove = [];
    for(let i=0; i<boardArr.length; i++){
        for(let j=0; j<boardArr[i].length; j++){
            if(boardArr[i][j] == " "){
                availbleMove.push({row: i, col: j});
            }
        }
    }
    if(availbleMove.length > 0){
        let randomMove = availbleMove[Math.floor(Math.random()*availbleMove.length)];
        i = randomMove.row;
        j = randomMove.col;
        blockOrWinTheEnemy(i,j);
        moves++;
    }
}


function blockOrWinTheEnemy(row,col){
    boardArr[row][col] = "O";
    document.getElementsByClassName("cell")[row*3 + col].innerHTML = "O";
}


function switchPlayer(){
    player = player == "X" ? "O" : "X";
}


function fullBoard(){
    setTimeout(()=>{
        clearBoard()
        updateTable("תיקו")
    },1000)

}


function onWin(player){
    update = true;
    // copyLineIndicator = lineIndicator;
    setTimeout(() =>{
        drawLine()
    },500);
    setTimeout(() => {
        clearBoard()
        updateTable(player)
        update  = false;
    },1000);
}


function openModal(player){
    let modal = document.getElementById("modal");
    modal.classList.add("modalA");
    let winner = document.getElementById("winner");
    if(player == "תיקו"){
        winner.innerHTML = `${player}`;
    }
    else{
        winner.innerHTML = `שחקן ${player} <br> <span class="win-text">ניצח!</span>`;
    }
    elementToBlur.forEach(id => document.getElementById(id).classList.add("blur"));

    document.addEventListener("keyup", event => {
        if (event.key == "Enter"){
            closeModal();
        }
    });
    document.addEventListener("click", () => { 
            closeModal();    
    });
}


function closeModal(){
    modal.classList.remove("modalA");
    elementToBlur.forEach(id => document.getElementById(id).classList.remove("blur"));
    window.location.reload();
}

function resetGame(){
    let resetId = ["tableBody","computer","player"];
    resetId.forEach(id => document.getElementById(id).innerHTML = id == "tableBody" ? " " : 0);
    lineIndicator = {row: null, col: null, diagonal: null};
    moves = 0;
    playerScore = 0;
    computerScore = 0;
}


function clearBoard(){
    for(let i=0; i<boardArr.length; i++){
        for(let j=0; j<boardArr[i].length; j++){
            if(boardArr[i][j] !== " "){
                boardArr[i][j] = " ";
                document.getElementsByClassName("cell")[i*3 + j].innerHTML = " ";
            }
        }
    }
    moves = 0;
    resetLine(); 
}


function updateTable(player){
    let numOfGame = 3;
    document.getElementById("tableBody").innerHTML += `
        <tr>
            <td>${round}</td>
            <td>${player == "O"?"V": " "}</td>
            <td>${player == "X"?"V" : " "}</td>
        </tr>
    `;
    player == "X" ? playerScore++ : computerScore++;
    let updateScores = ["computer","player"];
    updateScores.forEach(id => document.getElementById(id).innerHTML = id == "player" ? playerScore : computerScore);
    if(numOfGame == round){
        round  = 1;
        setTimeout(() => {
            if(playerScore == computerScore){
                openModal("תיקו");
            }
            else{
                playerScore > computerScore ? openModal("X") : openModal("O");
            }

        },1000); 
    }
     round++;   
   
}


function drawLine(){
    let line = document.getElementById("line");
    line.style.display = "block";  

    // lineIndicator.diagonal = "scondary";

    if(lineIndicator.diagonal == "main"){
        line.style.transform = "rotate(45deg)";
        line.style.width = "420px";
    }
    else if(lineIndicator.diagonal == "scondary"){
        line.style.transform = "rotate(135deg)";
        line.style.width = "420px";
    }
    else if(lineIndicator.row == 0){
        line.style.top = "18%";
    }
    else if(lineIndicator.row == 1){
        line.style.top = "50%";
    }
    else if(lineIndicator.row == 2){
        line.style.bottom = "18%";
    }
    else if(lineIndicator.col == 0){
        line.style.transform = "rotate(90deg)";
        line.style.right = "35%";
    }
    else if(lineIndicator.col == 1){
        line.style.transform = "rotate(90deg)";
    }
    else if(lineIndicator.col == 2){
        line.style.transform = "rotate(90deg)";
        const screanWidth = Number(window.screen.width);
        screanWidth > 786 ? line.style.left = "36%" : line.style.left = "36%";
    }
    setTimeout(()=>{
        line.style.display = "none";
    },1000)
}



function resetLine(){
    let removeProperty = ["transform","top","left","width"];
    let line = document.getElementById("line");
    line.style.display = "none";
    removeProperty.forEach(prop => line.style.removeProperty(prop));
}
