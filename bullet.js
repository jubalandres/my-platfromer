<<<<<<< HEAD
var Bullet = function (x, y, moveRight)
{
	this.sprite = new Sprite("bullet.png");
	this.sprite.buildAnimation(1,1,32,32,-1, [0]);
	this.sprite.setAnimationOffset(0,0,0);
	this.sprite.setLoop(0, false);
	
	this.position = new Vector2();
	this.position.set(x,y);
=======
var Bullet = function () {
	this.image = document.createElement("img");
	this.x = player.position.x + 90;
	this.y = player.position.y + 15;
	this.width = 5;
	this.height = 5;
	this.velocity = new Vector2(1,0);
	this.velocity.multiplyScalar(800.5);
	this.rotation = player.rotation;
	this.image.src = "bullet.png";
};
Bullet.prototype.update = function (deltaTime) 
>>>>>>> origin/master

	this.velocity = new Vector2();
	
	this.moveRight = moveRight;
	if(this.moveRight == true)
		this.velocity.set(MAXDX *2, 0);
	else
		this.velocity.set(-MAXDX *2, 0);
}
Bullet.prototype.update = function(dt)
{
	this.sprite.update(dt);
	this.position.x = Math.round(this.position.x + (dt * this.velocity.x));
}
Bullet.prototype.draw = function()
{
	this.sprite.draw(context, this.position.x, this.position.y);
}