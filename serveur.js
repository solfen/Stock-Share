var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
io.set('log level', 1);
var rooms = {};
var numberCo = 0;
var maxConnectByRoom = 2;
var idRoom = 0;
var queue = [];

for(i=0; i<10; i++)
{
	if(!rooms[i])
	{
		rooms[i] = {};
		rooms[i].numberCo = 0;
		if(!rooms[i].players)
		{
			rooms[i].players = {}
			rooms[i].listSockets = {};
		}
	}
}

io.sockets.on('connection', function (socket) 
{
	socket.co = false;
	queue.push(socket);
	for(q in queue)
	{
		for(r in rooms)
		{
			if(rooms[r].numberCo < maxConnectByRoom && socket.co == false)
			{
				rooms[r].players[socket.id] = ({ x: Math.random()*1280, y: Math.random()*720, sprite:""});
				rooms[r].listSockets[socket.id] = socket;

				for(k in rooms[r].listSockets)
				{
					rooms[r].listSockets[k].emit('listPlayers', {players: rooms[r].players});
				}

				socket.emit('newPlayer', {id:socket.id, idRoom: r});
				rooms[r].numberCo++;
				socket.co = true;
			}
		}
	}
	queue = [];

	socket.on('updatePlayer', function (data)
	{
		rooms[data.idRoom].players[data.id].x = data.x;
		rooms[data.idRoom].players[data.id].y = data.y;
		for(k in rooms[data.idRoom].listSockets)
		{
			rooms[data.idRoom].listSockets[k].emit('listPlayers', {players: rooms[data.idRoom].players});
		}
	})

	socket.on('disconnect', function() 
	{
		for(r in rooms)
		{
			if(rooms[r].players[socket.id])
			{
				delete rooms[r].players[socket.id];
				delete rooms[r].listSockets[socket.id];

				for(k in rooms[r].listSockets)
				{
					rooms[r].listSockets[k].emit('listPlayers', {players: rooms[r].players});
					rooms[r].listSockets[k].emit('playerDisconected', socket.id);
				}

				rooms[r].numberCo--;
			}
		}

	});

});

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.send('Hello World');
});
server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0");