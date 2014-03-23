View.Boot = function(game) {
	this.game = game;
};

View.Boot.prototype = {
	preload: function() {
		/*here assets for the loader*/
        this.game.load.image('loaderFull', 'loadingBar.png'); 
        this.game.load.image('loaderEmpty', 'loadingZone.jpg');
	},



	create: function() {
		this.game.state.start('Preloader', true, false);
	}
}