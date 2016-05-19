var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");
var unkillable = 3;
var startFrameMillis = Date.now();
var endFrameMillis = Date.now();

// This function will return the time in seconds since the function 
// was last called
// You should only call this function once per frame
function getDeltaTime()
{
	endFrameMillis = startFrameMillis;
	startFrameMillis = Date.now();

		// Find the delta time (dt) - the change in time since the last drawFrame
		// We need to modify the delta time to something we can use.
		// We want 1 to represent 1 second, so if the delta is in milliseconds
		// we divide it by 1000 (or multiply by 0.001). This will make our 
		// animations appear at the right speed, though we may need to use
		// some large values to get objects movement and rotation correct
	var deltaTime = (startFrameMillis - endFrameMillis) * 0.001;
	
		// validate that the delta is within range
	if(deltaTime > 1)
		deltaTime = 1;
		
	return deltaTime;
}

var musicBackground;
var sfxFire;
 
var cells = [];
function initialize() {
	for(var layerIdx = 0; layerIdx < LAYER_COUNT; layerIdx++) {
		cells[layerIdx] = [];
	var idx = 0;
		for(var y = 0; y < TileMaps["draft"].layers[layerIdx].height; y++) {
			cells[layerIdx][y] = [];
		for(var x = 0; x < TileMaps["draft"].layers[layerIdx].width; x++) {
			if(TileMaps["draft"].layers[layerIdx].data[idx] != 0) {

			cells[layerIdx][y][x] = 1;
		}
		else if(cells[layerIdx][y][x] != 1) {

		cells[layerIdx][y][x] = 0;
	}
		idx++;
		}
	} 
		idx = 0;
			 
	}
	var idx = 0;
	for(var y = 0; y < TileMaps["draft"].layers[LAYER_OBJECT_ENEMIES].height; y++) {
			for(var x = 0; x < TileMaps["draft"].layers[LAYER_OBJECT_ENEMIES].width; x++) {
				if(TileMaps["draft"].layers[LAYER_OBJECT_ENEMIES].data[idx] != 0) {
					var px = tileToPixel(x);
					var py = tileToPixel(y);
					var e = new Enemy(px, py);
				enemies.push(e);
				}
			idx++;
			}
		}
	musicBackground = new Howl(
	{
		urls: ["cavelevelmusic.wav"],
		loop: true,
		buffer: true,
		volume: 0.5
	} );
	musicBackground.play();
	
	sfxFire = new Howl(
	{
		urls: ["fireEffect.ogg"],
		buffer: true,
		volume: 1,
		onend: function() {
			isSfxPlaying =false ;
		}
	} );
}
var splash = document.createElement("img");
splash.src = "splash.png";
var STATE_SPLASH = 0;
var STATE_GAME = 1;
var STATE_GAMEOVER = 2;
var gameState = STATE_SPLASH

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

var LAYER_COUNT = TileMaps["draft"].layers.length;
var MAP = {tw: TileMaps["draft"].width, th: TileMaps["draft"].height};
var TILE = TileMaps["draft"].tilewidth;
var TILESET_TILE = TileMaps["draft"].tilesets[0].tilewidth;
var TILESET_PADDING = TileMaps["draft"].tilesets[0].margin;
var TILESET_SPACING = TileMaps["draft"].tilesets[0].spacing;
var TILESET_COUNT_X = TileMaps["draft"].tilesets[0].columns;
var TILESET_COUNT_Y = TileMaps["draft"].tilesets[0].tilecount
						/ TILESET_COUNT_X;
						
var tileset = document.createElement("img");
tileset.src = TileMaps["draft"].tilesets[0].image;
var score = 0;
var METER = TILE;
var GRAVITY = METER * 10 * 6;
var MAXDX = METER * 10;
var MAXDY = METER * 15;
var ACCEL = MAXDX * 2;
var FRICTION = MAXDX * 5;
var JUMP = METER * 1500000000000;

var ENEMY_MAXDX = METER * 5;
var ENEMY_ACCEL = ENEMY_MAXDX * 2;

var enemies = [];
var LAYER_BACKGROUND = 3;
var LAYER_PLATFORMS = 2;
var LAYER_LADDERS = 1;
var LAYER_LAVA = 0;
var LAYER_OBJECT_ENEMIES = 7;
var LAYER_OBJECT_TRIGGERS = 6;
var bullets = [];
 function playerShoot()
{
var bullet = new Bullet(player.position.x +10 ,player.position.y -15,player.direction == RIGHT)

bullets.push(bullet);
}

function cellAtPixelCoord(layer, x,y)
{
	if(x<0 || x>SCREEN_WIDTH)
		return 1;
	if(y>SCREEN_HEIGHT)
		return 0;
	return cellAtTileCoord(layer, p2t(x), p2t(y));
};

function cellAtTileCoord(layer, tx, ty)
{
	if(tx<0 || tx>=MAP.tw)
		return 1;
	if(ty<0 || ty>=MAP.th)
		return 0;
	return cells[layer][ty][tx];
};

function tileToPixel(tile)
{
	return tile * TILE;
};

