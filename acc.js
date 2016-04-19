function SetupImageEvents(object, img)
{
	img.onload = function() {
		object.width = img.width;
		object.height = img.height;
	};
	img.onerror = function() {
		console.log("failed to load image at path " + this.src);
	};
}

function intersects(x1, y1, w1, h1, x2, y2, w2, h2)
 {
	 if(y2 + h2 < y1 ||
		x2 + w2 < x1 ||
		x2 > x1 + w1 ||
		y2 > y1 +h1)
	{
		return false;
	}
	return true;
 }
 
 function DrawImage (ctx, img, posX, posY, ang)
 {
ctx.save();
   ctx.translate(posX, posY);
   ctx.rotate(ang);
   ctx.drawImage(img, -img.width/2, -img.height/2);
ctx.restore();
}