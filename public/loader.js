View.Loader = function(game) {
	this.game = game;
};

View.Loader.prototype = {
	preload: function() {

	},

	create: function() {

        window.socket = io.connect();
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
		    	    game.player.sprite.angle = 90;
		    	}
		    	else if (key.right.isDown)
		    	{
		    	    game.player.x += 5;
		    	    game.player.moved = true;
		    	    game.player.sprite.angle = 270;
		    	}

		    	if (key.up.isDown)
		    	{
		    	    game.player.y -= 5;
		    	    game.player.moved = true;
		    	    game.player.sprite.angle = 180;
		    	}
		    	else if (key.down.isDown)
		    	{
		    	    game.player.y += 5;
		    	    game.player.moved = true;
		    	    game.player.sprite.angle = 0;
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