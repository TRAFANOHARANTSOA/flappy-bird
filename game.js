var cvs= document.getElementById("bird");
var ctx= cvs.getContext("2d");
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();
//load images//
bird.src = "images/flappybird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";
// distance between the pipeSouth and pipeNorth//
var gap = 150;
var constant = pipeNorth.height + gap;
//bird vertical position + gravity to make the bird fall//
var bX = 20;
var bY = 200;
var gravity =2;
// on key down//
document.addEventListener("keydown", moveUp);
  function  moveUp() {
    bY-=40;
    flap.play();
  }
  document.addEventListener("click", moveUp);
    function  moveUp() {
      bY-=40;
      flap.play();
    }
//pipe appear randomly//
var pipe = [] ;
pipe[0] = {
  x :cvs.width,
  y : 0};
//scoring//
var score=0;
//audio//
var flap = new Audio();
var scor = new Audio();
var die = new Audio();
var hit = new Audio();
var swooshing = new Audio();
flap.src = "audio/sfx_flap.mp3";
scor.src = "audio/sfx_point.mp3";
die.src = "audio/sfx_die.mp3";
hit.src = "audio/sfx_hit.mp3";
swooshing.src = "audio/sfx_swooshing.mp3";
// draw images//
function draw() {
  ctx.drawImage(bg,0,0);
  for (var i = 0; i < pipe.length; i++) {
    ctx.drawImage(pipeNorth, pipe[i].x,pipe[i].y);
    ctx.drawImage(pipeSouth, pipe[i].x,pipe[i].y + constant);
    pipe[i].x--;
        if(pipe[i].x==50) {
          pipe.push({
            x : cvs.width,
            y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
        });
        }
        //collision//
        if (bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width &&
        (bY <= pipe[i].y + pipeNorth.height || bY + bird.height >= pipe[i].y + constant) || bY + bird.height >= cvs.height - fg.height){
          location.reload(); // reload the page
          hit.play();
          die.play();
        }
        //score increment//
        if(pipe[i].x ==5){
          score++;
          swooshing.play();
          scor.play();
      }
    }

      ctx.drawImage(fg,0,cvs.height - fg.height);
      ctx.drawImage(bird,bX,bY);
      bY += gravity;
      ctx.fillStyle = "#FFF";
      ctx.font = "20px Verdana";
      ctx.fillText(+ score ,cvs.width/2,100);
  requestAnimationFrame(draw);

}
draw();