function pixelToTile(pixel)
{
	return Math.floor(pixel/TILE);
};
function bound(value, min, max)
{
	if(value < min)
		return min;
	if(value > max)
		return max;
	return value;
}
var tileset = document.createElement("img");
tileset.src = "tileset.png";
function drawMap()
{
	for(var layeridx=0;layeridx<LAYER_COUNT;layeridx++)
	{
		if (TileMaps["draft"].layers[layeridx].visible == false) continue;
		var idx=0;
		for( var y = 0;y < TileMaps["draft"].layers[layeridx].height; y++)
		{
			for( var x = 0;x < TileMaps["draft"].layers[layeridx].width; x++)
			{
				if(TileMaps["draft"].layers[layeridx].data[idx] != 0)
				{
					var tileindex = TileMaps["draft"].layers[layeridx].data[idx] - 1;
					var sx = TILESET_PADDING + (tileindex % TILESET_COUNT_X)*(TILESET_TILE + TILESET_SPACING);
					var sy = TILESET_PADDING + (Math.floor(tileindex/TILESET_COUNT_Y))*(TILESET_TILE + TILESET_SPACING);
					context.drawImage(tileset,sx,sy, TILESET_TILE,TILESET_TILE,x*TILE,y*TILE, TILESET_TILE +1,TILESET_TILE+1);
				}
				idx++;
			}
		} 
	}
}
var SCREEN_WIDTH = canvas.width;
var SCREEN_HEIGHT = canvas.height;
var player = new Player();
var healthbar = new Healthbar();
var keyboard = new Keyboard();

var cavelevel = document.createElement("img");
cavelevel.src = "cavelevels.png";
var background = document.createElement("img");
background.src = "splash.png";
var endscreen = document.createElement("img");
endscreen.src = "endscreen.png";
function runSplash(deltaTime)
{
	if(keyboard.isKeyDown(keyboard.KEY_SPACE))
	{
		gameState = STATE_GAME;
		return;
	}
	context.drawImage(background,0,0 );

}
var viewoffset = new Vector2();
function runGame(deltaTime)
{
	
	unkillable = unkillable - deltaTime;
	
	context.drawImage(cavelevel,0,0 );
	
	context.save();
	
	context.scale(0.75,0.75);
	context.translate(-viewoffset.x, 0);
	
	drawMap();
	if(player.position.x >= viewoffset.x + canvas.width/2)
	{
		viewoffset.x = player.position.x - canvas.width/2;
	}
	player.update(deltaTime);
	player.draw();
	for(var i=0; i<enemies.length; i++)
	{
		enemies[i].update(deltaTime);	
		enemies[i].draw();
	}
		var hit=false;
		for(var i=0; i<bullets.length; i++)
	{
		bullets[i].update(deltaTime);
		for(var j=0; j<enemies.length; j++)
		{
			if(intersects( bullets[i].position.x, bullets[i].position.y, TILE, TILE,
				enemies[j].position.x, enemies[j].position.y, TILE, TILE) == true)
		{
// kill both the bullet and the enemy
			enemies.splice(j, 1);
			hit = true;
// increment the player score
			score += 1;
			break;
		}
	}
	if(hit == true)
	{
		bullets.splice(i, 1);
		break;
	}
	
}
	for(var i=0; i<bullets.length; i++)
	{
		bullets [i].draw();
	}
	

	for(var i=0; i<enemies.length; i++)
	{
	if(intersects(
		player.position.x - player.width/2, player.y - player.height/3,
		88, 76,
		enemies[i].position.x, enemies[i].position.y,
		88,76) == true)
	{
		if (unkillable <= 0)
		{
		health = health -1
		unkillable = 3
		}
	}
		
	}
	if (player.isdead == true)
	{
		gameState = STATE_GAMEOVER
	}
	context.restore();
	healthbar.UpdateHealth(health);
	healthbar.draw(context);
	context.fillStyle = "white";
	context.font = "30px Minion Pro Italic";
	var scoreText = "Score: " + score;
	context.fillText(scoreText, SCREEN_WIDTH - 700, 25);
}

function runGameOver(deltaTime)
{
		context.drawImage(endscreen,0,0 );
}


function run()
{
	context.fillStyle = "gray";
	context.fillRect(0, 0, canvas.width, canvas.height);

	var deltaTime = getDeltaTime();

	switch(gameState)
	{
		case STATE_SPLASH:
			runSplash(deltaTime);
			break;
		case STATE_GAME:
			runGame(deltaTime);
			break;
		case STATE_GAMEOVER:
			runGameOver(deltaTime);
			break;
	}
}

initialize();
//-------------------- Don't modify anything below here
// This code will set up the framework so that the 'run' function is called 60 times per second.
// We have a some options to fall back on in case the browser doesn't support our preferred method.
(function() {
  var onEachFrame;
  if (window.requestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); window.requestAnimationFrame(_cb); }
      _cb();
    };
  } else if (window.mozRequestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); window.mozRequestAnimationFrame(_cb); }
      _cb();
    };
  } else {
    onEachFrame = function(cb) {
      setInterval(cb, 1000 / 60);
    }
  }
  
  window.onEachFrame = onEachFrame;
})();

window.onEachFrame(run);
