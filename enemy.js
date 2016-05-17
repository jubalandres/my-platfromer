<<<<<<< HEAD
var Enemy = function(x ,y)
{
	this.image = document.createElement("img");
	this.sprite = new Sprite("enemyice.png");
	this.sprite.buildAnimation(16, 3, 76, 88, 0.05,
			[24,25,26,27,28,29,30,31]);
	this.sprite.setAnimationOffset(0, -25, -40);
	
	this.offset = new Vector2();
	this.offset.set(0,35);
	
	this.position = new Vector2();
	this.position.set(x, y);
	
	this.position.add(this.offset);
	
	
	this.velocity = new Vector2();
	
	this.moveRight = true;
	this.pause = 0;
	SetupImageEvents(this, this.image);
}
	
Enemy.prototype.update = function(dt)
{
	this.sprite.update(dt);
	if(this.pause > 0)
	{
		this.pause -= dt;
	}
	else
	{
		var ddx = 0; // acceleration
		
		var tx = pixelToTile(this.position.x);
		var ty = pixelToTile(this.position.y);
		var nx = (this.position.x)%TILE; // true if enemy overlaps right
		var ny = (this.position.y)%TILE; // true if enemy overlaps below
		var cell = cellAtTileCoord(LAYER_PLATFORMS, tx, ty);
		var cellright = cellAtTileCoord(LAYER_PLATFORMS, tx + 1, ty);
		var celldown = cellAtTileCoord(LAYER_PLATFORMS, tx, ty + 1);
		var celldiag = cellAtTileCoord(LAYER_PLATFORMS, tx + 1, ty + 1);
	if(this.moveRight)
		{
			if(celldiag && !cellright) {
			ddx = ddx + ENEMY_ACCEL; // enemy wants to go right
		}
	else 
		{
			this.velocity.x = 0;
			this.moveRight = false;
			this.pause = 0.5;
		}
	}
	if(!this.moveRight)
	{
	if(celldown && !cell) {
		ddx = ddx - ENEMY_ACCEL; // enemy wants to go left
	}
	else 
	{
		this.velocity.x = 0;
		this.moveRight = true;
		this.pause = 0.5;
	}
	}
		this.position.x = Math.floor(this.position.x + (dt * this.velocity.x));
		this.velocity.x = bound(this.velocity.x + (dt * ddx),
-		ENEMY_MAXDX, ENEMY_MAXDX);
	}
}

=======
<<<<<<< HEAD
var Enemy = function(x ,y)
=======
var Enemy = function() {
	this.image = document.createElement("img");
	this.x = canvas.width/2;
	this.y = canvas.height/2;
	this.width = -299;
	this.height = -790;
	this.image.src = "enemy.png";
	this.isdead = false;
};
>>>>>>> origin/master
Enemy.prototype.draw = function()
>>>>>>> origin/master
{
<<<<<<< HEAD
	this.sprite.draw(context, this.position.x, this.position.y);
=======
	this.sprite = new Sprite("bat.png");
	this.sprite.buildAnimation(2, 1, 88, 94, 0.3, [0,1]);
	this.sprite.setAnimationOffset(0, -35, -40);
	
	this.position = new Vector2();
	this.position.set(x, y);
	
	this.velocity = new Vector2();
	
	this.moveRight = true;
	this.pause = 0;
}
	
Enemy.prototype.update = function(dt)
{
	this.sprite.update(dt);
	if(this.pause > 0)
	{
		this.pause -= dt;
	}
	else
	{
		var ddx = 0; // acceleration
		var tx = pixelToTile(this.position.x);
		var ty = pixelToTile(this.position.y);
		var nx = (this.position.x)%TILE; // true if enemy overlaps right
		var ny = (this.position.y)%TILE; // true if enemy overlaps below
		var cell = cellAtTileCoord(LAYER_PLATFORMS, tx, ty);
		var cellright = cellAtTileCoord(LAYER_PLATFORMS, tx + 1, ty);
		var celldown = cellAtTileCoord(LAYER_PLATFORMS, tx, ty + 1);
		var celldiag = cellAtTileCoord(LAYER_PLATFORMS, tx + 1, ty + 1);
	if(this.moveRight)
		{
			if(celldiag && !cellright) {
			ddx = ddx + ENEMY_ACCEL; // enemy wants to go right
		}
	else 
		{
			this.velocity.x = 0;
			this.moveRight = false;
			this.pause = 0.5;
		}
	}
	if(!this.moveRight)
	{
	if(celldown && !cell) {
		ddx = ddx - ENEMY_ACCEL; // enemy wants to go left
	}
	else 
	{
		this.velocity.x = 0;
		this.moveRight = true;
		this.pause = 0.5;
	}
	}
		this.position.x = Math.floor(this.position.x + (dt * this.velocity.x));
		this.velocity.x = bound(this.velocity.x + (dt * ddx),
-		ENEMY_MAXDX, ENEMY_MAXDX);
	}
>>>>>>> origin/master
}