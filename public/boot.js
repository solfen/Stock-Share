View.Boot = function(game) {
	this.game = game;
};

View.Boot.prototype = {
	preload: function() {
		/*here assets for the loader*/
        // this.game.load.image('loaderFull', '.png'); 
        // this.game.load.image('loaderEmpty', '.png');
	},



	create: function() {
		console.log(2);
		this.game.state.start('Preloader', true, false);
	}
}