var Board;
const Human = 'O',AI = 'X';
var cells = document.querySelectorAll(".cell");

var winCombo = [
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
];

startGame();

function startGame(){
    Board = Array.from(Array(9).keys());
    document.getElementById("matchresult").style.display = "none";
    for(var i=0;i<cells.length;i++){
        cells[i].style.backgroundColor = "";
        cells[i].innerText = "";
        cells[i].addEventListener("click",turnClick,false);
    }
}
console.log(Board);
function turnClick(square){
    var pos = square.target.id;
    if(Board[pos] == pos){
    turn(pos,Human);
    var x = checkWin(Board,Human);
    if(x!==null){
        gameOver(x,"You won!! ");
        return;
    }
    if(checkTie(Board)){
        gameOver(null,"Tie Match! ");
        return;
    }
    turn(minimax(Board,AI).index,AI);
    var x2 = checkWin(Board,AI);
    if(x2!==null){
        gameOver(x2,"You Lost :(");
        return;
    }
    if(checkTie(Board)){
        gameOver(null,"Tie Match! ");
        return;
    }
    }
}
function turn(ID,player){
    cells[ID].innerText = player;
    Board[ID] = player;
}
function checkWin(newBoard,Player){
    for(var i=0;i<winCombo.length;i++){
        var answer = true;
        for(var j=0;j<winCombo[i].length;j++){
            if(Board[winCombo[i][j]] !== Player)
                answer = false;
        }
        if(answer === true) return winCombo[i];
    }
    return null;
}
function gameOver(x,mytext){
    if(x!==null){
        for(var i=0;i<x.length;i++){
            cells[x[i]].style.backgroundColor = "blue";
        }
    }
    document.getElementById("matchresult").innerText = mytext;
    document.getElementById("matchresult").style.display = "block";
    if(x===null){
        for(var i=0;i<cells.length;i++){
            cells[i].style.backgroundColor = "green";
        }
    }
    for(var i=0;i<cells.length;i++)
        cells[i].removeEventListener("click",turnClick,false);
}
function checkTie(newBoard){
    var x = emptycells(newBoard).length;
    if(x===0)   return true;
    return false;
}

function emptycells(newBoard){
    var output = [];
    for(var i=0;i<Board.length;i++){
        if(newBoard[i]==i){
            output.push(i);
        }
    }
    return output;
}

function minimax(newBoard,player){
    if(checkWin(newBoard,Human)){
        return {score:-100};
    }
    else if(checkWin(newBoard,AI)){
        return {score:100};
    }
    else if(checkTie(newBoard)){
        return {score:0};
    }

    var x = emptycells(newBoard);
    var moves = [];
    for(var i=0;i<x.length;i++){
        var move = {};
        move.index = x[i];
        newBoard[x[i]] = player;
        if(player == AI){
            move.score = minimax(newBoard,Human).score;
        }
        else{
            move.score = minimax(newBoard,AI).score;
        }
        moves.push(move);
        newBoard[x[i]] = move.index;
    }
    
    if(player==AI){ 
        var mx = -100000,idx = 0;
        for(var i=0;i<moves.length;i++){
            if(mx<moves[i].score){
                mx = moves[i].score;
                idx = moves[i].index;
            }
        }
        return {score:mx,index:idx}; 
    }
    else{
        var mn = 100000,idx = 0;
        for(var i=0;i<moves.length;i++){
            if(mn>moves[i].score){
                mn = moves[i].score;
                idx = moves[i].index;
            }
        }
        return {score:mn,index:idx};
    }
}
