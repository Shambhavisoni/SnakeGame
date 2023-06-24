function init() {
    // console.log("Init");
    canvas=document.getElementById('mycanvas');
    pen=canvas.getContext('2d');
    W=canvas.width;
    H=canvas.height;
    game_over=false;

    food=getRandomFood();
    score=5;

    // box = {
    //     x:10,
    //     y:10,
    //     w:20,
    //     h:20,
    //     speed:5,
    // }
    snake = {
        init_length:5, //snake length
        color:"aqua",  
        cells:[], // snake made up of small cells
        direction:"right", //snake moving in right direction

        createSnake:function(){
            for(var i=this.init_length-1;i>=0;i--){
                this.cells.push({x:i, y:0});
            }
        },
        drawSnake:function(){
            for(var i=0;i<this.cells.length;i++){
                pen.fillStyle=this.color;
                pen.strokeStyle="black";
                pen.lineWidth=3;
                pen.strokeRect(this.cells[i].x*10, this.cells[i].y*10, 10, 10);
                pen.fillRect(this.cells[i].x*10, this.cells[i].y*10, 10, 10);
            }
        },
        updateSnake:function(){
            var headX=this.cells[0].x;
            var headY=this.cells[0].y;

            if(headX==food.x && headY==food.y){
                food=getRandomFood();
                score++;
            }
            else{
                this.cells.pop();
            }
            if(this.direction=="right"){
                nextheadX=headX+1;
                nextheadY=headY;
            }
            else if(this.direction=="left"){
                nextheadX=headX-1;
                nextheadY=headY;
            }
            else if(this.direction=="down"){
                nextheadX=headX;
                nextheadY=headY+1;
            }
            else{
                nextheadX=headX;
                nextheadY=headY-1;
            }
            this.cells.unshift({x:nextheadX,y:nextheadY});

            var last_x=Math.round(W/10);
            var last_y=Math.round(H/10);
            if(this.cells[0].x<0 || this.cells[0].y<0 || this.cells[0].x>last_x || this.cells[0].y>last_y){
                alert("game over");
                game_over=true;
            }
        }
    };
    snake.createSnake();
    function KeyPressed(e){
        // console.log("you pressed the key");
        // console.log(e);

        if(e.key=="ArrowRight"){
            snake.direction="right";
        }
        else if(e.key=="ArrowLeft"){
            snake.direction="left";
        }
        else if(e.key=="ArrowDown"){
            snake.direction="down";
        }
        else{
            snake.direction="up";
        }
    }
    document.addEventListener('keydown', KeyPressed);
}

function draw() {
    pen.clearRect(0,0,W,H);
    snake.drawSnake();

    // snake
    pen.fillStyle=food.color;
    pen.fillRect(food.x*10, food.y*10, 10, 10);

    pen.fillStyle="white";
    pen.font="14px arial";
    pen.fillText("Score: "+score,10,10);

}

function update() {
    // console.log("update");
    // box.x+=box.speed;
    // if(box.x<0){
    //     box.speed*=-1;
    // }
    // if(box.x>=W){
    //     box.speed*=-1;
    // }
    snake.updateSnake();
}
function gameLoop() {
    draw();
    update();

    if(game_over){
        clearInterval(f);
    }
}

function getRandomFood(){
    var foodX= Math.round(Math.random()*(W-10)/10);
    var foodY= Math.round(Math.random()*(H-10)/10);

    foodColors=["red", "magenta", "ivory", "orchid"];
    var i=Math.round(Math.random()*foodColors.length);

    var food={
        x:foodX,
        y:foodY,
        color:foodColors[i],
    };
    return food;
}

init();

// call gme loop after every t time
var f=setInterval(gameLoop, 100);