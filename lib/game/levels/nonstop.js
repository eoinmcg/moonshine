ig.module( 'game.levels.nonstop' )
.requires( 'impact.image' )
.defines(function(){
LevelNonstop=/*JSON[*/{
	"entities": [],
	"layer": [
		{
			"name": "collision",
			"width": 10,
			"height": 10,
			"linkWithCollision": false,
			"visible": 1,
			"tilesetName": "",
			"repeat": false,
			"preRender": false,
			"distance": 1,
			"tilesize": 16,
			"foreground": false,
			"data": [
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,1],
				[0,0,0,0,0,0,0,0,0,1],
				[0,0,0,0,0,0,0,0,0,1],
				[0,0,0,1,0,0,1,0,0,1],
				[1,1,1,1,0,0,1,1,1,1],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,1,1,1,1,0,0,0],
				[0,0,0,0,0,0,0,0,0,0]
			]
		},
		{
			"name": "FG",
			"width": 10,
			"height": 10,
			"linkWithCollision": true,
			"visible": 1,
			"tilesetName": "media/tiles_droplets.png",
			"repeat": false,
			"preRender": true,
			"distance": "1",
			"tilesize": 16,
			"foreground": false,
			"data": [
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,29],
				[0,0,0,0,0,0,0,0,0,28],
				[0,0,0,0,0,0,0,0,0,26],
				[0,0,0,20,0,0,21,0,0,27],
				[5,5,5,5,0,0,5,5,5,5],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,49,49,49,49,0,0,0],
				[0,0,0,0,0,0,0,0,0,0]
			]
		}
	]
}/*]JSON*/;
LevelNonstopResources=[new ig.Image('media/tiles_droplets.png')];
});