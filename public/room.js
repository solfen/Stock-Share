View.Room = function(game) {
	this.game = game;
};

View.Room.prototype = {
	preload: function() {

	},



	create: function() {

		game.stage.backgroundColor = '#2d2d2d';

		game.player.sprite = game.add.sprite(game.players[game.player.id].x, game.players[game.player.id].y, "hat");

		for(p in game.players)
		{
			if(p != game.player.id)
			{
				game.ghosts[p] = {};
				game.ghosts[p].sprite = game.add.sprite(game.players[p].x, game.players[p].y, "hat");
				game.ghosts[p].data = game.players[p];
			}
		}

		window.key = game.input.keyboard.createCursorKeys();
	},



	update: function(){
		// game.physics.collide(player, player2);
		if(game.player.newPlayer)
		{
			for(p in game.players)
			{
				if(p != game.player.id && !game.ghosts[p])
				{
					game.ghosts[p] = {};
					game.ghosts[p].sprite = game.add.sprite(game.players[p].x, game.players[p].y, "hat");
					game.ghosts[p].data = game.players[p];
				}
			}
		}

		if(game.player.PlayerDisconected)
		{
			delete game.ghosts[game.player.PlayerDisconected]
			game.player.PlayerDisconected = false;
		}

		for(p in game.players)
		{
			if(p != game.player.id && game.ghosts[p].data.x > game.players[p].x)
			{
				game.ghosts[p].data.x = game.players[p].x
				game.ghosts[p].sprite.x = game.players[p].x
				//anim gauche ou droite
			}
			else if(p != game.player.id && game.ghosts[p].data.x < game.players[p].x)
			{
				game.ghosts[p].data.x = game.players[p].x
				game.ghosts[p].sprite.x = game.players[p].x
				//anim gauche ou droite
			}

			if(p != game.player.id && game.ghosts[p].data.y > game.players[p].y)
			{
				game.ghosts[p].data.y = game.players[p].y
				game.ghosts[p].sprite.y = game.players[p].y
				//anim haut ou bas
			}

			if(p != game.player.id && game.ghosts[p].data.y < game.players[p].y)
			{
				game.ghosts[p].data.y = game.players[p].y
				game.ghosts[p].sprite.y = game.players[p].y
				//anim haut ou bas
			}

			else if(p == game.player.id)
			{
				game.player.sprite.x = game.player.x;
				game.player.sprite.y = game.player.y;
			}

		}
		game.player.move();
	},
	
	render: function()
	{
		game.debug.renderSpriteInfo(game.player.sprite, 32, 32);
		// game.debug.renderLocalTransformInfo(game.player.sprite, 32, 160);
		// game.debug.renderWorldTransformInfo(game.player.sprite, 32, 290);
	}

	/* Don't forget the comma before*/
	// function clickEvent(){
    //     if(game.physics.collide(player, player2)){
    //         console.log("wesh gros");
    //     }
    // }
}