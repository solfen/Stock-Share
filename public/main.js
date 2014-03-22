var game = {};
game.toucheDroite = game.toucheGauche = game.toucheHaut = game.toucheBas = 0;
addEventCapabilities(game);
var socket = io.connect();

addEventListener("load", function()
{
	var canvas = document.getElementById("canvas");
	canvas.width = 1280;
	canvas.height = 720;
	game.ctx = canvas.getContext("2d");
	game.players = {};
	game.emit('GameInit', true);
});

game.on('GameInit', function(player)
{
	socket.on('newPlayer', function (data) 
	{
		var player = new Player(data, game.players);
		key();
		game.emit('PlayerConected', player)
	});

	socket.on('eror', function (data) 
	{
		alert(data);
	});

	socket.on('listPlayers', function (data) 
	{
		game.players = data.players;
	});
})

game.on('PlayerConected', function run (player, timestamp)
{
	requestAnimationFrame(function(timestamp){
		run(player, timestamp)
	});

	game.ctx.fillStyle = "black";
	game.ctx.fillRect(0,0, 1280, 720)
	game.ctx.fillStyle = "red";

	for(p in game.players)
	{
		game.ctx.fillRect(game.players[p].x, game.players[p].y, 10, 10)
	}

	player.move();



})
