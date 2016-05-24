var health = 3;
var Healthbar = function () 
{
	this.position = new Vector2();
	this.position.set( 19, 20 );
	this.images = [];
	this.images[0] = document.createElement("img");
	this.images[0].src = "healthbar4,4.png";
	this.images[1] = document.createElement("img");
	this.images[1].src = "healthbar3,4.png";
	this.images[2] = document.createElement("img");
	this.images[2].src = "healthbar2,4.png";
	this.images[3] = document.createElement("img");
	this.images[3].src = "healthbar1,4.png";
	
	this.currentImage = this.images[0];
	
	this.UpdateHealth = function(health)
	{
		if(health < 0)
		{
			player.isdead = true;
		}
		else if(health < 1)
		{
			this.currentImage = this.images[3];
		}
		else if(health < 2)
		{
			this.currentImage = this.images[2];
		}
		else if(health < 3)
		{
			this.currentImage = this.images[1];
		}
	};
	this.draw = function(c)
	{
		c.drawImage(this.currentImage,
			this.position.x , this.position.y);
	}
};