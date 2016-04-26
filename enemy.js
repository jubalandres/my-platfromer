var Enemy = function() {
	this.image = document.createElement("img");
	this.x = canvas.width/2;
	this.y = canvas.height/2;
	this.width = -299;
	this.height = -790;
	this.image.src = "enemy.png";
	this.isdead = false;
};
Enemy.prototype.draw = function()
{
	if(this.isdead == true)return;
	
	context.save();
	context.translate(this.x, this.y);
	context.rotate(this.rotation);
	context.drawImage(this.image, -this.width/2, -this.height/2);
	context.restore();
}