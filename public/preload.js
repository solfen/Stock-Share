View.Preloader = function(game) {
	this.game = game;
};

View.Preloader.prototype = {
	preload: function() {
		/* For the preloader*/
        // this.loaderEmpty = this.game.add.sprite(0, 0, 'loaderEmpty');
        // this.loaderEmpty.name = 'loaderEmpty';
        // this.loaderFull = this.game.add.sprite(0, 0, 'loaderFull');
        // this.loaderFull.name = 'loaderFull';

        /* Here the assets to need preload*/
        game.players = {}; // add
        game.ghosts = {};
        game.load.image("hat", "hat.png");

        /* Start the preloader*/
		// this.game.load.setPreloadSprite(this.loaderFull);
	},


	create: function() {
		socket.on('newPlayer', function (data) 
		{
		    game.player = {};
		    game.player.newPlayer = false;
		    game.player.moved = false;
		    game.player.PlayerDisconected = false;
		    game.player.x = game.players[data.id].x;
		    game.player.y = game.players[data.id].y;
		    game.player.id = data.id;
		    game.player.idRoom = data.idRoom;
		
		    game.player.move = function(time)
		    {
		    	if (key.left.isDown)
		    	{
		    	    game.player.x -= 5;
		    	    game.player.moved = true;
		    	}
		    	else if (key.right.isDown)
		    	{
		    	    game.player.x += 5;
		    	    game.player.moved = true;
		    	}

		    	if (key.up.isDown)
		    	{
		    	    game.player.y -= 5;
		    	    game.player.moved = true;
		    	}
		    	else if (key.down.isDown)
		    	{
		    	    game.player.y += 5;
		    	    game.player.moved = true;
		    	}

		    	if(game.player.moved == true)
		    	{
		        	socket.emit('updatePlayer', {x:this.x, y:this.y, id:this.id, idRoom:this.idRoom});
		    		game.player.moved = false;
		    	}
		    }
		    game.state.start('Room', true, false);
		});

		socket.on('listPlayers', function (data) 
		{
		    for(d in data.players)
		    {
		    	if(!game.players[d])
		    		game.player.newPlayer = true;

		    }

		    game.players = data.players;

		});

		socket.on('playerDisconected', function (data) 
		{
		   	game.player.PlayerDisconected = data;

		});

	}
}