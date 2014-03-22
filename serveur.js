var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
io.set('log level', 1);
var players = {};
var numberCo = 0;
var queue = [];

io.sockets.on('connection', function (socket) 
{
	queue.push(socket);
	for(q in queue)
	{
		if(numberCo < 10)
		{
			players[socket.id] = ({ x: Math.random()*1280, y: Math.random()*720});
			io.sockets.emit('listPlayers',  {players: players});
			socket.emit('newPlayer', socket.id);
			numberCo++;
		}

		else
		{
			socket.emit('eror', "Limite Max Atteinte");
		}
	}
	queue = [];

	socket.on('updatePlayer', function (data)
	{
		players[data.id].x = data.x;
		players[data.id].y = data.y;
		io.sockets.emit('listPlayers', {players: players})
	})

	socket.on('disconnect', function() 
	{
		delete players[socket.id];
		numberCo--;
		io.sockets.emit('listPlayers', {players: players})

	});

});

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.send('Hello World');
});

server.listen(9000);