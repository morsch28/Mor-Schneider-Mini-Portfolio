 
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

 let player = "red";
 let numOfMoves = 0;
 let maxOfMoves = boardGame.length * boardGame[0].length;
 let winningCell = [];

 for(let i = 0 ; i < boardGame.length; i++){
    for(let j = 0; j < boardGame[i].length ; j++){
        let cell = document.createElement("div");
        cell.className = "colors";
        document.getElementById("board").appendChild(cell);
        cell.onclick = function(){
            let lowRow = checkLowestRow(j)
            if(lowRow == -1){
                return;
            }
            if(boardGame[lowRow][j] == " "){
                boardGame[lowRow][j] = player;
                document.getElementsByClassName("colors")[lowRow * 7 + j].classList.add("falling");
                document.getElementsByClassName("colors")[lowRow * 7 + j].style.backgroundColor = player;
                numOfMoves++;
                // checkWin(6,7,0);
            }

            if(checkWin(player)){
                setTimeout(() => alert(`${player} Win!`),500);
                markerCells();
                return;
            }
            swichPlayer();
            if(player == "yellow"){
               setTimeout(()=>{
                    computer();
                    numOfMoves++;
                    if(numOfMoves == maxOfMoves){
                        setTimeout(()=>alert("תיקו!"));
                        return;
                    }
                    swichPlayer();
               },500); 
            }
        
        }
    
    }
}

function swichPlayer(){
   if(player == "red"){
        player = "yellow";
   }
   else{
    player = "red";
   }
    
}

function checkWin(player){
    winningCell = [];
    for(let i = 0; i < boardGame.length; i++){
        for(let j=0; j <boardGame[i].length; j++){
            if( j+3 < cols && boardGame[i][j] == player && boardGame[i][j+1] == player && boardGame[i][j+2] == player && boardGame[i][j+3] == player){
                winningCell.push(i*7+j, i*7 + j+1, i*7+ j+2, i*7+ j+3);
                return true;
            }
            if( i+3 < rows && boardGame[i][j] == player && boardGame[i+1][j] == player && boardGame[i+2][j] == player && boardGame[i+3][j] == player){
                winningCell.push(i*7 +j, (i+1)*7 + j, (i+2)*7 + j, (i+3)*7 + j);
                return true;
            }
            if( i+3 < rows && j+3 < cols && boardGame[i][j] == player && boardGame[i+1][j+1] == player && boardGame[i+2][j+2] == player && boardGame[i+3][j+3] == player){
                winningCell.push(i*7 + j, (i+1)*7 + j+1, (i+2)*7 + j+2, (i+3)*7 + j+3 );
                return true;
            }
            if( i+3 < rows  && j-3 >= 0 && boardGame[i][j] == player && boardGame[i+1][j-1] == player && boardGame[i+2][j-2] == player && boardGame[i+3][j-3] == player){
                winningCell.push(i*7 + j, (i+1)*7 + j-1, (i+2)*7 + j-2, (i+3)*7 + j-3 );
                return true;
            }
        }
    }
    return false;
}

function computer(){
    for(let  j=0; j<boardGame[0].length; j++){
        let lowRow = checkLowestRow(j);
        if(lowRow == -1){
            continue;
        }
        boardGame[lowRow][j] = "yellow";
        if(checkWin("yellow")){
            document.getElementsByClassName("colors")[lowRow*7 + j].style.backgroundColor = "yellow";
            markerCells();
            setTimeout(()=>alert("Yellow Win!"),500);
            return;
        }
        boardGame[lowRow][j] = "red";
        if(checkWin("red")){
            boardGame[lowRow][j] = "yellow";
            document.getElementsByClassName("colors")[lowRow*7 + j].style.backgroundColor = "yellow";
            return;
        }
        boardGame[lowRow][j] = " ";
    }
    
    
    for(let  j=0; j<boardGame[0].length; j++){
        let lowRow = checkLowestRow(j);
        if(lowRow == -1){
            continue;
        }
        boardGame[lowRow][j] = "yellow";
        document.getElementsByClassName("colors")[lowRow *7 + j].style.backgroundColor = "yellow";
        return;
    }
}

function resetGame(){
    window.location.reload();
}

function checkLowestRow(j){
    let lowest = rows-1;
    while(lowest >= 0){
        if(boardGame[lowest][j] == " "){
            return lowest;
        }
        lowest--;
    }
    return -1;
}
   
function markerCells(){
    if(winningCell.length > 0){
        winningCell.forEach(index => document.getElementsByClassName("colors")[index].classList.add("winnig-cells"));
        let cells = document.getElementsByClassName("winnig-cells");
        for(let i=0; i<cells.length; i++){
            let curCell = cells[i];
            player == "red"? curCell.style.border = "5px solid yellow" : curCell.style.border = "5px solid red"
        }
    }
}


