const cvs=document.getElementById("pong");
const ctx=cvs.getContext("2d");
//create user paddle
const user={
    x: 0,
    y: cvs.clientHeight/2-100/2,
    width:10,
    height:100,
    color: "WHITE",
    score:0
}
//create computer paddle
const com={
    x: cvs.clientWidth-10,
    y: cvs.clientHeight/2-100/2,
    width:10,
    height:100,
    color: "WHITE",
    score:0
}
//create the ball
const ball={
    x: cvs.clientWidth/2,
    y: cvs.clientHeight/2,
    radius: 10,
    speed:5,
    velocityX:5,
    velocityY:5,
    color:"WHITE"
}
//create the net
const net={
    x:cvs.clientWidth/2-1,
    y:0,
    width: 2,
    height:10,
    color:"WHITE"
}
//draw the net
function drawNet(){
    for(let i=0;i<cvs.clientHeight;i+=15){
        drawRect(net.x,net.y+i,net.width,net.height,net.color);
    }
}
//draw rectangle function
function drawRect(x,y,w,h,color){
    ctx.fillStyle=color;
    ctx.fillRect(x,y,w,h);
}

//drawRect(0,0,cvs.clientWidth,cvs.clientHeight,"BLACK");
//draw circle
function drawCircle(x,y,r,color){
    ctx.fillStyle=color;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2,false);
    ctx.closePath();
    ctx.fill();
}
//drawCircle(100,100,50,"WHITE");
//draw text
function drawText(text,x,y,color){
    ctx.fillStyle="color";
    ctx.font="45px fantasy";
    ctx.fillText(text,x,y);
}

//render the game
function render(){
    //clear the canvas
    drawRect(0,0,cvs.clientWidth,cvs.clientHeight,"BLACK");

    //draw the net
    drawNet();

    //draw the score
    drawText(user.score,cvs.clientWidth/4,cvs.clientHeight/5,"WHITE");
    drawText(com.score,cvs.clientWidth*3/4,cvs.clientHeight/5,"WHITE");

    //draw the user and com paddle
    drawRect(user.x,user.y,user.width,user.height,user.color);
    drawRect(com.x,com.y,com.width,com.height,com.color);

    //draw the ball
    drawCircle(ball.x,ball.y,ball.radius,ball.color);
}
//collision detection
function collision(ball,paddle){
    ball.top=ball.y-ball.radius;
    ball.bottom=ball.y+ball.radius;
    ball.left=ball.x-ball.radius;
    ball.right=ball.x+ball.radius;

    paddle.top=paddle.y;
    paddle.bottom=paddle.y+paddle.height;
    paddle.left=paddle.x;
    paddle.right=paddle.x+paddle.width;

    return paddle.top<ball.bottom && paddle.bottom>ball.top && paddle.right>ball.left && paddle.left<ball.right;
}
//control the user paddle
cvs.addEventListener("mousemove",movePaddle);
function movePaddle(evt){
    let rect=cvs.getBoundingClientRect();
    user.y=evt.clientY-rect.top-user.height/2;
}
//reset the ball
function resetBall(){
    ball.x=cvs.clientWidth/2;
    ball.y=cvs.clientHeight/2;
    ball.speed=5;
    ball.velocityX=5;
    ball.velocityY=5;
}
//update position, move, score....
function update(){
    ball.x+=ball.velocityX;
    ball.y+=ball.velocityY;
    //simple ai to control the computer paddle
    let computerLevel=0.5;
    //com.y+=(ball.y-(com.y+com.height/2))*computerLevel;
    com.y=ball.y-user.height/2;
    if(ball.y+ball.radius > cvs.clientHeight || ball.y-ball.radius <  0){
        ball.velocityY=-ball.velocityY;
    }

    let player=(ball.x<cvs.clientWidth/2) ? user: com;
    
    if(collision(ball,player)){
        ball.velocityX=-ball.velocityX;
        
    }
    //update the score
    if((ball.x-ball.radius)<0){
        com.score++;
        resetBall();
    }else if((ball.x+ball.radius)>cvs.clientWidth){
        user.score++;
        resetBall();
    }
}

//game init
function game(){
    update();
    render();
}

//loop
const framePerSecond=50;
setInterval(game,1000/framePerSecond);