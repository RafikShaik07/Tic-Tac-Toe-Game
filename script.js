const cells=document.querySelectorAll(".cell");
const statusText=document.getElementById("status");
const restartBtn=document.getElementById("restart");

let currentPlayer="X";
let board=["","","","","","","","",""];
let running=true;

const winPatterns=[
[0,1,2],[3,4,5],[6,7,8],
[0,3,6],[1,4,7],[2,5,8],
[0,4,8],[2,4,6]
];

cells.forEach(cell=>cell.addEventListener("click",cellClick));
restartBtn.addEventListener("click",restartGame);

function cellClick(){
const index=this.dataset.index;

if(board[index]!==""||!running)return;

board[index]=currentPlayer;
this.textContent=currentPlayer;
this.classList.add(currentPlayer);

checkWinner();
}

function changePlayer(){
currentPlayer=currentPlayer==="X"?"O":"X";
statusText.textContent=`Player ${currentPlayer} Turn`;
}

function checkWinner(){
let won=false;

winPatterns.forEach(pattern=>{
const[a,b,c]=pattern;
if(board[a]&&board[a]===board[b]&&board[a]===board[c]){
won=true;
}
});

if(won){
statusText.textContent=`🎉 Player ${currentPlayer} Wins!`;
running=false;
}
else if(!board.includes("")){
statusText.textContent="🤝 Draw!";
running=false;
}
else{
changePlayer();
}
}

function restartGame(){
board=["","","","","","","","",""];
running=true;
currentPlayer="X";
statusText.textContent="Player X Turn";

cells.forEach(cell=>{
cell.textContent="";
cell.classList.remove("X","O");
});
}
