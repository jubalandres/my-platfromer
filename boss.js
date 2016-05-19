var Boss = function(x ,y)
{
	this.image = document.createElement("img");
	this.sprite = new Sprite("herowithsheild.png");
	this.sprite.buildAnimation(16, 3, 76, 88, 0.05,
			[16,17,18,19,20,21,22,23]);
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
	
Boss.prototype.update = function(dt)
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
			ddx = ddx + BOSS_ACCEL; // enemy wants to go right
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
		ddx = ddx - BOSS_ACCEL; // enemy wants to go left
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

Boss.prototype.draw = function()
{
	this.sprite.draw(context, this.position.x, this.position.y);
}