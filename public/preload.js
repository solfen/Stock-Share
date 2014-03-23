View.Preloader = function(game) {
	this.game = game;
};

View.Preloader.prototype = {
	preload: function() {
		/* For the preloader*/
        this.loaderEmpty = this.game.add.sprite(0, 0, 'loaderEmpty');
        this.loaderEmpty.name = 'loaderEmpty';
        this.loaderFull = this.game.add.sprite(0, 0, 'loaderFull');
        this.loaderFull.name = 'loaderFull';

        /* Here the assets to need preload*/
        game.players = {}; // add
        game.ghosts = {};
        game.load.spritesheet('dandy', 'sprite3.png', 650, 807, 8);
        game.load.audio('muse', 'Uprising.mp3');
        game.load.image('room', 'salleprinccompress2.jpg');
        // game.load.image("hat", "hat.png");

        /* Start the preloader*/
		this.game.load.setPreloadSprite(this.loaderFull);
	},


	create: function() {
		game.add.sprite(0, 0, 'room');
		game.state.start('Loader', true, false);
	}
}