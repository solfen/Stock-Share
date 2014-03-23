View.Room = function(game) {
	this.game = game;
};

View.Room.prototype = {
	preload: function() {

	},



	create: function() {
		window.room = game.add.sprite(0, 0, 'room');
		game.input.onDown.add(clickEvent, "")
		room.scale.setTo(0.5, 0.5);

		game.world.setBounds(0, 0, 2440, 1950);

		game.player.sprite = game.add.sprite(game.players[game.player.id].x, game.players[game.player.id].y, "dandy");
		game.player.sprite.scale.setTo(0.3,0.3);
		game.player.sprite.anchor.setTo(0.5, 0.8);
		game.player.sprite.animations.add('walk');

		for(p in game.players)
		{
			if(p != game.player.id)
			{
				game.ghosts[p] = {};
				game.ghosts[p].sprite = game.add.sprite(game.players[p].x, game.players[p].y, "dandy");
				game.ghosts[p].sprite.scale.setTo(0.3,0.3);
				game.ghosts[p].sprite.anchor.setTo(0.5, 0.8);
				game.ghosts[p].sprite.animations.add('walk');
				game.ghosts[p].sprite.animations.play('walk', 20, true);
				game.ghosts[p].data = game.players[p];
			}
		}
		// music = game.add.audio('muse');
		// music.play();

		window.key = game.input.keyboard.createCursorKeys();
		game.camera.follow(game.player);
	},



	update: function(){
		// game.physics.collide(player, player2);
		game.player.sprite.animations.play('walk', 20, true);
		if(game.player.newPlayer)
		{
			for(p in game.players)
			{
				if(p != game.player.id && !game.ghosts[p])
				{
					game.ghosts[p] = {};
					game.ghosts[p].sprite = game.add.sprite(game.players[p].x, game.players[p].y, "dandy");
					game.ghosts[p].sprite.scale.setTo(0.3,0.3);
					game.ghosts[p].sprite.anchor.setTo(0.5, 0.8);
					game.ghosts[p].sprite.animations.add('walk');
					game.ghosts[p].data = game.players[p];
				}
			}
		}

		if(game.player.PlayerDisconected)
		{
			game.ghosts[game.player.PlayerDisconected].sprite.kill();
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
				game.ghosts[p].sprite.angle = 90;
			}
			else if(p != game.player.id && game.ghosts[p].data.x < game.players[p].x)
			{
				game.ghosts[p].data.x = game.players[p].x
				game.ghosts[p].sprite.x = game.players[p].x
				//anim gauche ou droite
				game.ghosts[p].sprite.angle = 270;
			}

			if(p != game.player.id && game.ghosts[p].data.y > game.players[p].y)
			{
				game.ghosts[p].data.y = game.players[p].y
				game.ghosts[p].sprite.y = game.players[p].y
				//anim haut ou bas
				game.ghosts[p].sprite.angle = 180;
			}

			if(p != game.player.id && game.ghosts[p].data.y < game.players[p].y)
			{
				game.ghosts[p].data.y = game.players[p].y
				game.ghosts[p].sprite.y = game.players[p].y
				//anim haut ou bas
				game.ghosts[p].sprite.angle = 0;
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

function clickEvent()
{
	for(p in game.ghosts)
	{	
		if(game.physics.collide(game.player.sprite, game.ghosts[p].sprite))
		{
			
			if(game.player.money > 0)
			{
				var ratio = game.player.map[Math.floor(game.player.y-165)/(1545/4))][Math.floor((game.player.x-245)/(1960/5))]
		    	socket.emit('exchangePlayers', {id1:game.player.id, id2:p, idRoom:game.player.idRoom, ratioMap:ratio});
			}
		}
	}
}

function randomMap()
{
	game.player.map = 
	[
	 [Math.random(),Math.random(),Math.random(),Math.random(),Math.random()],
	 [Math.random(),Math.random(),Math.random(),Math.random(),Math.random()],
	 [Math.random(),Math.random(),Math.random(),Math.random(),Math.random()],
	 [Math.random(),Math.random(),Math.random(),Math.random(),Math.random()],
	]
}