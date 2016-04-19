var Bullet = function () {
	this.image = document.createElement("img");
	this.x = player.position.x + 50;
	this.y = player.position.y + 40;
	this.width = 5;
	this.height = 5;
	this.velocity = new Vector2(1,0);
	this.velocity.multiplyScalar(150.5);
	this.rotation = player.rotation;
	this.image.src = "bullet.png";
};
Bullet.prototype.update = function (deltaTime) 

{
	this.x += this.velocity.x * deltaTime;
	this.y += this.velocity.y * deltaTime;
}
Bullet.prototype.draw = function()
{
	DrawImage (context, this.image, this.x - this.width/2, this.y - this.height/2, this.rotation);
}