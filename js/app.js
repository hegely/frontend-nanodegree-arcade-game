"use strict;"
let score = 0;

//Definie global game object
class gameObj {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.detZone = 25; //updated to 25
	}
	
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	};
}

//Definie enemy as subclass of game object
class Enemy extends gameObj {
	constructor(x, y, spd) {
		super(x, y);
		this.spd = spd;
		this.sprite = 'images/enemy-bug.png';
	}
	
	update(dt) {
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
}

//Definie player as subclass of game object
class Player extends gameObj {
	constructor(x, y) {
		super(x, y);
		this.sprite = 'images/char-boy.png';
	};
	
	update() {
		if (this.y == -25) {
			this.y = 400;
			score++;
			alert("You WON! With the total score of: " + score + "!");
		}
	};
	
	handleInput(key) {
		if (key == 'left' && this.x > 0) {
			this.x = this.x - 100;
		} else if (key == 'up' && this.y > 0) {
			this.y = this.y - 85;
		} else if (key == 'right' && this.x < 400) {
			this.x = this.x + 100;
		} else if (key == 'down' && this.y < 400) {
			this.y = this.y + 85;
		};
	};
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a letiable called player
let allEnemies = [];
let locEnemies = [60, 140, 220];

locEnemies.forEach((loc) => {
  let enemy = new Enemy(0, loc, Math.floor((Math.random()) * 200) + 100);
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
