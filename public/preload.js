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
        game.load.spritesheet('dandy', 'sprite1.png', 650, 804, 8);
        game.load.image('idle', 'IDLE.png');
        game.load.audio('music', 'music/StockAndShare_1.ogg');
        game.load.image('room', 'salleprinccompress2.jpg');
        game.load.image('collideMap', 'salleblocking.png');
        game.load.image('collideBar', 'collideBar.jpg');
        game.load.image('petit', 'petit.png');
        game.load.image('moyen', 'moyen.png');
        game.load.image('gros', 'gros.png');
        game.load.image('HUDBar', 'barrvert.png');
        game.load.image('HUDHaut', 'haut.png');
        game.load.image('HUDGauch', 'gauch.png');
        game.load.image('HUDDroit', 'droit.png');
        // game.load.image("hat", "hat.png");

        /* Start the preloader*/
		this.game.load.setPreloadSprite(this.loaderFull);
	},


	create: function() {
		game.add.sprite(0, 0, 'room');
		game.state.start('Loader', true, false);
	}
}