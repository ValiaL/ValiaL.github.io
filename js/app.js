//Each tile is 101px wide
var tileWidth = 101;
//Each tile is 83px high
var tileHeight = 83;
//Array of random speeds for the bugs
var BUG_SPEEDS = [200,220,240,260,280,300,320,340,360,380,400,420,440,460,480,500];
//var BUG_START_Y = [151,251,351];
var BUG_START_X = -20;
//Player's starting positions
var PLAYER_START_X = 20;
var PLAYER_START_Y = 350;
//Player's moving offsets
var PLAYER_MOVE_X = 81;
var PLAYER_MOVE_Y = 60;
//Instantiate enemies
var allEnemies = [];
var flag = false;

//Produce a random number
var randomNumber = function(range) {
return Math.floor(Math.random()*range);
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = BUG_START_X;
    this.y = this.StartPosY();
    this.speed = this.DefineSpeed();
}

/**
* Computes the random y position of bug entities;
* The bugs are constrained withing the stone block
*/
Enemy.prototype.StartPosY = function() {
    return ((tileHeight-20) + randomNumber(3) * tileHeight);
}

Enemy.prototype.DefineSpeed = function(){
    return BUG_SPEEDS[randomNumber(BUG_SPEEDS.length)];
}


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if (this.x > 707) {
    this.x = BUG_START_X;
    this.y = this.StartPosY();
    this.speed = this.DefineSpeed();
    }
    this.x = this.x + this.speed * dt; 

    //Multiply bugs when player steps on stone (20,50)
    if (player.x == 20 && player.y == 50){
        this.multiplyEnemies();
        flag = true;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Enemy.prototype.multiplyEnemies = function(){
    for (var i = 0; i < 200; i++) {
        allEnemies.push(new Enemy);
    };
}

Enemy.prototype.resetAll = function(){
    this.x = BUG_START_X;
    this.y = this.StartPosY();
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
//Main player
var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-horn-girl.png';
    this.x = PLAYER_START_X;
    this.y = PLAYER_START_Y;
}

Player.prototype.update = function(dt) { 
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x >= ctx.width    || this.y >=ctx.height){
        this.x = PLAYER_START_X;
        this.y = PLAYER_START_Y;
    }

     //Reset game if player reaches the water
    if(player.y <= 0){
        this.resetPosition();
    }
}

Player.prototype.resetPosition = function(){
    this.x = PLAYER_START_X;
    this.y = PLAYER_START_Y;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key){
    switch(key){
        case "up":
            if(this.y > 15 )
                this.y = this.y - PLAYER_MOVE_Y;
            break;
        case "down":
            if (this.y < tileHeight * 5 - 50)
                this.y = this.y + PLAYER_MOVE_Y;
            break;
        case "left":
            if (this.x > 20)
                this.x = this.x - PLAYER_MOVE_X;
            break;
        case "right":
            if (this.x < tileWidth * 4 - 50)
                this.x = this.x + PLAYER_MOVE_X;
            break;
    }

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var player = new Player();

//var allEnemies = [enemy1,enemy2,enemy3];
allEnemies = [enemy1,enemy2,enemy3];


function resetGame() {
allEnemies = [enemy1,enemy2,enemy3];
player.resetPosition();
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        41: 'space'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
