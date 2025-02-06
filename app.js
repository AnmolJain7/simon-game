let gameSeq = []
let userSeq = []

let started = false;
let level = 0;

let highScore = 0;

let btns = ["yellow","green","blue","red"]

let h2 = document.querySelector("h2")
let h3 = document.querySelector("h3")



document.addEventListener("keypress",function(){
    if(started == false){
        console.log("game started")
        started = true;

        levelUp()
    }
})

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function (){
        btn.classList.remove("flash")
    },250)
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function (){
        btn.classList.remove("userFlash")
    },250)
}

function levelUp(){
    userSeq = [];        
    level++;
    h2.innerText = `Level ${level}`

    let randIndx = Math.floor(Math.random()*4)         
    let randColor = btns[randIndx]
    let randBtn = document.querySelector(`.${randColor}`)

    gameSeq.push(randColor)
    console.log(gameSeq)

    gameFlash(randBtn);
}

function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){                 
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp , 1000)
        }
    }else{
        if(level-1 > highScore){
            highScore = level-1;
        }
        h2.innerHTML = `Game over ! <b>Your score was ${level-1}</b> <br> Press any key to RESTART the game`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },150)

        h3.innerText = `HIGH SCORE : ${highScore}`
        reset()

    }
}

function btnPress(){
    let btn = this;
    userFlash(btn)

    userColor = btn.getAttribute("id")
    userSeq.push(userColor)

    checkAns(userSeq.length-1)
}

let allBtns = document.querySelectorAll(".btn")
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}


function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}