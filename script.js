console.log("welcome to tic tac toe");

let music=new Audio("music.mp3");
let turn=new Audio("ting.mp3");
let gameOver=new Audio("gameover.mp3");
let win=false;
let gameEnd=false;

let totalTurns=0;

//initiallizing the first turn for x as yahi mante hain ham bro so let's go
let playerTurn="X";


const changeTurn=()=>{
    // function to change the turn
    return (playerTurn==="X"?"O":"X");
}

const reset=()=>{
    document.querySelector(".line").style.width=`0px`;
    gameEnd=false;
    win=false;
    totalTurns=0;
    music.pause();
    music=new Audio("music.mp3");
    //we have to reset all the things bro so let's do this
    playerTurn="X";
    document.getElementsByClassName("info")[0].innerHTML=`Turn for <span id="turn">X</span>`;
    //we have changed the text now we have to empty the grid
    let boxtexts=document.querySelectorAll('.boxtext');
    console.log(boxtexts);
    boxtexts.forEach(e=>{
        // console.log(e.innerText);
        e.innerText="";
    })
    document.getElementById("danceimg").style.width="0px";
}

// function to check win
const checkWin=()=>{
    //this has all the possibilites when we can win bro
    let boxtexts=document.getElementsByClassName("boxtext");
    // console.log(boxtexts[0]);
    // the last three of the points are for the animated line which we should make par bc it is not responsive bro so only above 800px hai vo
    let wins=[
        [0,1,2,5,5,0],
        [3,4,5,5,15,0],
        [6,7,8,5,25,0],
        [0,3,6,-5,15,90],
        [1,4,7,5,15,90],
        [2,5,8,15,15,90],
        [0,4,8,5,15,45],
        [2,4,6,5,15,135]
    ];

    wins.forEach(e=>{
        if((boxtexts[e[0]].innerText==boxtexts[e[1]].innerText) && (boxtexts[e[1]].innerText==boxtexts[e[2]].innerText) && (boxtexts[e[0]].innerText!=="")){
            //means we have won bro 
            console.log("in the win shit",boxtexts[e[0]].innerText);
            document.querySelector(".info").innerText=(boxtexts[e[0]].innerText)+" Won !";
            music.play();
            document.getElementById("danceimg").style.width="100%";
            win=true;

            document.querySelector(".line").style.width=`20vw`;
            document.querySelector(".line").style.transform=`translate(${e[3]}vw,${e[4]}vw) rotate(${e[5]}deg)`;

        }
    })

    //matlab abhi tak to nahi jeete ham

}

//main logic of the game 
let boxes=document.getElementsByClassName("box");

Array.from(boxes).forEach((element)=>{
    //element is the tag jiski id box hai
    let boxtext=element.querySelector('.boxtext');
    element.addEventListener("click",()=>{
        if(gameEnd || win){
            reset();
        }
        // console.log(element.innerHTML);
        // console.log(boxtext);
        else if(boxtext.innerText==""){
            boxtext.innerText=playerTurn;
            totalTurns++;
            playerTurn=changeTurn();
            turn.play();
            document.getElementById("turn").innerText=playerTurn;
            checkWin();
        }


        if(totalTurns==9){
            //game is over 
            gameOver.play();
            document.querySelector(".info").innerText="Game Over !!";
            gameEnd=true;
        }
    })
})


document.getElementById("reset").addEventListener("click",()=>{
    reset();
})