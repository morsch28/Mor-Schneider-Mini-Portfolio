 
 let rows = 6;
 let cols = 7;
 let boardGame = [];

 //יצירת מערך דו ממדי
 for(let i=0; i<rows; i++){
    boardGame[i] = [];
    for(let j=0; j<cols; j++){
        boardGame[i][j] = " ";
    }
 }

 let currplayer = "red";
 let computerPlayer = "yellow";
 let userPlayer = "red";
 let numOfMoves = 0;
 let maxOfMoves = boardGame.length * boardGame[0].length;
 let winningCell = [];
 let rowsIndicate = [5,5,5,5,5,5,5];//מערך עמודות שמעתעדכן לפי השורה הפנויה
 let panding = false;
 let stopGame = false;

 // יצירת לוח המשחק
 function creatBoardGame(){
    for(let i = 0 ; i < boardGame.length; i++){
        for(let j = 0; j < boardGame[i].length ; j++){
            let cell = document.createElement("div");
            cell.className = "colors";
            document.getElementById("board").appendChild(cell);
            cell.onclick = () => userMove(j);
        }
    }
}
creatBoardGame();

function userMove(col){
    if(panding){
        return;
    }
    if(stopGame){
        return;
    }
    let lowestRow = rowsIndicate[col];//השורה הפנויה הנמוכה ביותר
    if(lowestRow < 0){
       return;
    }
    if(boardGame[lowestRow][col] == " "){  
        document.getElementsByClassName("colors")[lowestRow * 7 + col].classList.add("falling");
        updateBoardGame(lowestRow,col,userPlayer);
        numOfMoves++;
    }
    if(checkWin(currplayer)){
        setTimeout(() => onWin(currplayer),500);
        return;
    }
    swichPlayer()
    if(currplayer == computerPlayer){
        panding = true;
        setTimeout(()=>{
            computer();
            numOfMoves++;
            if(numOfMoves == maxOfMoves){
                setTimeout(()=>alert("תיקו!"),500);
                stopGame = true;
                return;
            }    
            swichPlayer();
            panding = false;
        },500); 
    }
}

function computer(){
    for(let  j=0; j<boardGame[0].length; j++){
        let lowestRow = rowsIndicate[j];
        if(lowestRow < 0){
            continue;
        }
        boardGame[lowestRow][j] = computerPlayer;
        if(checkWin(computerPlayer)){
            document.getElementsByClassName("colors")[lowestRow *7 + j].style.backgroundColor = computerPlayer;
            onWin(computerPlayer);
            return;
        }
        boardGame[lowestRow][j] = userPlayer;
        if(checkWin(userPlayer)){
            updateBoardGame(lowestRow,j,computerPlayer);
            return;
        }
        boardGame[lowestRow][j] = " ";
    }
    computerRndom();
}

function computerRndom(){
    for(let  j=0; j<boardGame[0].length; j++){
        let lowestRow = rowsIndicate[j];
        if(lowestRow < 0){
            continue;
        }
        updateBoardGame(lowestRow,j,computerPlayer);
        return;
    }
}
    
function swichPlayer(){
   currplayer = currplayer == userPlayer ? computerPlayer : userPlayer;
    
}

function updateBoardGame(lowestRow,col,player){
    boardGame[lowestRow][col] = player;
    document.getElementsByClassName("colors")[lowestRow * 7 + col].style.backgroundColor = player;
    rowsIndicate[col]--;
}

function checkWin(currplayer){
    winningCell = [];
    for(let i = 0; i < boardGame.length; i++){
        for(let j=0; j <boardGame[i].length; j++){
            if( j+3 < cols && 
                boardGame[i][j] == currplayer && 
                boardGame[i][j+1] == currplayer && 
                boardGame[i][j+2] == currplayer && 
                boardGame[i][j+3] == currplayer)
            {
                winningCell.push(i*7+j, i*7 + j+1, i*7+ j+2, i*7+ j+3);
                return true;
            }
            if( i+3 < rows && 
                boardGame[i][j] == currplayer && 
                boardGame[i+1][j] == currplayer && 
                boardGame[i+2][j] == currplayer && 
                boardGame[i+3][j] == currplayer)
            {
                winningCell.push(i*7 +j, (i+1)*7 + j, (i+2)*7 + j, (i+3)*7 + j);
                return true;
            }
            if( i+3 < rows && j+3 < cols    && 
                boardGame[i][j] == currplayer && 
                boardGame[i+1][j+1] == currplayer && 
                boardGame[i+2][j+2] == currplayer && 
                boardGame[i+3][j+3] == currplayer)
            {
                winningCell.push(i*7 + j, (i+1)*7 + j+1, (i+2)*7 + j+2, (i+3)*7 + j+3 );
                return true;
            }
            if( i+3 < rows  && j-3 >= 0 && 
                boardGame[i][j] == currplayer && 
                boardGame[i+1][j-1] == currplayer && 
                boardGame[i+2][j-2] == currplayer && 
                boardGame[i+3][j-3] == currplayer)
            {
                winningCell.push(i*7 + j, (i+1)*7 + j-1, (i+2)*7 + j-2, (i+3)*7 + j-3 );
                return true;
            }
        }
    }
    return false;
}

function onWin(currplayer){
    setTimeout(() => alert(`${currplayer} Win!`),500);
    winningCell.forEach(index => 
    {
        let curCell = document.getElementsByClassName("colors")[index];
        currplayer == userPlayer ? curCell.style.border = "5px solid yellow" : curCell.style.border = "5px solid red";
    });
    stopGame = true;
}

function resetGame(){
    window.location.reload();
}

