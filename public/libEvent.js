
function addEventCapabilities (object) {
    var listeners = {};
               
    object.on = function (eventName, callback) {
        listeners[eventName] = listeners[eventName] || [];
        listeners[eventName].push(callback);
    };
            
    object.emit = function () {
        var args = Array.prototype.slice.apply(arguments);
        var eventName = args.shift();
        var callbacks = listeners[eventName] || [];
        for (var i = 0; i < callbacks.length; i++) {
            callbacks[i].apply(object, args);
        }
    };
}

// -------------------FONCTIONEMENT --------------------------------

/*var game = {};
addEventCapabilities(game);

var game2 = {};
addEventCapabilities(game2);

game.on('playerConnected', function a (name, name2) {
    console.log('coucou ' + name + ' !');
    //this.start();
});

game2.on('playerConnected', function b (name) {
    console.log('salut ' + name + ' !');
});

game.emit('playerConnected', 'Maxime');
game2.emit('playerConnected', 'Jerome');*/



