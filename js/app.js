// Enemies our player must avoid
let Enemy = function(x, y, spd) {
    // letiables applied to each of our instances go here,
    // we've provided one for you to get started
	this.x = x;
	this.y = y;
	this.spd = spd;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
	this.detZone = 10;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same spd for
    // all computers.
	let locEnemies = [60, 140, 220];
	this.x = this.x + (this.spd * dt);
	if (this.x > 505) {
		this.x = 0;
		this.y = locEnemies[Math.floor((Math.random()) * 3)];
		this.spd = Math.floor(Math.random() * 200) + 100;
	}
	
	//Collision detection
	let detX = this.x - player.x;
	let detY = player.y - this.y;
	let distance = Math.sqrt(detX * detX + detY * detY);

	if (distance < this.detZone + player.detZone) {
		player.y = 400;
		player.x = 200;
		//alert('colision');
	  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function(x, y) {
  this.x = x;
  this.y = y;
  this.img = 'images/char-boy.png';
  this.detZone = 10;
}

Player.prototype.update = function() {
  if (this.y == -25) {
    this.y = 400;
  }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.img), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
  if (key == 'left' && this.x > 0) {
    this.x = this.x - 100;
  } else if (key == 'up' && this.y > 0) {
    this.y = this.y - 85;
  } else if (key == 'right' && this.x < 400) {
    this.x = this.x + 100;
  } else if (key == 'down' && this.y < 400) {
    this.y = this.y + 85;
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a letiable called player
let allEnemies = [];
let locEnemies = [60, 140, 220];

locEnemies.forEach((loc) => {
  enemy = new Enemy(0, loc, Math.floor((Math.random()) * 200) + 100);
  allEnemies.push(enemy);
});

let player = new Player(200, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
