// fetching elements from the web page
var bar_top=document.getElementById("bar-top");
var bar_bottom=document.getElementById("bar-bottom");
var ball=document.getElementById("ball");
var rules=document.getElementById("rules");
var movement=20;


// sound effects
let strike=new Audio('strike.mp3');
let gameover=new Audio('gameover.mp3');
let background=new Audio('background.mp3');

// declaring some constants
const thisBar1="Bar_top";
const thisBar2="bar_bottom";
const storeName="abc";
const storeScore=123;

let whichBar;
let moveX=2;
let moveY=2;
let ballMoving;
let border=12;
let score;
let highscore;
let gameStart=false;



// setting the localstorage
localStorage.setItem(storeScore,"null");
localStorage.setItem(storeScore,"null");



// function for getting the maximum score obtainer
(function(){
    highscore=localStorage.getItem(storeScore);
    whichBar=localStorage.getItem(storeName);
    if(whichBar=="null" || highscore=="null"){
      alert("Hello... This is your first game");
      highscore=0;
      whichBar=thisBar1;
    }else{
      alert(whichBar + " has maximum score of " + highscore*100);

    }
    gameReset(whichBar);
})();





// function for resetting the game
function gameReset(barName){
  bar_top.style.left=((window.innerWidth - bar_top.offsetWidth)/2)+"px";
  bar_bottom.style.left=((window.innerWidth - bar_bottom.offsetWidth)/2)+"px";
  ball.style.left=((window.innerWidth - ball.offsetWidth)/2)+"px";

  if(barName === thisBar1){
    ball.style.top=bar_top.getBoundingClientRect().y - bar_bottom.getBoundingClientRect().height+"px";
    moveY=-2;
  }else if(barName === thisBar2){
    ball.style.top=bar_top.getBoundingClientRect().height+"px";
    moveY=2;
  }
  score=0;
  strike.pause();
  gameover.play();
  gameStart=false;
}




// handling the key events
document.addEventListener('keydown',function(event){
  if(event.keyCode==68  || event.keyCode==39){
    if(parseInt(bar_top.style.left)<(window.innerWidth - bar_top.offsetWidth - border)){
        bar_top.style.left=parseInt(bar_top.style.left)+movement+"px";
        bar_bottom.style.left=bar_top.style.left;
    };
  };
  if(event.keyCode==65  || event.keyCode==37){
    if(parseInt(bar_top.style.left)>border){
        bar_top.style.left=parseInt(bar_top.style.left)-movement+"px";
        bar_bottom.style.left=bar_top.style.left;
    };
  };


// handling the movement of the ball
  if(event.keyCode==13){
    background.play();
    background.loop=true;
    rules.style.opacity=0;
    if(!gameStart){
      gameStart=true;
      let ballRect=ball.getBoundingClientRect();
      let ballX=ballRect.x;
      let ballY=ballRect.y;
      let ballDia=ballRect.width;


      let bar_top_height=bar_top.offsetHeight;
      let bar_top_width=bar_top.offsetWidth;
      let bar_bottom_height=bar_bottom.offsetHeight;
      let bar_bottom_width=bar_bottom.offsetWidth;

      ballMoving=setInterval(function(){
        let bar_top_x=bar_top.getBoundingClientRect().x;
        let bar_bottom_x=bar_bottom.getBoundingClientRect().x;

        let ballCenter=ballX+ballDia/2;

        ballX+=moveX;
        ballY+=moveY;

        ball.style.left=ballX+"px";
        ball.style.top=ballY+"px";

        if(((ballX+ballDia)>window.innerWidth) || (ballX<0)){
          moveX=-moveX;
        }

        if(ballY<=bar_top_height){
          moveY=-moveY;
          score++;
          strike.play();
          if((ballCenter<bar_top_x) || (ballCenter>(bar_top_x+bar_top_width))){
            dataStoring(score,thisBar2);
          }
        }

        if((ballY+ballDia)>=(window.innerHeight - bar_bottom_height)){
          moveY=-moveY;
          strike.play();
          score++;
          if((ballCenter< bar_bottom_x ) || (ballCenter>(bar_bottom_x+bar_bottom_width))){
            dataStoring(score,thisBar1);
          }
        }

      
    },6);
  }

};
});



// fucntion for updating the localstorgae
function dataStoring(scoreObtained,winningBar){
  if(score>highscore){
    highscore=score;
    localStorage.setItem(storeName,winningBar);
    localStorage.setItem(storeScore,highscore);
  }
  clearInterval(ballMoving);
  gameReset(winningBar);
  alert(winningBar + " wins with score of "+ (scoreObtained*100)+" . Max score is: "+(highscore*100));
};
