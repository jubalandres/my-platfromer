var LEFT = 0;
var RIGHT = 1;
var ANIM_IDLE_LEFT = 0;
var ANIM_JUMP_LEFT = 1;
var ANIM_WALK_LEFT = 2;
var ANIM_IDLE_RIGHT = 3;
var ANIM_JUMP_RIGHT = 4;
var ANIM_WALK_RIGHT = 5;
var ANIM_MAX = 6;

var Player = function() {
	this.image = document.createElement("img");
	this.sprite = new Sprite("hero1.png");
	this.sprite.buildAnimation(16, 3, 76, 88, 0.05,
			[41]);
	this.sprite.buildAnimation(16, 3, 76, 88, 0.05,
			[43]);
	this.sprite.buildAnimation(16, 3, 76, 88, 0.05,
			[16,17,18,19,20,21,22,23]);
	this.sprite.buildAnimation(16, 3, 76, 88, 0.05,
			[36]);
	this.sprite.buildAnimation(16, 3, 76, 88, 0.05,
			[42]);
	this.sprite.buildAnimation(16, 3, 76, 88, 0.05,
			[0,1,2,3,4,5,6,7]);
	
	for(var i=0; i<ANIM_MAX; i++)
	{
		this.sprite.setAnimationOffset(i, -25, -40);
	}
	this.position = new Vector2();
	this.position.set( 1*TILE, 9*TILE );
	 
	this.direction = LEFT;
	
	this.width = 76;
	this.height = 88;
	
	this.offset = new Vector2();
	this.offset.set(0,-35);
	
	this.velocity = new Vector2();
	
	this.falling = true;
	this.jumping = false;
	this.isdead = false
	
	this.cooldownTimer=0;
	
	SetupImageEvents(this, this.image);
};
Player.prototype.update = function(deltaTime)
{
	this.sprite.update(deltaTime);
	
	var left = false;
	var right = false;
	var jump = false;
	
	if(keyboard.isKeyDown(keyboard.KEY_LEFT) == true){
		left = true;
		this.direction = LEFT;
		if(this.sprite.currentAnimation != ANIM_WALK_LEFT &&
			this.jumping == false)
			this.sprite.setAnimation(ANIM_WALK_LEFT);
	}
	else
	if(keyboard.isKeyDown(keyboard.KEY_RIGHT) == true){
		right = true;
		this.direction = RIGHT;
		if(this.sprite.currentAnimation != ANIM_WALK_RIGHT &&
			this.jumping == false)
			this.sprite.setAnimation(ANIM_WALK_RIGHT);
	}
	else{
		if(this.jumping == false && this.falling == false)
		{
			if(this.direction == LEFT)
			{
				if(this.sprite.currentAnimation != ANIM_IDLE_LEFT)
					this.sprite.setAnimation(ANIM_IDLE_LEFT);
			}
			else
			{
				if(this.sprite.currentAnimation != ANIM_IDLE_RIGHT)
					this.sprite.setAnimation(ANIM_IDLE_RIGHT);
			}
		}
	}
		if(keyboard.isKeyDown(keyboard.KEY_UP) == true) {
			jump = true;
		}
			if(this.cooldownTimer>0);
			{
				this.cooldownTimer-=deltaTime;
			}
		if(keyboard.isKeyDown(keyboard.KEY_SPACE)== true && this.cooldownTimer<=0){
			sfxFire.play();
			this.cooldownTimer=0.3;
			playerShoot();
		}
	
	
	
	
	var wasleft = this.velocity.x < 0;
	var wasright = this.velocity.x > 0;
	var falling = this.falling;
	var ddx = 0;
	var ddy = GRAVITY;
	if (left)
		ddx = ddx - ACCEL; // player wants to go left
	else if (wasleft)
		ddx = ddx + FRICTION; // player was going left, but not any more
	if (right)
		ddx = ddx + ACCEL; // player wants to go right
	else if (wasright)
		ddx = ddx - FRICTION; // player was going right, but not any more
	if (jump && !this.jumping && !falling)
	{
		   ddy = ddy - JUMP;
		   this.jumping = true;
		   if(this.direction == LEFT &&
			    this.sprite.currentAnimation != ANIM_JUMP_LEFT)
				{
					this.sprite.setAnimation (ANIM_JUMP_LEFT);
				}
		   else if(this.direction == RIGHT &&
			    this.sprite.currentAnimation != ANIM_JUMP_RIGHT)
				{
					this.sprite.setAnimation(ANIM_JUMP_RIGHT);	
				}
	}
	this.position.y = Math.floor(this.position.y + (deltaTime * this.velocity.y));
	this.position.x = Math.floor(this.position.x + (deltaTime * this.velocity.x));
	this.velocity.x = bound(this.velocity.x + (deltaTime * ddx), -MAXDX, MAXDX);
	this.velocity.y = bound(this.velocity.y + (deltaTime * ddy), -MAXDY, MAXDY);
	
	if ((wasleft && (this.velocity.x > 0)) ||
		(wasright && (this.velocity.x < 0)))
		{
			this.velocity.x = 0;
		}
	var position = new Vector2(this.position.x ,this.position.y);
	position.add(this.offset);
	var tx = pixelToTile(position.x);
	var ty = pixelToTile(position.y);
	var nx = (position.x)%TILE;
	var ny = (position.y)%TILE;
	
	if(cellAtTileCoord(LAYER_LAVA, tx,ty -1))
	{
		this.isdead = true
	}
	
	var cell = cellAtTileCoord(LAYER_PLATFORMS, tx, ty);
	var cellright = cellAtTileCoord(LAYER_PLATFORMS, tx + 1, ty);
	var celldown = cellAtTileCoord(LAYER_PLATFORMS, tx, ty + 1);
	
	if (this.velocity.y > 0) {
		if (celldown && !cell) {
			this.position.y = tileToPixel(ty)-this.offset.y; // clamp the y position to avoid falling into platform below
			this.velocity.y = 0; // stop downward velocity
			this.falling = false; // no longer falling
			this.jumping = false; // (or jumping)
			ny = 0; // no longer overlaps the cells below
	}
}
	
	else if (this.velocity.y < 0) {
	if (cell && !celldown) {
		this.position.y = tileToPixel(ty + 1)-this.offset.y; // clamp the y position to avoid jumping into platform above
		this.velocity.y = 0; // stop upward velocity
		cell = celldown; // player is no longer really in that cell, we clamped them to the cell below// (ditto)
		ny = 0; // player no longer overlaps the cells below
	}
	}
	if (this.velocity.x > 0) {
	if (cellright && !cell) {
		this.position.x = tileToPixel(tx)-this.offset.x; // clamp the x position to avoid moving into the platform we just hit
		this.velocity.x = 0; // stop horizontal velocity
	}
}
else if (this.velocity.x < 0) {
	if (cell && !cellright) {
		this.position.x = tileToPixel(tx + 1)-this.offset.x; // clamp the x position to avoid moving into the platform we just hit
		this.velocity.x = 0; // stop horizontal velocity
		}
	}
}

Player.prototype.draw = function()
{
	this.sprite.draw(context, this.position.x, this.position.y);
}