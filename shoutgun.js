var Shootgunbullets = function () {
	this.image = document.createElement("img");
	this.x = player.position.x + 90;
	this.y = player.position.y + 15;
	this.width = 5;
	this.height = 5;
	this.velocity = new Vector2(1,0);
	this.velocity.multiplyScalar(800.5);
	this.rotation = player.rotation;
	this.image.src = "shootgunbullet.png";
};
Shootgunbullets.prototype.update = function (deltaTime) 

{
	this.x += this.velocity.x * deltaTime;
	this.y += this.velocity.y * deltaTime;
}
Shootgunbullets.prototype.draw = function()
{
	DrawImage (context, this.image, this.x - this.width/2, this.y - this.height/2, this.rotation);
}