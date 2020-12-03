
let isJump = false;
let pos = 0;
let nightControl = false;
let night = null;
let timeout = null;

const dino = document.querySelector(".dino");
const background = document.querySelector(".background");
const endgame = document.querySelector(".endGame");
const main = document.querySelector(".main");


function handleButton(event) {
    
    if(event.keyCode == 38) {
        if(!isJump) {
            jump();
        }   
    } 
}

function jump() {
    let up = setInterval(()=>{
        pos += 10;
        isJump = true;
               
        if(pos > 150) {
            clearInterval(up);
            
            let down = setInterval(() => {
                pos -= 10;
                isJump = false;
                if(pos <= 0 ) {
                    clearInterval(down);
                }
                dino.style.bottom = pos+"px";
            }, 20);
        }

        dino.style.bottom = pos+"px";
    }, 20)
};

function createCactus(){
    let cactusPos = 1000;
    let randomTime = Math.random() * 6000;    
    let cactus = document.createElement('div');
    cactus.classList.add("cactus");
    cactus.style.left = cactusPos + "px";
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        if(cactusPos <= -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
        }else if(cactusPos <= 60 && pos <= 60){
            //game over

            clearInterval(leftInterval);
            clearTimeout(timeout);
            clearInterval(night);
            background.removeChild(cactus);
            background.innerHTML = "";

            endgame.style.display = "block";
            endgame.innerHTML = "<h1>Game Over</h1>";
        }

        cactusPos -= 10;
        cactus.style.left = cactusPos +"px";
        
    },20);

    let timeout = setTimeout(createCactus, randomTime);
}

function  backNight() {
    night = setInterval(() => {
        nightControl = !nightControl;
        
        if(nightControl) {
            endgame.style.display = "block";

        } else {
            endgame.style.display = "none";
        }
    }, 5000)
}


document.addEventListener("keyup", handleButton);

createCactus();
backNight();

