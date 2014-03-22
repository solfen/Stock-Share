var Player = function(id, players)
{
	this.x = players[id].x;
	this.y = players[id].y;
	this.id = id;
}

Player.prototype.move = function(time)
{
	this.x += (game.toucheDroite-game.toucheGauche)*5;
	this.y += (game.toucheBas-game.toucheHaut)*5;

	if(game.toucheDroite-game.toucheGauche != 0 || game.toucheBas-game.toucheHaut !=0)
	{
		socket.emit('updatePlayer', {x:this.x, y:this.y, id:this.id, lastUpdate: time});
	}
}