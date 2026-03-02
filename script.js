const board=document.getElementById("board");
const statusText=document.getElementById("status");

let cells=[];
let currentPlayer="X";
let gameActive=true;

const winPatterns=[
[0,1,2],[3,4,5],[6,7,8],
[0,3,6],[1,4,7],[2,5,8],
[0,4,8],[2,4,6]
];

/* CREATE BOARD */

for(let i=0;i<9;i++){
  const cell=document.createElement("div");
  cell.classList.add("square");
  cell.addEventListener("click",handleClick);
  board.appendChild(cell);
  cells.push(cell);
}

/* CLICK */

function handleClick(e){

  const cell=e.target;

  if(cell.textContent!==""||!gameActive) return;

  cell.textContent=currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());

  checkWinner();

  currentPlayer=currentPlayer==="X"?"O":"X";

  if(gameActive)
    statusText.textContent=`Player ${currentPlayer} Turn`;
}

/* WIN CHECK */

function checkWinner(){

  for(const pattern of winPatterns){

    const[a,b,c]=pattern;

    if(
      cells[a].textContent &&
      cells[a].textContent===cells[b].textContent &&
      cells[a].textContent===cells[c].textContent
    ){
      gameActive=false;

      cells[a].classList.add("win");
      cells[b].classList.add("win");
      cells[c].classList.add("win");

      statusText.textContent=`🎉 Player ${cells[a].textContent} Wins!`;
      return;
    }
  }

  if(cells.every(c=>c.textContent!=="")){
    gameActive=false;
    statusText.textContent="It's a Draw!";
  }
}

/* RESTART */

function restartGame(){
  cells.forEach(cell=>{
    cell.textContent="";
    cell.className="square";
  });

  currentPlayer="X";
  gameActive=true;
  statusText.textContent="Player X Turn";
}

/* 3D PARALLAX MOTION */

document.addEventListener("mousemove",(e)=>{

  const x=(window.innerWidth/2-e.clientX)/60;
  const y=(window.innerHeight/2-e.clientY)/60;

  document.querySelectorAll(".flying-layer")
    .forEach((layer,index)=>{
      layer.style.transform=
        `translate(${x*(index+1)}px,${y*(index+1)}px)`;
    });
});